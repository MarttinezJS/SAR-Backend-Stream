import { Context, Env } from "hono";
import { AzuraService } from "../services";

export const getNowPlaying = async (context: Context<Env, "", {}>) => {
  const resp = await AzuraService.getPlayNow();
  return context.json(
    {
      error: resp.isError,
      message: resp.message,
      status: resp.statusCode,
      body: resp.data,
      meta: resp.meta,
    },
    resp.statusCode
  );
};
