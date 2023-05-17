import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import * as Yup from "yup";
const defaultInitialValues = {
  title: "",
  subgoals: [],
};


const GoalsForm = ({
  closeModal,
  initialValues = defaultInitialValues,
  onSubmit,
}) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Goal Title is required"),
    subgoals: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required("Subgoal is required"),
        })
      )
      .min(1, "At least one subgoal is required"),
  });
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => {
        return (
          <Form className="space-y-6 goals-form" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <label htmlFor="title" className="text-lg">
                Enter a long term goal
              </label>
              <Field
                name="title"
                type="text"
                className="w-full rounded long-term-goal-input"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <ErrorMessage name="title" component="div" />
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
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={subgoal.description}
                      />
                      <ErrorMessage
                        name={`subgoals.${index}.description`}
                        component="div"
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
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default GoalsForm;
