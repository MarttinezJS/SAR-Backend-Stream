import { Server, ServerWebSocket } from "bun";
import { WSContext } from "hono/ws";

const topic = "song-history";
let server: Server<unknown> | undefined;

export const setWsServer = (bunServer: Server<unknown>) => {
  server = bunServer;
};

/** Envía un mensaje a todos los oyentes conectados. Solo lo usa el servidor. */
export const broadcast = (data: string) => {
  server?.publish(topic, data);
};

export const onOpen = (event: Event, ws: WSContext<unknown>) => {
  const rawWs = ws.raw as ServerWebSocket;
  rawWs.subscribe(topic);
  console.log(
    `${new Date(Date.now())} Client connected | ${rawWs.remoteAddress}`
  );
};

// Los clientes solo escuchan: se ignoran sus mensajes para que nadie pueda
// difundir datos falsos a los demás oyentes.
export const onMessage = () => {};

export const onClose = (event: CloseEvent, ws: WSContext<unknown>) => {
  const rawWs = ws.raw as ServerWebSocket;
  rawWs.unsubscribe(topic);
  console.info(
    `${new Date(Date.now())} Client disconnected | ${rawWs.remoteAddress}`
  );
};
