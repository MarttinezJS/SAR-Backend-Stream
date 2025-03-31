import prismaClient from "../helpers/prismaClient";
import { openPrisma } from "../services";

export const getUserTokens = () =>
  openPrisma(async () => await prismaClient.usuariosApp.findMany());
