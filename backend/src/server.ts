import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeesBadge } from "./routes/get-attendee-badge";
import { getAllEvent } from "./routes/get-all-event";
import path from "path";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

const app = fastify();

const PORT = (process.env.PORT || 3000) as number;
const __dirname = path.resolve();

app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "Check-in API",
      description: "Especificações do CheckAqui API",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/docs",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent, { prefix: "/api" });
app.register(registerForEvent, { prefix: "/api" });
app.register(getEvent, { prefix: "/api" });
app.register(getAllEvent, { prefix: "/api" });
app.register(getAttendeesBadge, { prefix: "/api" });
app.register(getEventAttendees, { prefix: "/api" });
app.register(checkIn, { prefix: "/api" });

app.register(fastifyStatic, {
  root: path.join(__dirname, "frontend", "dist"),
  prefix: "/",
});

app
  .listen({ port: PORT })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
