-- DropForeignKey
ALTER TABLE "Criminal" DROP CONSTRAINT "Criminal_staff_asigned_fkey";

-- CreateTable
CREATE TABLE "Crimes" (
    "criminal_id" INTEGER NOT NULL,
    "crime" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "court_ruling" TEXT NOT NULL,

    CONSTRAINT "Crimes_pkey" PRIMARY KEY ("date")
);

-- Modificar la clave foránea en Criminal
ALTER TABLE "Criminal" 
ADD CONSTRAINT "Criminal_staff_asigned_fkey" 
FOREIGN KEY ("staff_asigned") REFERENCES "Staff"("dni") 
ON DELETE NO ACTION ON UPDATE CASCADE;

-- Modificar la clave foránea en Crimes
ALTER TABLE "Crimes" 
ADD CONSTRAINT "Crimes_criminal_id_fkey" 
FOREIGN KEY ("criminal_id") REFERENCES "Criminal"("id") 
ON DELETE NO ACTION ON UPDATE CASCADE;                                                                  