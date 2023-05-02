import React, { useState } from "react";

const SubGoal = ({ isCompleted, toggleCompletion }) => {
  return (
    <li
      onClick={toggleCompletion}
      className={`cursor-pointer ${
        isCompleted ? "line-through text-green-500" : "text-white"
      }`}
    >
      Subgoal {isCompleted ? "(Completed)" : ""}
    </li>
  );
};

const Goal = ({ title, subgoals }) => {
  const [completedSubgoals, setCompletedSubgoals] = useState(
    new Array(subgoals.length).fill(false)
  );

  const toggleSubgoalCompletion = (index) => {
    const newCompletedSubgoals = [...completedSubgoals];
    newCompletedSubgoals[index] = !newCompletedSubgoals[index];
    setCompletedSubgoals(newCompletedSubgoals);
  };

  const progressPercentage =
    (completedSubgoals.filter((completed) => completed).length /
      completedSubgoals.length) *
    100;

  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4">
      <h3 className="text-white mb-2">{title}</h3>
      <ul className="list-none space-y-1 mb-4">
        {subgoals.map((subgoal, index) => (
          <SubGoal
            key={index}
            isCompleted={completedSubgoals[index]}
            toggleCompletion={() => toggleSubgoalCompletion(index)}
          />
        ))}
      </ul>
      <div className="h-3 bg-gray-500 rounded-full">
        <div
          className="h-3 bg-green-500 rounded-full"
          style={{
            width: `${progressPercentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Goal;
