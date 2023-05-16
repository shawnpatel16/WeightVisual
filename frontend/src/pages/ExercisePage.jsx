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
      const response = await axios.get(`/api/workout/exercises/${exerciseName}`, {
        params: {
          timeframe,
        },
      });

      setExerciseData(response.data.transformedData);
    }
    fetchData();
  }, [timeframe, dataType, exerciseName]);

  return (
    <div className="pl-24">
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
        {DataOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setDataType(option.value)}
            disabled={dataType === option.value}
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={dataType} stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
            <th>Volume</th>
            <th>Progress Made</th>
          </tr>
        </thead>
        <tbody>
          {exerciseData.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.weight}</td>
              <td>{data.volume}</td>
              <td>{data.progressMade ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

  export default ExercisePage
