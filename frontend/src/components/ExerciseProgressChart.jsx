import React, { useState, useEffect } from "react";
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
  chartData.flatMap((data) => Object.keys(data)).filter((key) => key !== "date")
);
  return (
    <div>
      <div>
        {TimeframeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTimeframe(option.value)}
            disabled={timeframe === option.value}
          >
            {option.label}
          </button>
        ))}
        {SplitOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSplit(option)}
            disabled={split === option}
          >
            {option}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
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
    </div>
  );
};

export default ExerciseChart;
