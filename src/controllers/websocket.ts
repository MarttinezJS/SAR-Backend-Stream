import { ServerWebSocket } from "bun";
import { WSContext, WSMessageReceive } from "hono/ws";

const topic = "song-history";

export const onOpen = (event: Event, ws: WSContext<unknown>) => {
  const rawWs = ws.raw as ServerWebSocket;
  rawWs.subscribe(topic);
  console.log(
    `${new Date(Date.now())} Client connected | ${rawWs.remoteAddress}`
  );
};

export const onMessage = (
  event: MessageEvent<WSMessageReceive>,
  ws: WSContext<unknown>
) => {
  const rawWs = ws.raw as ServerWebSocket;
  console.info(`${new Date(Date.now())} | ${rawWs.remoteAddress} publish.`);
  rawWs.publish(topic, event.data.toString());
};

export const onClose = (event: CloseEvent, ws: WSContext<unknown>) => {
  const rawWs = ws.raw as ServerWebSocket;
  rawWs.unsubscribe(topic);
  console.info(
    `${new Date(Date.now())} Client disconnected | ${rawWs.remoteAddress}`
  );
};
