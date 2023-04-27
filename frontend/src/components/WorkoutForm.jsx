import React from 'react'
import { Formik, Form, useField, useFormikContext, Field } from "formik";
import {AiOutlinePlus}  from "react-icons/ai";
import * as Yup from "yup";
const suggestedExercises = {
  "Upper Body": [
    "Bench Press",
    "Pull-ups",
    "Overhead Press",
    "Dumbbell Bench Press",
    "Dumbbell Row",
    "Dumbbell Overhead Press",
    "Dumbbell Curl",
    "Dumbbell Tricep Extension",
    "Lateral Raise",
    "Dumbbell Rear Delt Fly",
    "Dumbbell Shrug",
    "Dumbbell Pullover",
    "Dumbbell Skullcrusher",
    "Skullcrusher",
    "Hammer Curl",
    "Dumbbell Fly",
    "Dumbbell Incline Curl",
    "Lat Pulldown",
    "Cable Rows",
    "EZ Bar Curls",
    "Cable Tricep Extension",
    "Chin-ups",
  ],
  "Lower Body": [
    "Squat",
    "Deadlift",
    "Lunge",
    "Leg Press",
    "Leg Extension",
    "Leg Curl",
    "Calf Raise",
    "Romanian Deadlift",
    "Good Morning",
    "Leg Extensions",
  ],
  Push: [
    "Bench Press",
    "Overhead Press",
    "Dumbbell Bench Press",
    "Dumbbell Overhead Press",
    "Lateral Raise",
    "Skullcrusher",
    "Dumbbell Fly",
    "Cable Tricep Extension",
  ],
  Pull: [
    "Lat Pulldown",
    "Cable Row",
    "Dumbbell Row",
    "Dumbbell Rear Delt Fly",
    "Dumbbell Shrug",
    "Dumbbell Pullover",
    "Dumbbell Curl",
    "Dumbbell Incline Curl",
    "EZ Bar Curls",
    "Hammer Curl",
    "Pull-ups",
    "Chin-ups",
  ],
  Legs: [
    "Squat",
    "Deadlift",
    "Lunge",
    "Leg Press",
    "Leg Extension",
    "Leg Curl",
    "Calf Raise",
    "Romanian Deadlift",
    "Good Morning",
    "Leg Extensions",
  ],
  "Full Body": [
    "Bench Press",
    "Pull-ups",
    "Overhead Press",
    "Dumbbell Bench Press",
    "Dumbbell Row",
    "Dumbbell Overhead Press",
    "Dumbbell Curl",
    "Dumbbell Tricep Extension",
    "Lateral Raise",
    "Dumbbell Rear Delt Fly",
    "Dumbbell Shrug",
    "Dumbbell Pullover",
    "Dumbbell Skullcrusher",
    "Skullcrusher",
    "Hammer Curl",
    "Dumbbell Fly",
    "Dumbbell Incline Curl",
    "Lat Pulldown",
    "Cable Rows",
    "EZ Bar Curls",
    "Cable Tricep Extension",
    "Chin-ups",
    "Squat",
    "Deadlift",
    "Lunge",
    "Leg Press",
    "Leg Extension",
    "Leg Curl",
    "Calf Raise",
    "Romanian Deadlift",
    "Good Morning",
    "Leg Extensions",
  ],
  "Chest/Back": ["Bench Press", "Pull-ups","Dumbbell Bench Press","Dumbbell Row","Dumbbell Pullover","Dumbbell Fly","Lat Pulldown","Cable Rows"],
  "Arms": ["Dumbbell Curl","Dumbbell Tricep Extension","Dumbbell Skullcrusher","Skullcrusher","Hammer Curl","Dumbbell Incline Curl","EZ Bar Curls","Cable Tricep Extension"],
  "Legs/Shoulders": ["Squat","Overhead Press","Lunge","Leg Press","Leg Extension","Leg Curl","Calf Raise","Romanian Deadlift","Good Morning","Leg Extensions","Lateral Raise","Dumbbell Overhead Press","Dumbbell Rear Delt Fly","Dumbbell Shrug"],
};
const WorkoutForm = ({closeModal}) => {

  
  const handleSubmit = (values) => {
    console.log(values);
    // ... handle form submission ...
  };

  return (
    <Formik
      initialValues={{
        splitName: "",
        exercises: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => {
        const addExercise = () => {
          setFieldValue('exercises', [
            ...values.exercises,
            { name: '', sets: [] },
          ]);
        };
        return (
          <Form>
            <label htmlFor="splitName">Split Name</label>
            <Field as="select" name="splitName">
              <option value="">Select a split</option>
              <option value="Upper Body">Upper Body</option>
              <option value="Lower Body">Lower Body</option>
              <option value="Push">Push</option>
              <option value="Push">Pull</option>
              <option value="Legs">Legs</option>
              <option value="Full Body">Full Body</option>
              <option value="Chest/Back">Chest/Back</option>
              <option value="Arms">Arms</option>
              <option value="Legs/Shoulders">Legs/Shoulders</option>
            </Field>

            <label htmlFor="exercises">
              Exercise
              <button onClick={addExercise}>
                <AiOutlinePlus size={12} />
              </button>
            </label>
            {values.exercises.map((exercise, index) => (
              <div key={index}>
                <label htmlFor={`exercises.${index}.name`}>
                  Exercise {index + 1}
                </label>
                <input
                  type="text"
                  name={`exercises.${index}.name`}
                  value={exercise.name}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => {
                    const newSets = [...exercise.sets, { weight: "", reps: "" }];
                    setFieldValue(`exercises.${index}.sets`, newSets);
                  }}
                >
                  <AiOutlinePlus size={10} />
                </button>
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex}>
                    <label htmlFor={`exercises.${index}.sets.${setIndex}.weight`}>
                      Weight
                    </label>
                    <input
                      type="number"
                      name={`exercises.${index}.sets.${setIndex}.weight`}
                      value={set.weight}
                      onChange={handleChange}
                    />
                    <label htmlFor={`exercises.${index}.sets.${setIndex}.reps`}>
                      Reps
                    </label>
                    <input
                      type="number"
                      name={`exercises.${index}.sets.${setIndex}.reps`}
                      value={set.reps}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </div>
            ))}
          </Form>
        )
      }}
    </Formik>
  );
}

export default WorkoutForm