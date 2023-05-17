import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import axios from "axios";
const SubGoal = ({ isCompleted, toggleCompletion, subgoal }) => {

  return (
    <li
      onClick={toggleCompletion}
      className={`cursor-pointer ${
        isCompleted ? "line-through text-green-500" : "text-white"
      }`}
    >
      {subgoal.description} {isCompleted ? "(Completed)" : ""}
    </li>
  );
};

const Goal = ({ goalId, title, subgoals, onEdit, onDelete }) => {
  console.log(subgoals)
  const [completedSubgoals, setCompletedSubgoals] = useState(
    (subgoals || []).map((subgoal) => subgoal.completed)
  );

  const toggleSubgoalCompletion = async (index) => {
    const newCompletedSubgoals = [...completedSubgoals];
    newCompletedSubgoals[index] = !newCompletedSubgoals[index];
    setCompletedSubgoals(newCompletedSubgoals);
    console.log(goalId)
    try {
    await axios.put(`/api/workout/goals/${goalId}/subgoals/${subgoals[index].subgoalId}`, {
      isCompleted: newCompletedSubgoals[index]
    });
  } catch (error) {
    console.error("Error updating subgoal completion status", error);
  }
};
  
useEffect(() => {
  setCompletedSubgoals((subgoals || []).map((subgoal) => subgoal.completed));
}, [subgoals]);
  const progressPercentage =
    (completedSubgoals.filter((completed) => completed).length /
      completedSubgoals.length) *
    100;

  return (
    <div className="bg-gray-700 p-4 rounded-lg mb-4">
      <h3 className="text-white mb-2">
        {title}
        <button onClick={onEdit} className="text-blue-500 ml-2">
          <FiEdit2 />
        </button>
        <button onClick={onDelete} className="text-red-500 ml-2">
          <FiTrash2 />
        </button>
      </h3>

      <ul className="list-none space-y-1 mb-4">
        {subgoals && subgoals.map((subgoal, index) => (
          <SubGoal
            key={index}
            isCompleted={completedSubgoals[index]}
            toggleCompletion={() => toggleSubgoalCompletion(index)}
            subgoal={subgoal}
            
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
