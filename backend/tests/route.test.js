const app = require("../server");
require("dotenv").config();
const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const dbHelper = require("./testHelper")
const serverURL = process.env.NODE_ENV === 'test' ? 'http://localhost:3001' : 'http://localhost:3000'
chai.use(chaiHttp);

describe("Page Data API", () => {
  it("should fetch workouts summary for the homepage", async () => {
    // test logic and assertions for fetching workouts summary
      describe("when there is no data", () => {
          beforeEach(() => {
              return dbHelper.clear();
          })
          it("should return an empty array and other default values", (done) => {
              chai.request(serverURL)
                  .get('/workout')
                  .end(function (err, res) {
                      expect(err).to.be.null;
                      expect(res).to.have.status(200);
                      expect(res.body.totalWorkouts).to.equal(0);
                      expect(res.body.weeklyAverage).to.equal(0);
                      expect(res.body.workouts).to.be.an('array').that.is.empty;
                      done();
                  })
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
