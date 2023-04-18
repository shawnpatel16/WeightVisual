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
const randomSampleWorkouts = require("./makeTestData");
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
    describe("Checking responses", function () {
      this.timeout(10000);
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
    describe("Pagination", function ()  {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        await dbHelper.save(randomSampleWorkouts);
        const count = await Workout.countDocuments({})
        console.log(count)
        return 
      })
      
        it("should return 10 items for the first page", (done) => 
        {
          chai.request(serverURL)
            .get('/workout?page=1')
            .end(function (err, res) {
              console.log("Response body:", res.body);
              expect(err).to.be.null;
              expect(res).to.have.status(200);
              expect(res.body.workouts).to.have.lengthOf(10);
              done();
            })
        })
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
        })
      
    })
    describe("Sorting Order", function ()  {
      this.timeout(20000);
      beforeEach(async () => {
        await dbHelper.clear();
        return dbHelper.save(randomSampleWorkouts)
      })
      
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
