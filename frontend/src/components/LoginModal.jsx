import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});


const LoginModal = ({ isOpen, onClose, login}) => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/signin/login", values);
      // Check if the response is successful and contains a token
      if (response.status === 200) {
      
        login()
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
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
                className="w-full rounded long-term-goal-input"
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
                className="w-full rounded long-term-goal-input"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default LoginModal;
