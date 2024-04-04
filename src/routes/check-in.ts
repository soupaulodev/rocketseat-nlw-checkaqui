import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/attendees/:attendeeId/check-in",
    {
      schema: {
        summary: "Check-in an attendee",
        tags: ["check-ins"],
        params: z.object({
          attendeeId: z.string().uuid(),
        }),
        response: {
          201: z.object({}),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params;

      const attendeesCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId,
        },
      });

      if (attendeesCheckIn !== null) {
        throw new BadRequest("Attendee already checked in!");
      }

      await prisma.checkIn.create({
        data: {
          attendeeId,
        },
      });

      return reply.status(201).send();
    }
  );
}
