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



const RegisterModal = ({ isOpen, onClose }) => {
   const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/auth/register", values);

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
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
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field type="password" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Register
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RegisterModal;
