import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeesBadge } from "./routes/get-attendee-badge";
import { getAllEvent } from "./routes/get-all-event";
import path from "path";
import { checkIn } from "./routes/check-in";

const app = fastify();

const PORT = (process.env.PORT || 3000) as number;
const __dirname = path.resolve();

app.register(createEvent, { prefix: "/api" });
app.register(registerForEvent, { prefix: "/api" });
app.register(getEvent, { prefix: "/api" });
app.register(getAllEvent, { prefix: "/api" });
app.register(getAttendeesBadge, { prefix: "/api" });
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
