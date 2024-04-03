import fastify from "fastify";
import { createEvent } from "./routes/create-event";
import { registerForEvent } from "./routes/register-for-event";
import { getEvent } from "./routes/get-event";
import { getAttendeesBadge } from "./routes/get-attendee-badge";
import { getAllEvent } from "./routes/get-all-event";

const PORT = (process.env.PORT || 3000) as number;
const app = fastify();

app.register(createEvent, { prefix: "/api" });
app.register(registerForEvent, { prefix: "/api" });
app.register(getEvent, { prefix: "/api" });
app.register(getAllEvent, { prefix: "/api" });
app.register(getAttendeesBadge, { prefix: "/api" });

app
  .listen({ port: PORT })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
