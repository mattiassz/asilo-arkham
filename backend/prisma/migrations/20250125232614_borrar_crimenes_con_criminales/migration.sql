-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_celda_fkey";

-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_personal_asignado_fkey";

-- DropForeignKey
ALTER TABLE "Delito" DROP CONSTRAINT "Delito_criminal_id_fkey";

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_personal_asignado_fkey" FOREIGN KEY ("personal_asignado") REFERENCES "Personal"("dni") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_celda_fkey" FOREIGN KEY ("celda") REFERENCES "Celda"("numero_celda") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delito" ADD CONSTRAINT "Delito_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "Criminal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
