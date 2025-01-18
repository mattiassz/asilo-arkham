/*
  Warnings:

  - The primary key for the `Crimes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `crime` on the `Crimes` table. All the data in the column will be lost.
  - Added the required column `crime_number` to the `Crimes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Crimes" DROP CONSTRAINT "Crimes_criminal_id_fkey";

-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_staff_asigned_fkey";

-- AlterTable: Cambiar la clave primaria y las columnas en "Crimes"
ALTER TABLE "Crimes"
DROP CONSTRAINT "Crimes_pkey";

ALTER TABLE "Crimes"
DROP COLUMN "crime";

ALTER TABLE "Crimes"
ADD "crime_number" INT NOT NULL;

ALTER TABLE "Crimes"
ADD CONSTRAINT "Crimes_pkey" PRIMARY KEY ("crime_number");

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
