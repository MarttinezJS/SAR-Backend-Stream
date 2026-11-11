import { Context, Env } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
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
    (resp.statusCode ?? 500) as ContentfulStatusCode
  );
};
