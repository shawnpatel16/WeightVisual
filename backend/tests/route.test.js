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
    describe("Checking responses", () => {
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.save(sampleWorkouts1);
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
    describe("Pagination", () => {
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.save(sampleWorkouts2);
    })
  })
  });

  it("should fetch all workouts for the calendar", async () => {
    // test logic and assertions for fetching all workouts for the calendar
  });

  it("should fetch personal bests", async () => {
    // test logic and assertions for fetching personal bests
  });
});

describe("Individual Workout API", () => {
  it("should get a workout by ID", async () => {
    // test logic and assertions for getting a workout by ID
  });

  it("should create a new workout", async () => {
    // test logic and assertions for creating a new workout
  });

  it("should update a workout by ID", async () => {
    // test logic and assertions for updating a workout by ID
  });

  it("should delete a workout by ID", async () => {
    // test logic and assertions for deleting a workout by ID
  });
});
