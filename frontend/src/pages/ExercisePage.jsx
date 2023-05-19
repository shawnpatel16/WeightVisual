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
import { useParams } from 'react-router-dom';

const TimeframeOptions = [
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "3months", label: "3 Months" },
  { value: "6months", label: "6 Months" },
  { value: "yearly", label: "1 Year" },
  { value: "5years", label: "5 Years" },
];

const DataOptions = [
  { value: "weight", label: "Weight" },
  { value: "volume", label: "Volume" },
  { value: "progressMade", label: "Progress Made" },
];

const ExercisePage = () => {
  const { exerciseName } = useParams();
  const decodedExerciseName = decodeURIComponent(exerciseName);
  const [timeframe, setTimeframe] = useState("weekly");
  const [dataType, setDataType] = useState("weight");
  const [exerciseData, setExerciseData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/workout/exercises/${exerciseName}`,
        {
          params: {
            timeframe,
          },
        }
      );

      setExerciseData(response.data.transformedData);
    }
    fetchData();
  }, [timeframe, dataType, exerciseName]);

  return (
    <div className="bg-gray-800 p-6 text-white pl-24">
      <h1 className="text-4xl font-bold mb-8 text-slate">{exerciseName}</h1>
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
        {DataOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setDataType(option.value)}
            disabled={dataType === option.value}
            className={`py-2 px-4 rounded ${
              dataType === option.value
                ? "bg-gray-700"
                : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={exerciseData.map((data) => ({
            ...data,
            progressMade: data.progressMade ? 1 : 0,
          }))}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(str) => format(new Date(str), "MM/dd/yy")}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataType} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <table className="mt-8 w-full text-sm bg-gray-700 rounded-lg text-white">
        <thead>
          <tr className="text-left text-secondary">
            <th className="p-3 border-b border-gray-600">Date</th>
            <th className="p-3 border-b border-gray-600">Weight</th>
            <th className="p-3 border-b border-gray-600">Volume</th>
            <th className="p-3 border-b border-gray-600">Progress Made</th>
          </tr>
        </thead>
        <tbody>
          {exerciseData.map((data, index) => (
            <tr key={index} className="border-b border-gray-600">
              <td className="p-3">{format(new Date(data.date), "MM/dd/yy")}</td>
              <td className="p-3">{data.weight}</td>
              <td className="p-3">{data.volume}</td>
              <td className="p-3">{data.progressMade ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExercisePage;