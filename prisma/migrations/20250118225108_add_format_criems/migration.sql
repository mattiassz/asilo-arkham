-- DropForeignKey
ALTER TABLE "Crimes" DROP CONSTRAINT "Crimes_criminal_id_fkey";

-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_staff_asigned_fkey";

-- AddForeignKey: Agregar clave foránea en "Criminal"
ALTER TABLE "Criminal"
ADD CONSTRAINT "Criminal_staff_asigned_fkey"
FOREIGN KEY ("staff_asigned")
REFERENCES "Staff"("dni")
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- AddForeignKey: Agregar clave foránea en "Crimes"
ALTER TABLE "Crimes"
ADD CONSTRAINT "Crimes_criminal_id_fkey"
FOREIGN KEY ("criminal_id")
REFERENCES "Criminal"("id")
ON DELETE NO ACTION
ON UPDATE CASCADE;