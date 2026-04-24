import { Hono } from "hono";
import {
  azuraHistory,
  AzuraResp,
  getNowPlaying,
  onClose,
  onMessage,
  onOpen,
  pointsController,
} from "./controllers";
import { createBunWebSocket } from "hono/bun";
import { hc } from "hono/client";
import { initFirebase } from "./config";

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket();
initFirebase();
app.use("*", (c, next) => {
  console.info(`${new Date(Date.now())} ${c.req.path} | ${c.req.method}`);
  return next();
});
app.post("/webhook", AzuraResp);
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
app.get("/stream/points", pointsController);

// Azura
app.get("/azura/now-playing", getNowPlaying);
app.get("/azura/history", azuraHistory);

const server = Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT,
  websocket,
});

const client = hc(`http://localhost:${Bun.env.PORT}`);
export const socket = client.ws.$ws(0);
console.info(`Listening on: ${server.port}`);
