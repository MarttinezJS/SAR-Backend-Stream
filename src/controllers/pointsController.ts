import { Context, Env } from "hono";
import { getPoints } from "../models";

export const pointsController = async (context: Context<Env, "", {}>) => {
  const resp = await getPoints();
  if (resp.isError) {
    return context.json(
      {
        error: resp.isError,
        message: resp.message,
        status: resp.statusCode,
        body: resp.meta,
      },
      resp.statusCode
    );
  }
  return context.json(
    {
      error: false,
      message: "Mount points",
      status: 200,
      body: resp.data,
    },
    200
  );
};
