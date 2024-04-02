import { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../lib/prisma";

export default async function createEvent(app: FastifyInstance) {
  app.post("/events", async (request, reply) => {
    const eventSchema = z.object({
      title: z.string().min(4),
      details: z.string().nullable(),
      maximumAttendees: z.number().int().positive().nullable(),
    });

    const data = eventSchema.parse(request.body);

    const event = await prisma.event.create({
      data: {
        title: data.title,
        details: data.details,
        maximumAttendees: data.maximumAttendees,
        slug: new Date().toISOString(),
      },
    });

    return reply.status(201).send({ eventId: event.id });
  });
}
