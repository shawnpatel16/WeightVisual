import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom'


const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Too Short!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});



const RegisterModal = ({ isOpen, onClose, login }) => {
   const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/signin/register", values);

      if (response.status === 200) {
      
        login()
        navigate("/dashboard");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register">
      <Formik
        initialValues={{ email: "", password: "", confirmPassword: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6 goals-form">
            <div className="space-y-4">
              <label htmlFor="email" className="text-lg text-white">
                Email
              </label>
              <Field
                type="email"
                name="email"
                className="w-full rounded long-term-goal-input bg-tertiary pl-2"
              />
              <ErrorMessage name="email" component="div" />
            </div>

            <div className="space-y-4">
              <label htmlFor="password" className="text-lg text-white">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full rounded long-term-goal-input bg-tertiary pl-2"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <div className="space-y-4">
              <label htmlFor="confirmPassword" className="text-lg text-white">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full rounded long-term-goal-input bg-tertiary pl-2"
              />
              <ErrorMessage name="confirmPassword" component="div" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegisterModal;
