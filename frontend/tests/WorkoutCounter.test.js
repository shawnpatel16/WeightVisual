import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkoutCounter from "../src/components/WorkoutCounter";

test("renders workout counter with correct value", () => {
  const totalWorkouts = 42;

  render(<WorkoutCounter totalWorkouts={totalWorkouts} />);

  expect(
    screen.getByText(`${totalWorkouts}`)
  ).toBeInTheDocument();
});

test("updates workout counter when data changes", () => {
  const { rerender } = render(<WorkoutCounter totalWorkouts={42} />);

  expect(screen.getByText("42")).toBeInTheDocument();

  rerender(<WorkoutCounter totalWorkouts={45} />);
  const totalWorkouts = 42;
  expect(screen.getByText(`${totalWorkouts}`)).toBeInTheDocument();
});
