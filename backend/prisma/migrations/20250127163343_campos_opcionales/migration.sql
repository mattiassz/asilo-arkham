-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_celda_fkey";

-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_personal_asignado_fkey";

-- AlterTable
ALTER TABLE "Criminal" ALTER COLUMN "personal_asignado" DROP NOT NULL,
ALTER COLUMN "celda" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_personal_asignado_fkey" FOREIGN KEY ("personal_asignado") REFERENCES "Personal"("dni") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_celda_fkey" FOREIGN KEY ("celda") REFERENCES "Celda"("numero_celda") ON DELETE SET NULL ON UPDATE CASCADE;
