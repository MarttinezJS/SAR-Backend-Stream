import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

console.info(`Servidor corriendo en el puerto: ${Bun.env.PORT}`);

Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT,
  // websocket: {

  // }
});
