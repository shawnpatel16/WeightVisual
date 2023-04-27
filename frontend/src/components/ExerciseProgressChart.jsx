import React, { useState, useEffect } from "react";
import "chartjs-adapter-date-fns";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend
);
const ExerciseProgressChart = ({ exercises }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selectedMetric, setSelectedMetric] = useState("weight");

  // Functions for interactive features
  const toggleExercise = (exerciseName) => {
    // Implementation to toggle exercise visibility on the chart
  };

  const changeMetric = (metric) => {
    // Implementation to change the metric (weight or volume)
  };

  const applyFilterOrRange = (filter) => {
    // Implementation to apply filters or time ranges
  };

  const switchChartType = (chartType) => {
    // Implementation to switch between chart types (line, bar, etc.)
  };

  // This useEffect will be used to update the chart data and options when exercises data or selected metric changes
  useEffect(() => {
    const chartLabels = []; // Array for the x-axis labels (dates)
    const chartDatasets = []; // Array for the datasets (one dataset per exercise)

    exercises.forEach((exercise) => {
      const dataset = {
        label: exercise.exerciseName,
        data: exercise.sets.map((set) => ({
          x: new Date(set.date),
          y: selectedMetric === "weight" ? set.weight : set.volume,
        })),
        // Additional properties for the dataset (e.g., line color, etc.)
      };
      chartDatasets.push(dataset);
    });

    // Sort the dates from all the sets and remove duplicates
    exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        chartLabels.push(set.date);
      });
    });
    chartLabels.sort();
    chartLabels.filter((date, index, self) => self.indexOf(date) === index);

    setChartData({
      labels: chartLabels,
      datasets: chartDatasets,
    });

    // Set the chart options
    setChartOptions({
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
        },
        y: {
          type: "linear",
        },
      },
      // Add other options if needed (e.g., tooltips, etc.)
    });
  }, [exercises, selectedMetric]);
  console.log(chartData);

  return (
    <div>
      {/* Add controls for interactive features here */}
      {chartData.labels && chartData.labels.length > 0 && (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ExerciseProgressChart;
