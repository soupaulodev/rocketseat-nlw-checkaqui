import { jsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerConfig = {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "CheckAqui API",
      description: "Especificações do CheckAqui API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
};
