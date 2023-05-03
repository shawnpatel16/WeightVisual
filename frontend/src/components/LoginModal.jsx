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


const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/auth/login", values);
      // Check if the response is successful and contains a token
      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        // Navigate to the dashboard or perform any other action after successful login
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
        initialValues={{ email: "", password: ""}}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="text-white">
              <div>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" />
                <ErrorMessage name="email" component="div" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>
              
              <button type="submit" disabled={isSubmitting}>
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default LoginModal;
