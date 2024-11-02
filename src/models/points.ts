import prismaClient from "../helpers/prismaClient";
import { openPrisma } from "../services";

export const getPoints = () =>
  openPrisma(async () => await prismaClient.puntos_Url.findMany());
