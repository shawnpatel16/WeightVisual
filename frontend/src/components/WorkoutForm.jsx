import React, { useState,useContext } from "react";
import {
  Formik,
  Form,
  useField,
  useFormikContext,
  Field,
  FieldArray,
} from "formik";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import Autosuggest from "react-autosuggest";
import "./autosuggest.css";
import "./workoutForm.css";
import { toast } from "react-toastify";
import axios from "axios";
import * as Yup from "yup";
import { WorkoutContext } from "../context/WorkoutContext";
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
  "Chest/Back": [
    "Bench Press",
    "Pull-ups",
    "Dumbbell Bench Press",
    "Dumbbell Row",
    "Dumbbell Pullover",
    "Dumbbell Fly",
    "Lat Pulldown",
    "Cable Rows",
  ],
  Arms: [
    "Dumbbell Curl",
    "Dumbbell Tricep Extension",
    "Dumbbell Skullcrusher",
    "Skullcrusher",
    "Hammer Curl",
    "Dumbbell Incline Curl",
    "EZ Bar Curls",
    "Cable Tricep Extension",
  ],
  "Legs/Shoulders": [
    "Squat",
    "Overhead Press",
    "Lunge",
    "Leg Press",
    "Leg Extension",
    "Leg Curl",
    "Calf Raise",
    "Romanian Deadlift",
    "Good Morning",
    "Leg Extensions",
    "Lateral Raise",
    "Dumbbell Overhead Press",
    "Dumbbell Rear Delt Fly",
    "Dumbbell Shrug",
  ],
};
const WorkoutForm = ({
  closeModal,
  date,
  workoutToEdit,
  isEditing,
}) => {
  const { addWorkout, updateWorkout } = useContext(WorkoutContext);
  const [suggestions, setSuggestions] = useState([]);
  const getSuggestions = (value, split) => {
    
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    
    const splitExercises = suggestedExercises[split] || [];
    
    return inputLength === 0
      ? []
      : splitExercises.filter(
          (exercise) =>
            exercise.toLowerCase().slice(0, inputLength) === inputValue
        );
  };
  const onSuggestionsFetchRequested = ({ value }, splitName) => {
    
    setSuggestions(getSuggestions(value, splitName));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await updateWorkout(workoutToEdit.workoutId, values); 
      } else {
        await addWorkout(values);
      }
      
    
    } catch (error) {
      
    } finally {
      setSubmitting(false);
      toast.success(
        isEditing
          ? "Workout updated successfully!"
          : "Workout added successfully!"
      );
      closeModal();
    }
  };
  
  return (
    <Formik
      initialValues={{
        split: isEditing ? workoutToEdit.split : "",
        exercises: isEditing
          ? workoutToEdit.exercises.map((exercise) => ({
              ...exercise,
              exerciseSets: exercise.exerciseSets || [],
              exerciseProgressMade: exercise.exerciseProgressMade || false,
            }))
          : [],
        date: isEditing ? workoutToEdit.date : date,
        
        workoutProgressMade: isEditing
          ? workoutToEdit.workoutProgressMade
          : false,
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => {
        
        return (
          <Form className="space-y-6 workout-form">
            <div className="flex flex-wrap items-center space-x-4 split-name-wrapper">
              <label htmlFor="split" className="text-lg split-name-label">
                Split Name
              </label>
              <Field
                as="select"
                name="split"
                className="rounded split-name-select"
              >
                <option value="">Select a split</option>
                <option value="Upper Body">Upper Body</option>
                <option value="Lower Body">Lower Body</option>
                <option value="Push">Push</option>
                <option value="Pull">Pull</option>
                <option value="Legs">Legs</option>
                <option value="Full Body">Full Body</option>
                <option value="Chest/Back">Chest/Back</option>
                <option value="Arms">Arms</option>
                <option value="Legs/Shoulders">Legs/Shoulders</option>
              </Field>
            </div>
            <label className="flex items-center">
              <Field
                type="checkbox"
                name="workoutProgressMade"
                className="form-checkbox"
              />
              <span className="ml-2">Progress Made</span>
            </label>

            <FieldArray name="exercises">
              {({ remove, push }) => (
                <>
                  {values.exercises.map((exercise, index) => (
                    <div key={index} className="space-y-4  exercise-wrapper">
                      <div className="flex items-center space-x-4  exercise-row">
                        <label
                          className="exercise-name-label"
                          htmlFor={`exercises.${index}.exerciseName`}
                        >
                          Exercise {index + 1}
                        </label>
                        <Autosuggest
                          suggestions={suggestions}
                          theme={{ container: "autosuggest-container" }}
                          onSuggestionsFetchRequested={({ value }) =>
                            onSuggestionsFetchRequested({ value }, values.split)
                          }
                          onSuggestionsClearRequested={
                            onSuggestionsClearRequested
                          }
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={(suggestion) => (
                            <div className="suggestion-item">{suggestion}</div>
                          )}
                          inputProps={{
                            type: "text",
                            name: `exercises.${index}.exerciseName`,
                            value: exercise.exerciseName || "",
                            onChange: (event, { newValue }) => {
                              setFieldValue(
                                `exercises.${index}.exerciseName`,
                                newValue
                              );
                            },
                            className: "h-6 exercise-input",
                          }}
                        />
                        <label className="flex items-center">
                          <Field
                            type="checkbox"
                            name={`exercises.${index}.exerciseProgressMade`}
                            className="form-checkbox"
                          />
                          <span className="ml-2">Progress Made</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600  delete-exercise-btn"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                      <div className="ml-4">
                        <FieldArray name={`exercises.${index}.exerciseSets`}>
                          {({ remove: removeSet, push: pushSet }) => (
                            <>
                              {exercise.exerciseSets.map((set, setIndex) => (
                                <div
                                  key={setIndex}
                                  className="flex items-center space-x-4 set-wrapper"
                                >
                                  
                                  <span className="set-label">
                                    Set {setIndex + 1}
                                  </span>
                                  <label
                                    htmlFor={`exercises.${index}.exerciseSets.${setIndex}.weight`}
                                    className="weight-label"
                                  >
                                    Weight
                                  </label>
                                  <input
                                    type="number"
                                    name={`exercises.${index}.exerciseSets.${setIndex}.weight`}
                                    value={set.weight}
                                    onChange={handleChange}
                                    className="w-20 weight-input"
                                  />
                                  <label
                                    htmlFor={`exercises.${index}.exerciseSets.${setIndex}.reps`}
                                    className="reps-label"
                                  >
                                    Reps
                                  </label>
                                  <input
                                    type="number"
                                    name={`exercises.${index}.exerciseSets.${setIndex}.reps`}
                                    value={set.reps}
                                    onChange={handleChange}
                                    className="w-20 reps-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeSet(setIndex)}
                                    className="text-red-600 delete-set-btn"
                                  >
                                    <FiTrash2 />
                                  </button>
                                </div>
                              ))}
                             

                              <button
                                type="button"
                                onClick={() =>
                                  pushSet({ weight: "", reps: "" })
                                }
                                className="add-set-btn"
                              >
                                <AiOutlinePlus size={15} />
                              </button>
                            </>
                          )}
                        </FieldArray>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center add-exercise-wrapper">
                    <button
                      type="button"
                      onClick={() => push({ exerciseName: "", exerciseSets: [], exerciseProgressMade: false })}
                      className="add-exercise-btn"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </>
              )}
            </FieldArray>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default WorkoutForm;
