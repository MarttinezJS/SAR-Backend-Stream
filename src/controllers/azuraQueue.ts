import { Context, Env } from "hono";
import { AzuraService } from "../services";

export const azuraHistory = async (context: Context<Env, "", {}>) => {
  const resp = await AzuraService.getHistory();
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
