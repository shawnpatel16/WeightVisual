-- DropForeignKey
ALTER TABLE "Subgoals" DROP CONSTRAINT "Subgoals_goalId_fkey";

-- AlterTable
ALTER TABLE "Goals" ADD COLUMN     "completed" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "Subgoals" ADD CONSTRAINT "Subgoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("goalId") ON DELETE CASCADE ON UPDATE NO ACTION;
