-- CreateTable
CREATE TABLE "Criminal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "crime" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "dangerousness" TEXT NOT NULL,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);
