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
    "jail" INTEGER NOT NULL,

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

-- CreateTable
CREATE TABLE "Crimes" (
    "criminal_id" INTEGER NOT NULL,
    "crime_number" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "court_ruling" TEXT NOT NULL,

    CONSTRAINT "Crimes_pkey" PRIMARY KEY ("crime_number")
);

-- CreateTable
CREATE TABLE "Jails" (
    "jail_number" SERIAL NOT NULL,
    "floor" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Jails_pkey" PRIMARY KEY ("jail_number")
);

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_staff_asigned_fkey" FOREIGN KEY ("staff_asigned") REFERENCES "Staff"("dni") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Criminal" ADD CONSTRAINT "Criminal_jail_fkey" FOREIGN KEY ("jail") REFERENCES "Jails"("jail_number") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crimes" ADD CONSTRAINT "Crimes_criminal_id_fkey" FOREIGN KEY ("criminal_id") REFERENCES "Criminal"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
