import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeesBadge } from "./routes/get-attendee-badge";
import { getAllEvent } from "./routes/get-all-event";
import { checkIn } from "./routes/check-in";
import { getEventAttendees } from "./routes/get-event-attendees";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { swaggerConfig } from "./utils/swagger";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

const PORT = (process.env.PORT || 3000) as number;
const HOST = (process.env.HOST || "0.0.0.0") as string;

app.register(fastifySwagger, swaggerConfig);
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

app.setErrorHandler(errorHandler);

app
  .listen({ port: PORT, host: HOST })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
