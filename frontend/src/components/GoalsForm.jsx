import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";

const GoalsForm = ({ closeModal }) => {
  const handleSubmit = (values) => {
    
    
  };

  return (
    <Formik
      initialValues={{
        longTermGoal: "",
        steps: [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue }) => {
        return (
          <Form className="space-y-6 goals-form">
            <div className="space-y-4">
              <label htmlFor="longTermGoal" className="text-lg">
                Enter a long term goal
              </label>
              <Field
                name="longTermGoal"
                className="w-full rounded long-term-goal-input"
              />
            </div>

            <h3 className="text-lg sub-header">
              What steps will you take to reach that goal?
            </h3>

            <FieldArray name="steps">
              {({ remove, push }) => (
                <>
                  {values.steps.map((step, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 step-row"
                    >
                      <label
                        className="step-label"
                        htmlFor={`steps.${index}.name`}
                      >
                        Step {index + 1}
                      </label>
                      <Field
                        name={`steps.${index}.name`}
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
                      onClick={() => push({ name: "" })}
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
