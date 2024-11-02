import { Context, Env } from "hono";
import { AzuraWebhook } from "../models";
import { socket } from "..";

export const azuraWebhook = async (context: Context<Env, "", {}>) => {
  const body = await context.req.json<AzuraWebhook>();
  socket.send(JSON.stringify(body));
  return context.json(
    {
      error: false,
      message: "Datos recibidos.",
      status: 200,
    },
    200
  );
};
