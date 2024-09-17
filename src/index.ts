import { Hono } from "hono";
import { onClose, onMessage, onOpen, webhookPlaylist } from "./controllers";
import { createBunWebSocket } from "hono/bun";
import { hc } from "hono/client";

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();

app.post("/webhook/playlist", webhookPlaylist);
app.get(
  "/ws",
  upgradeWebSocket((c) => {
    return {
      onOpen,
      onMessage,
      onClose,
    };
  })
);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const server = Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT,
  websocket,
});

const client = hc(`http://localhost:${Bun.env.PORT}`);
export const socket = client.ws.$ws(0);

console.info(`Listening on: ${server.port}`);
