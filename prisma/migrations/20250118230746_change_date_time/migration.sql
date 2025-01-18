-- DropForeignKey
ALTER TABLE "Crimes" DROP CONSTRAINT "Crimes_criminal_id_fkey";

-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_staff_asigned_fkey";

-- Cambiar el tipo de dato de la columna "date" a DATE (compatible con Prisma)
ALTER TABLE "Crimes" ALTER COLUMN "date" DATE;

-- Agregar la clave foránea para "staff_asigned" en la tabla "Criminal"
ALTER TABLE "Criminal"
ADD CONSTRAINT "Criminal_staff_asigned_fkey"
FOREIGN KEY ("staff_asigned")
REFERENCES "Staff"("dni")
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- Agregar la clave foránea para "criminal_id" en la tabla "Crimes"
ALTER TABLE "Crimes"
ADD CONSTRAINT "Crimes_criminal_id_fkey"
FOREIGN KEY ("criminal_id")
REFERENCES "Criminal"("id")
ON DELETE NO ACTION
ON UPDATE CASCADE;