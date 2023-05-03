-- CreateTable
CREATE TABLE "ExerciseSets" (
    "setId" SERIAL NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "volume" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "exerciseId" INTEGER,

    CONSTRAINT "ExerciseSets_pkey" PRIMARY KEY ("setId")
);

-- CreateTable
CREATE TABLE "Exercises" (
    "exerciseId" SERIAL NOT NULL,
    "exerciseName" VARCHAR(255) NOT NULL,
    "exerciseProgressMade" BOOLEAN NOT NULL,
    "workoutId" INTEGER,

    CONSTRAINT "Exercises_pkey" PRIMARY KEY ("exerciseId")
);

-- CreateTable
CREATE TABLE "Goals" (
    "goalId" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "userId" INTEGER,

    CONSTRAINT "Goals_pkey" PRIMARY KEY ("goalId")
);

-- CreateTable
CREATE TABLE "Subgoals" (
    "subgoalId" SERIAL NOT NULL,
    "description" VARCHAR(255),
    "completed" BOOLEAN,
    "goalId" INTEGER,

    CONSTRAINT "Subgoals_pkey" PRIMARY KEY ("subgoalId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Workouts" (
    "workoutId" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "split" VARCHAR(255) NOT NULL,
    "workoutProgressMade" BOOLEAN NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Workouts_pkey" PRIMARY KEY ("workoutId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "ExerciseSets" ADD CONSTRAINT "ExerciseSets_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercises"("exerciseId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workouts"("workoutId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Goals" ADD CONSTRAINT "Goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Subgoals" ADD CONSTRAINT "Subgoals_goalId_fkey" FOREIGN KEY ("goalId") REFERENCES "Goals"("goalId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Workouts" ADD CONSTRAINT "Workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION;

