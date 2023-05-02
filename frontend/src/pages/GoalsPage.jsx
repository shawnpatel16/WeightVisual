import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import GoalsForm from "../components/GoalsForm";
import Goal from "../components/Goal";
const GoalsPage = () => {
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    // Replace this with the actual API call
    const fetchGoals = async () => {
      // const response = await fetch('your-api-url');
      // const data = await response.json();
      // setGoals(data);

      // Mock data for demonstration purposes
      const data = [
        {
          title: "Main Goal 1",
          subgoals: ["Subgoal 1", "Subgoal 2", "Subgoal 3"],
        },
        {
          title: "Main Goal 2",
          subgoals: ["Subgoal 1", "Subgoal 2", "Subgoal 3"],
        },
      ];
      setGoals(data);
    };

    fetchGoals();
  }, []);

  const openGoalsModal = () => {
    setShowGoalsModal(true);
  };

  const closeGoalsModal = () => {
    setShowGoalsModal(false);
  };

  return (
    <>
      <div className="pl-24">
        <h1>Goals Page</h1>
        <button onClick={openGoalsModal}>Set a New Goal</button>
        <Modal
          isOpen={showGoalsModal}
          onClose={closeGoalsModal}
          title="Set a New Goal"
        >
          <GoalsForm onClose={closeGoalsModal} />
        </Modal>
        <div className="p-4">
          <h2 className="text-white text-2xl mb-4">Goals</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <Goal key={index} title={goal.title} subgoals={goal.subgoals} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalsPage;
