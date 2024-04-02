import fastify from "fastify";
import createEvent from "./routes/create-event";

const PORT = (process.env.PORT || 3333) as number;
const app = fastify();

app.register(createEvent);

app
  .listen({ port: PORT })
  .then((address) => {
    console.log(`Server listening at ${address}`);
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
