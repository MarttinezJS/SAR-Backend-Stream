-- CreateTable
CREATE TABLE "UsuariosApp" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "dispositivo" TEXT NOT NULL,
    "update" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsuariosApp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsuariosApp_dispositivo_key" ON "UsuariosApp"("dispositivo");
