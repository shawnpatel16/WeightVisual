-- DropForeignKey
ALTER TABLE "ExerciseSets" DROP CONSTRAINT "ExerciseSets_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_workoutId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseSets" ADD CONSTRAINT "ExerciseSets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("exerciseId") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("workoutId") ON DELETE CASCADE ON UPDATE NO ACTION;
