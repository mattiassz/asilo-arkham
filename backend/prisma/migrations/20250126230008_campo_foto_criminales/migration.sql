/*
  Warnings:

  - Added the required column `foto` to the `Criminal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Criminal" ADD COLUMN     "foto" TEXT NOT NULL;
