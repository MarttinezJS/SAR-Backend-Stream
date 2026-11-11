import { Context, Env } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { AzuraService } from "../services";

export const pointsController = async (context: Context<Env, "", {}>) => {
  const resp = await AzuraService.getPoints();
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
