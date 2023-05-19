import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const TimeframeOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "yearly", label: "1 Year" },
  { value: "5years", label: "5 Years" },
];

const SplitOptions = [
  "Full Body",
  "Pull",
  "Push",
  "Legs",
  "Legs/Shoulders",
  "Arms",
  "Upper Body",
  "Lower Body",
];

const ExerciseChart = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const [split, setSplit] = useState("Full Body");
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/workout/personal-bests", {
        params: {
          timeframe,
          split,
        },
      });

      // Get the raw data from the response
      const rawData = response.data;

      // First, flatten the array of exercises into a single array of exercise sets
      const flattenedData = rawData.flatMap((workout) =>
        workout.exercises.map((exercise) => ({
          date: workout.date,
          exerciseName: exercise.exerciseName,
          weight: exercise.exerciseSets[0].weight,
        }))
      );

      // Then, transform the flattened data into the desired format
      const transformedData = flattenedData.reduce((acc, curr) => {
        const existingEntry = acc.find((entry) => entry.date === curr.date);

        if (existingEntry) {
          existingEntry[curr.exerciseName] = curr.weight;
        } else {
          acc.push({
            date: curr.date,
            [curr.exerciseName]: curr.weight,
          });
        }

        return acc;
      }, []);

      // Set chartData with the transformed data
      setChartData(transformedData);
      console.log(transformedData);
    }
    fetchData();
  }, [timeframe, split]);

  const exerciseNames = new Set(
    chartData
      .flatMap((data) => Object.keys(data))
      .filter((key) => key !== "date")
  );
  return (
    <div className="bg-gray-800 p-6 text-white">
      <div className="mb-4 space-x-2">
        {TimeframeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTimeframe(option.value)}
            disabled={timeframe === option.value}
            className={`py-2 px-4 rounded ${
              timeframe === option.value
                ? "bg-gray-700"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mb-4 space-x-2">
        {SplitOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSplit(option)}
            disabled={split === option}
            className={`py-2 px-4 rounded ${
              split === option ? "bg-gray-700" : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* <CartesianGrid strokeDasharray="" grid={false} /> */}
            <XAxis
              dataKey="date"
              tickFormatter={(str) => format(new Date(str), "MM/dd/yy")}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {Array.from(exerciseNames).map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                stroke={`#${((Math.random() * 0xffffff) << 0).toString(16)}`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-96 bg-gray-700 flex items-center justify-center text-xl">
          <p>No workouts recorded for the given settings.</p>
        </div>
      )}
    </div>
  );
};

export default ExerciseChart;