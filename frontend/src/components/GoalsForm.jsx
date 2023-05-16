import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

const defaultInitialValues = {
  title: "",
  subgoals: [],
};

const GoalsForm = ({
  closeModal,
  initialValues = defaultInitialValues,
  onSubmit,
}) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange, setFieldValue }) => {
        return (
          <Form className="space-y-6 goals-form">
            <div className="space-y-4">
              <label htmlFor="title" className="text-lg">
                Enter a long term goal
              </label>
              <Field
                name="title"
                className="w-full rounded long-term-goal-input"
              />
            </div>

            <h3 className="text-lg sub-header">
              What steps will you take to reach that goal?
            </h3>

            <FieldArray name="subgoals">
              {({ remove, push }) => (
                <>
                  {values.subgoals.map((subgoal, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 step-row"
                    >
                      <label
                        className="step-label"
                        htmlFor={`subgoals.${index}.description`}
                      >
                        Step {index + 1}
                      </label>
                      <Field
                        name={`subgoals.${index}.description`}
                        className="w-full rounded step-input"
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 delete-step-btn"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}

                  <div className="flex items-center add-step-wrapper">
                    <button
                      type="button"
                      onClick={() => push({ description: "" })}
                      className="add-step-btn"
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

export default GoalsForm;
