const dbHelper = require("./testHelper");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const randomSampleWorkouts = require("./makeWorkoutData");
const mongoose = require("mongoose");


const uri = process.env.MONGO_URI;
console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });


mongoose.connection.on("error", (error) => {
  console.error("Error connecting to the database:", error);
});

mongoose.connection.once("open", () => {
  console.log("Connected to the database");
});

    (async () =>{
  // Clear the existing data (optional, depending on your needs)
  await dbHelper.clear();

  // Create some sample workout data

  // Save the sample data to the database
   await dbHelper.saveWorkouts(randomSampleWorkouts);
  console.log("Data saved successfully!");
})();
