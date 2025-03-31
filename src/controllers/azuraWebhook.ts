import { Context, Env } from "hono";
import { AzuraWebhook, getUserTokens } from "../models";
import { socket } from "..";
import { UsuariosApp } from "../../generated/client";
import { fm } from "../config";
import { BatchResponse } from "firebase-admin/messaging";

export const azuraWebhook = async (context: Context<Env, "", {}>) => {
  const body = await context.req.json<AzuraWebhook>();
  const resp = await getUserTokens();
  const users = resp.data as UsuariosApp[];

  if (users != null && body.live.is_live) {
    const tokens = users.map((user) => user.token);
    const fmResp = (await fm
      .sendEachForMulticast({
        tokens,
        notification: {
          title: "Estamos en vivo!!!",
          body: `Conéctate con ${body.live.streamer_name}`,
          imageUrl: body.live.art,
        },
      })
      .catch((e) => {
        console.log(e);
      })) as BatchResponse;
    console.warn(
      "\n=============================================================================",
      `\n================================= ${fmResp.failureCount} fail ===================================`
    );
    fmResp.responses.forEach((resp) => {
      if (resp.error != null) {
        console.warn(`--> ${resp.error?.code} | ${resp.error?.message}`);
      }
    });
    console.warn(
      "\n============================================================================="
    );
  }
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
