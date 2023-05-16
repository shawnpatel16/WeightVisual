import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import GoalsForm from "../components/GoalsForm";
import Goal from "../components/Goal";

const GoalsPage = () => {
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [goalChange, setGoalChange] = useState(false);
const defaultInitialValues = {
  title: "",
  subgoals: [],
};
  useEffect(() => {
    async function fetchGoals() {
      const response = await axios.get(`/api/workout/goals`);

      setGoals(response.data.goals);
    }

    fetchGoals();
  }, [goalChange]);

  const openGoalsModal = (isEdit = false) => {
    if (!isEdit) {
      setSelectedGoal(null);
    }
    setShowGoalsModal(true);
  };

  const closeGoalsModal = () => {
    setShowGoalsModal(false);
  };

const handleAddGoal = async (values) => {
  const response = await axios.post("/api/workout/goals", values);
  console.log(response)
  setGoals((prevGoals) => [response.data.newGoal, ...prevGoals]);
  closeGoalsModal();
};


 const handleUpdateGoal = async (values) => {
   const response = await axios.put(
     `/api/workout/goals/${selectedGoal.goalId}`,
     values
   );
   setGoals((prevGoals) => {
     // create a new array for the updated goals
     const updatedGoals = [...prevGoals];
     // find the index of the updated goal in the array
     const updatedGoalIndex = updatedGoals.findIndex(
       (goal) => goal.goalId === selectedGoal.goalId
     );
     // replace the old goal with the updated goal
     updatedGoals[updatedGoalIndex] = response.data.updatedGoal;
     // return the updated array
     return updatedGoals;
   });
   closeGoalsModal();

 };


  const onSubmit = async (values) => {
    if (selectedGoal) {
      // Update the existing goal
      await axios.put(`/api/workout/goals/${selectedGoal.goalId}`, values);
    } else {
      // Add a new goal
      await axios.post("/api/workout/goals", values);
    }
    setGoalChange(!goalChange);
    closeGoalsModal();
  };

const handleEditGoal = (goal) => {
  setSelectedGoal(goal);
  openGoalsModal(true);
};

  const handleDeleteGoal = async (goal) => {
    await axios.delete(`/api/workout/goals/${goal.goalId}`);
    setGoalChange(!goalChange);
  };

  return (
    <>
      <div className="pl-24">
        <h1>Goals Page</h1>
        <button onClick={() => openGoalsModal()}>Set a New Goal</button>
        <Modal
          isOpen={showGoalsModal}
          onClose={closeGoalsModal}
          title={selectedGoal ? "Edit Goal" : "Set a New Goal"}
        >
          <GoalsForm
            onClose={closeGoalsModal}
            initialValues={selectedGoal || defaultInitialValues}
            onSubmit={selectedGoal ? handleUpdateGoal : handleAddGoal}
          />
        </Modal>
        <div className="p-4">
          <h2 className="text-white text-2xl mb-4">Goals</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <Goal
                key={index}
                goalId={goal.goalId}
                title={goal.title}
                subgoals={goal.subgoals}
                onEdit={() => handleEditGoal(goal)}
                onDelete={() => handleDeleteGoal(goal)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalsPage;
