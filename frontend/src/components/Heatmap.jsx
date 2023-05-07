import React, { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

const WorkoutHeatmap = ({ allWorkouts, className }) => {
  const workoutData = allWorkouts.map((workout) => {
    return {date:workout.date, value:1}
  })
  

  const [startDate, setStartDate] = useState(new Date("2023-04-01"));

  const handlePrevious = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() - 1);
    setStartDate(newStartDate);
  };

  const handleNext = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setMonth(newStartDate.getMonth() + 1);
    setStartDate(newStartDate);
  };

  return (
    <div className={`bg-gray-700 rounded-xl shadow-md pt-2 p-2 ${className}`}>
      <div className="flex justify-around">
        <button onClick={handlePrevious}>
          <BsFillArrowLeftCircleFill size="24" />
        </button>
        <button onClick={handleNext}>
          <BsFillArrowRightCircleFill size="24" />
        </button>
      </div>
      <HeatMap
        value={workoutData}
        rectSize={15}
        style={{ color: "rgb(88 101 242)" }}
        legendCellSize={0}
        startDate={startDate}
        space={2}
        width="100%"
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        monthLabels={[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ]}
        panelColors={{
          0: "#EBEDF0",
          1: "#239A3B",
          
        }}
        rectRender={(props, data) => {
          const dateComponents = data.date.split("/");
          const date = new Date(
            parseInt(dateComponents[0]),
            parseInt(dateComponents[1]) - 1,
            parseInt(dateComponents[2])
          );

          // Manually correct the date
          date.setDate(date.getDate() + 1);

          const formattedDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "2-digit",
          });

          return (
            <>
              <rect
                {...props}
                data-tooltip-content={`Date: ${formattedDate}`}
                data-tooltip-id="heatmap-tooltip"
              />
            </>
          );
        }}
        // rectRender and legendRender are optional, only include them if you want to customize the rendering of heatmap cells or legend items
      />
      <Tooltip id="heatmap-tooltip" place="top" effect="solid" />
    </div>
  );
};


export default WorkoutHeatmap