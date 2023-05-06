import React, {useState,useEffect} from 'react'
import axios
  from 'axios';
const GoalsDashboardComponent = ({ className, mainGoals }) => {
  const [goals,setGoals] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/workout/goals");
      const data = response.data;
      setGoals(data.goals.slice(0, 3)); 
    };

    fetchData();
  }, []);
  return (
    <div
      className={`bg-gray-700 rounded-xl shadow-md p-6 h-48 flex flex-col justify-between ${className}`}
    >
      <h2 className="text-xl font-bold text-center text-secondary">
        Current Goals
      </h2>
      <div className="flex flex-grow items-center justify-center">
        <span className="text-4xl font-semibold text-secondary">
          <ul className="space-y-2">
            {mainGoals.map((goal, index) => (
              <li key={index} className="text-secondary">
                {goal.title}
              </li>
            ))}
          </ul>
        </span>
      </div>
    </div>
  );
}

export default GoalsDashboardComponent