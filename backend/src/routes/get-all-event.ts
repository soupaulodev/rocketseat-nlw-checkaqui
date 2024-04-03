import { FastifyInstance } from "fastify";
import {
  ZodTypeProvider,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getAllEvent(app: FastifyInstance) {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.withTypeProvider<ZodTypeProvider>().get(
    "/events",
    {
      schema: {
        response: {
          200: z.object({
            events: z.array(
              z.object({
                id: z.string().uuid(),
                title: z.string(),
                slug: z.string(),
                details: z.string().nullable(),
                maximumAttendees: z.number().int().nullable(),
              })
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const events = await prisma.event.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          details: true,
          maximumAttendees: true,
        },
      });

      if (events === null) {
        throw new Error("Event not found.");
      }

      return reply.status(200).send({ events: [...events] });
    }
  );
}
