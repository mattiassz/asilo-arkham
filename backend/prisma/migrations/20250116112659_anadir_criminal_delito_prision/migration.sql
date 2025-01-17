-- CreateTable
CREATE TABLE "Criminal" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apodo" TEXT NOT NULL,
    "edad" INTEGER NOT NULL,
    "genero" TEXT NOT NULL,
    "delito" TEXT NOT NULL,
    "tratamientoActual" TEXT NOT NULL,
    "celdaAsignada" INTEGER NOT NULL,
    "fechaIngreso" TIMESTAMP(3) NOT NULL,
    "nivelRiesgo" TEXT NOT NULL,
    "foto" TEXT,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delito" (
    "id" SERIAL NOT NULL,
    "tipoDelito" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaDelito" TIMESTAMP(3) NOT NULL,
    "sentenciaJudicial" TEXT NOT NULL,
    "lugarDelito" TEXT NOT NULL,
    "estadoDelito" TEXT NOT NULL,
    "nivelPrioridad" TEXT NOT NULL,

    CONSTRAINT "Delito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Celda" (
    "id" SERIAL NOT NULL,
    "tipoCelda" TEXT NOT NULL,
    "descripcionCelda" TEXT NOT NULL,
    "nivelSeguridad" TEXT NOT NULL,
    "camarasSeguridad" INTEGER NOT NULL,
    "sensoresMovimiento" BOOLEAN NOT NULL,
    "alarmas" BOOLEAN NOT NULL,
    "criminalAsignado" TEXT NOT NULL,

    CONSTRAINT "Prision_pkey" PRIMARY KEY ("id")
);
