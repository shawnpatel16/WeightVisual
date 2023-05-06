/*
  Warnings:

  - Added the required column `test` to the `ExerciseSets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExerciseSets" ADD COLUMN     "test" INTEGER NOT NULL;
