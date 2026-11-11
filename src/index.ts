import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import {
  azuraHistory,
  azuraWebhook,
  getNowPlaying,
  onClose,
  onMessage,
  onOpen,
  pointsController,
  setWsServer,
} from "./controllers";
import { createBunWebSocket } from "hono/bun";
import { initFirebase } from "./config";

const { WEBHOOK_USER, WEBHOOK_PASSWORD } = Bun.env;
if (!WEBHOOK_USER || !WEBHOOK_PASSWORD) {
  // Sin credenciales cualquiera podría disparar pushes a todos los usuarios.
  console.error("Faltan WEBHOOK_USER / WEBHOOK_PASSWORD.");
  process.exit(1);
}

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();
initFirebase();
app.use("*", (c, next) => {
  console.info(`${new Date(Date.now())} ${c.req.path} | ${c.req.method}`);
  return next();
});
// AzuraCast → Webhook genérico → "HTTP Basic Authentication".
app.post(
  "/webhook",
  basicAuth({ username: WEBHOOK_USER, password: WEBHOOK_PASSWORD }),
  azuraWebhook
);
app.get(
  "/ws",
  upgradeWebSocket(() => {
    return {
      onOpen,
      onMessage,
      onClose,
    };
  })
);
app.get("/stream/points", pointsController);

// Azura
app.get("/azura/now-playing", getNowPlaying);
app.get("/azura/history", azuraHistory);

const server = Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT,
  websocket,
});
setWsServer(server);

console.info(`Listening on: ${server.port}`);
