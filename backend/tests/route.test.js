const server = require("../server");
const _ = require("lodash");
require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const dbHelper = require("./testHelper");
const serverURL =
  process.env.NODE_ENV === "test"
    ? "http://localhost:3001"
    : "http://localhost:3000";
const sampleWorkouts1 = require("./testdata");
const randomSampleWorkouts = require("./makeWorkoutData");
const randomSampleExercises = require("./makeExerciseData");
const Workout = require("../models/workoutModel");
chai.use(chaiHttp);
chai.use(require("deep-equal-in-any-order"));

describe("Page Data API", () => {
  it("should fetch workouts summary for the homepage", async () => {
    // test logic and assertions for fetching workouts summary
    describe("when there is no data", () => {
      beforeEach(() => {
        return dbHelper.clear();
      });
      it("should return an empty array and other default values", (done) => {
        chai
          .request(serverURL)
          .get("/workout")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.totalWorkouts).to.equal(0);
            expect(res.body.weeklyAverage).to.equal(0);
            expect(res.body.workouts).to.be.an("array").that.is.empty;
            done();
          });
      });
    });
    describe("when there is data", function () {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.saveWorkouts(sampleWorkouts1);
      });

      describe("Getting < 10 workouts", () => {
        it("should return total number of workouts, weekly average, and total workouts", function (done) {
          chai
            .request(serverURL)
            .get("/workout")
            .end(function (err, res) {
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              const cleanedWorkouts = res.body.workouts.map((workout) => {
                const cleanedWorkout = _.omit(workout, [
                  "_id",
                  "date",
                  "createdAt",
                  "updatedAt",
                  "__v",
                ]);

                cleanedWorkout.exercises = workout.exercises.map((exercise) => {
                  const cleanedSets = exercise.sets.map((set) =>
                    _.omit(set, ["_id"])
                  );
                  return {
                    ..._.omit(exercise, [
                      "_id",
                      "createdAt",
                      "updatedAt",
                      "__v",
                    ]),
                    sets: cleanedSets,
                  };
                });

                return cleanedWorkout;
              });
              const cleanedSampleWorkouts = sampleWorkouts1.map((workout) => {
                const cleanedSampleWorkout = _.omit(workout, ["date"]);
                return cleanedSampleWorkout;
              });
              const sortedCleanedWorkouts = cleanedWorkouts.sort((a, b) =>
                a.split.localeCompare(b.split)
              );
              const sortedCleanedSampleWorkouts = cleanedSampleWorkouts.sort(
                (a, b) => a.split.localeCompare(b.split)
              );
              expect(res.body.totalWorkouts).to.equal(5);
              expect(res.body.weeklyAverage).to.equal(5);
              expect(sortedCleanedWorkouts).to.deep.equal(
                sortedCleanedSampleWorkouts
              );

              done();
            });
        });
      });
    });
    describe("Pagination", function () {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        await dbHelper.saveWorkouts(randomSampleWorkouts);
        const count = await Workout.countDocuments({});
        console.log(count);
        return;
      });

      it("should return 10 items for the first page", (done) => {
        chai
          .request(serverURL)
          .get("/workout?page=1")
          .end(function (err, res) {
            console.log("Response body:", res.body);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.workouts).to.have.lengthOf(10);
            done();
          });
      });
      it("should return the next 10 items for another page", (done) => {
        chai
          .request(serverURL)
          .get("/workout?page=2")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.workouts).to.have.lengthOf(10);
            done();
          });
      });
    });
    describe("Sorting Order", function () {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.saveWorkouts(randomSampleWorkouts);
      });

      it("should return items sorted by date in descending order", (done) => {
        chai
          .request(serverURL)
          .get("/workout?page=1")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.workouts).to.have.lengthOf(10);

            // Check that the items are sorted by date in descending order
            for (let i = 0; i < res.body.workouts.length - 1; i++) {
              const date1 = new Date(res.body.workouts[i].date);
              const date2 = new Date(res.body.workouts[i + 1].date);
              expect(date1).to.be.at.least(date2);
            }
            done();
          });
      });
    });
  });

  it("should fetch all workouts for the calendar", async () => {
    // test logic and assertions for fetching all workouts for the calendar
    describe("Calendar Page", function () {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.saveWorkouts(randomSampleWorkouts);
      });
      it("should return all workouts with splits and dates", (done) => {
        chai
          .request(serverURL)
          .get("/workout/calendar")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.workouts).to.have.lengthOf(
              randomSampleWorkouts.length
            );
            res.body.workouts.forEach((workout, index) => {
              const expectedWorkout = _.omit(randomSampleWorkouts[index], [
                "_id",
                "date",
                "createdAt",
                "updatedAt",
                "__v",
                "exercises",
              ]);
              expectedWorkout.date = new Date(
                randomSampleWorkouts[index].date
              ).toISOString();
              const sanitizedWorkout = _.omit(workout, "_id");
              expect(sanitizedWorkout).to.deep.equal(expectedWorkout);
            });
            done();
          });
      });
    });
  });

  it("should fetch personal bests", async () => {
    // test logic and assertions for fetching personal bests
    describe("Personal Bests", function () {
      this.timeout(20000);

      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.saveExercises(randomSampleExercises); // Helper function to save exercises
      });

      it("should return all exercises when no search query is provided", (done) => {
        // Test logic and assertions for fetching all exercises
        chai
          .request(serverURL)
          .get("/workout/personal-bests")
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body.exercises).to.have.lengthOf(
              randomSampleExercises.length
            );
            res.body.exercises.forEach((exercise, index) => {
              const sanitizedExercise = _.omit(exercise, [
                "_id",
                "createdAt",
                "updatedAt",
                "__v",
              ]);
              const expectedExercise = _.omit(randomSampleExercises[index], [
                "_id",
                "createdAt",
                "updatedAt",
                "__v",
              ]);
              expectedExercise.highestVolumeSet.date = new Date(
                randomSampleExercises[index].highestVolumeSet.date
              ).toISOString();
              expect(sanitizedExercise).to.deep.equal(expectedExercise);
            });
            done();
          });
      });

      it("should return filtered exercises based on the search query", (done) => {
        // Test logic and assertions for fetching filtered exercises based on the search query
        const randomExercise =
          randomSampleExercises[
            Math.floor(Math.random() * randomSampleExercises.length)
          ];
        const searchQuery = randomExercise.exerciseName;
        chai
          .request(serverURL)
          .get("/workout/personal-bests")
          .query({ search: searchQuery })
          .end(function (err, res) {
            // Check if there are no errors and the status is 200 (OK)
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            // Verify that the returned exercises match the search query
            res.body.filteredExercises.forEach((exercise) => {
              expect(exercise.exerciseName.toLowerCase()).to.include(
                searchQuery.toLowerCase()
              );
            });

            done();
          });
      });
    });
  });
});

describe("Individual Workout API", function ()  {
  this.timeout(20000)
  let savedWorkouts;
  beforeEach(async () => {
    await dbHelper.clear();
    savedWorkouts = await dbHelper.saveWorkouts(randomSampleWorkouts);
    return savedWorkouts
  });
  it("should get a workout by ID", (done) => {
    const workoutToTest = savedWorkouts[0]; // You can choose any index from the array
    const workoutId = workoutToTest._id;
    chai
          .request(serverURL)
          .get(`/workout/${workoutId}`)
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.workout._id).to.be.equal(workoutId.toString())
        done();
      })

    
  });

  it("should create a new workout", (done) => {
    const sampleWorkout = {
    date: new Date("2022-03-11T00:00:00Z"),
    split: "Chest and Triceps",
    exercises: [
      {
        name: "Bench Press",
        sets: [
          { weight: 135, reps: 10 },
          { weight: 185, reps: 8 },
          { weight: 225, reps: 6 },
        ],
      },
      {
        name: "Tricep Pushdowns",
        sets: [
          { weight: 50, reps: 10 },
          { weight: 60, reps: 8 },
          { weight: 70, reps: 6 },
        ],
      },
    ], 
    }
    chai
      .request(serverURL)
      .post("/workout")
      .send(sampleWorkout)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        const workout = res.body.newWorkout;
        const cleanedWorkout = _.omit(workout, [
          "_id",
          "date",
          "createdAt",
          "updatedAt",
          "__v",
        ]);

        cleanedWorkout.exercises = workout.exercises.map((exercise) => {
          const cleanedSets = exercise.sets.map((set) => _.omit(set, ["_id"]));
          return {
            ..._.omit(exercise, ["_id", "createdAt", "updatedAt", "__v"]),
            sets: cleanedSets,
          };
        });
        const sanitizedSampleWorkout = _.omit(sampleWorkout, [
          "_id",
          "createdAt",
          "updatedAt",
          "date",
          "__v",
        ]);
        // Compare the properties of createdWorkout and sampleWorkout, except for _id, createdAt, and updatedAt
        expect(cleanedWorkout).to.deep.equal(sanitizedSampleWorkout)
        done();
      })
    // test logic and assertions for creating a new workout
  });

  it("should return an error if the workout to be updated is not found", (done) => {
    const nonExistentId = "607d1c77bcdbf85ac47331fe";
    const updatedProperties = {
      date: new Date("2022-03-11T00:00:00Z"),
      split: "Chest and Triceps",
      exercises: [
        {
          name: "Bench Press",
          sets: [
            { weight: 135, reps: 1 },
            { weight: 185, reps: 8 },
            { weight: 225, reps: 6 },
          ],
        },
        {
          name: "Tricep Extension",
          sets: [
            { weight: 50, reps: 10 },
            { weight: 60, reps: 8 },
            { weight: 70, reps: 6 },
          ],
        },
      ],
    };
    chai
      .request(serverURL)
      .put(`/workout/${nonExistentId}`)
      .send(updatedProperties)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404); 
        done();
      });
    
  });
  it("should update a workout by ID",(done) => {
    // test logic and assertions for updating a workout by ID
    const workoutToUpdate = savedWorkouts[0]
    const updatedProperties = {
      split: "Back",
      exercises: [
        {
          name: "Pulldowns",
          sets: [
            { weight: 100, reps: 10 },
          ],
        },
      ],
    };
    chai
      .request(serverURL)
      .put(`/workout/${workoutToUpdate._id}`)
      .send(updatedProperties)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        const cleanUpdatedWorkout = _.omit(res.body.updatedWorkout, [
          "_id",
          "createdAt",
          "updatedAt",
          "date",
          "__v",
        ]);
        cleanUpdatedWorkout.exercises = cleanUpdatedWorkout.exercises.map(
          (exercise) => {
            return {
              name: exercise.name,
              sets: exercise.sets,
            };
          }
        );
        

        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(cleanUpdatedWorkout).to.deep.equal(updatedProperties);
        done();
      });
  });
  it("should return a 404 error if the workout does not exist", (done) => {
    // test logic and assertions for deleting a workout by ID
    const nonExistingWorkoutId = "607d1c77bcdbf85ac47331fe";
    chai
      .request(serverURL)
      .delete(`/workout/${nonExistingWorkoutId}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(404);
        done();
      });
  });
  it("should delete the workout with the given id and return a success message", (done) => {
    const workoutToDelete = savedWorkouts[0];
    chai
      .request(serverURL)
      .delete(`/workout/${workoutToDelete._id}`)
      .end(async (err, res) => {
        if (err) {
          console.error("Error in test:", err);
          console.log("Response object:", res);
        }
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal("Workout successfully deleted");

        // Check if the workout was actually deleted from the database
        const deletedWorkout = await Workout.findById(workoutToDelete._id);
        expect(deletedWorkout).to.be.null;

        done();
      });
  });
});
