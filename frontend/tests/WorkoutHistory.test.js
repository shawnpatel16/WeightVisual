import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Workout from "../src/components/Workout";
import WorkoutHistory from "../src/components/WorkoutHistory";
import mockData from "../src/data";

describe("Workout component", () => {
  test("renders date, split, and edit/delete buttons", () => {
    const item = mockData[0];
    render(<Workout item={item} />);
    expect(screen.getByText(item.date)).toBeInTheDocument();
    expect(screen.getByText(item.split)).toBeInTheDocument();
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });
});

describe("WorkoutHistory component", () => {
  test("renders table header and workout rows", () => {
    render(<WorkoutHistory />);
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Relative Time")).toBeInTheDocument();
    expect(screen.getByText("Split")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(mockData.length + 1);
  });
});
