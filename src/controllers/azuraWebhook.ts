import { Context, Env } from "hono";
import { getUserTokens, type AzuraResp } from "../models";
import { UsuariosApp } from "../../generated/client";
import { fm } from "../config";
import { broadcast } from "./websocket";

const notifyLive = async (live: AzuraResp["live"]) => {
  const resp = await getUserTokens();
  const users = resp.data as UsuariosApp[] | undefined;
  if (resp.isError || !users?.length) return;

  try {
    const fmResp = await fm.sendEachForMulticast({
      tokens: users.map((user) => user.token),
      notification: {
        title: "Estamos en vivo!!!",
        body: `Conéctate con ${live.streamer_name}`,
        imageUrl: live.art,
      },
    });
    console.warn(`Push "en vivo": ${fmResp.failureCount} fallidos.`);
    fmResp.responses.forEach((resp) => {
      if (resp.error != null) {
        console.warn(`--> ${resp.error.code} | ${resp.error.message}`);
      }
    });
  } catch (error) {
    console.error("Error enviando push:", error);
  }
};

export const azuraWebhook = async (context: Context<Env, "", {}>) => {
  const body = await context.req.json<AzuraResp>();

  if (body.live?.is_live) {
    await notifyLive(body.live);
  }
  broadcast(JSON.stringify(body));
  return context.json(
    {
      error: false,
      message: "Datos recibidos.",
      status: 200,
    },
    200
  );
};
