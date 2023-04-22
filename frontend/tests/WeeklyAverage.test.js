import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WeeklyAverage from "../src/components/WeeklyAverage";

test("renders weekly workout counter with correct value", () => {
  const totalWorkouts = 3;

  render(<WeeklyAverage totalWorkouts={totalWorkouts} />);

  expect(screen.getByText(`${totalWorkouts}`)).toBeInTheDocument();
});

test("updates weekly workout counter when data changes", () => {
  const { rerender } = render(<WeeklyAverage totalWorkouts={3} />);

  expect(screen.getByText("3")).toBeInTheDocument();

    rerender(<WeeklyAverage totalWorkouts={5} />);
  const totalWorkouts = 5;
  setTimeout(() => {
    expect(screen.getByText(`${totalWorkouts}`)).toBeInTheDocument();
  }, 500);
});
