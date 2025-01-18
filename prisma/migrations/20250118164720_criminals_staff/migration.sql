-- CreateTable
CREATE TABLE "Criminal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "dangerousness" TEXT NOT NULL,
    "staff_asigned" INTEGER NOT NULL,

    CONSTRAINT "Criminal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Staff" (
    "dni" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "shift" TEXT NOT NULL,
    "contact" INTEGER NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("dni")
);

-- AddForeignKey
-- AddForeignKey
ALTER TABLE "Criminal" 
ADD CONSTRAINT "Criminal_staff_asigned_fkey" 
FOREIGN KEY ("staff_asigned") 
REFERENCES "Staff"("dni") 
ON DELETE NO ACTION 
ON UPDATE CASCADE;
