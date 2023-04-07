import React, { useEffect } from "react";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import "cal-heatmap/cal-heatmap.css";
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { BsFillArrowRightCircleFill } from "react-icons/bs";
const Cal = () => {
  const cal = new CalHeatmap();
  cal.paint(
    {
      range: 8,
      theme: "dark",
      domain: { type: "month", gutter: 10, dynamicDimension: false },
      subDomain: {
        type: "xDay",
        label: "DD",
        width: 20,
        height: 20,
        color: "rgb(34 197 94)",
      },
    },
    [[Tooltip]]
  );

  return (
    <>
      <div id="cal-heatmap">
        <button
          onClick={(e) => {
            e.preventDefault();
            cal.previous();
          }}
        >
          <BsFillArrowLeftCircleFill size = "24"/>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            cal.next();
          }}
        >
          <BsFillArrowRightCircleFill size = "24"/>
        </button>
      </div>
    </>
  );
};

const Heatmap = () => {
  return (
    <div className="mx-4">
      Heatmap
      <Cal />
    </div>
  );
};

export default Heatmap;
