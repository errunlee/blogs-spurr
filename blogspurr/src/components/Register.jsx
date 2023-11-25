import React, { useState } from "react";
import authService from "../firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/blogSlices";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
const validationSchema = Yup.object({
  email: Yup.string().required("required").email("invlaid format"),
  password: Yup.string().required("required").min(8, "at least 8"),
});

function Register() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    console.log(values.email);
    const isCreated = await authService.registerWithEmailPassword(
      auth,
      values.email,
      values.password
    );
    dispatch(signIn(isCreated));
    if (isCreated) {
      navigate("/");
    } else {
      alert("failed to create account" + isCreated);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col m-2 items-center">
          <Field
            name="email"
            type="text"
            placeholder="email"
            className="px-3 py-2 bg-gray-300 text-black mb-3"
          />
          <ErrorMessage name="email" />

          <Field
            name="password"
            type="text"
            placeholder="password"
            className="px-3 py-2 bg-gray-300 text-black mb-3"
          />
          <ErrorMessage name="password" />

          <button type="submit">Create account</button>
        </Form>
      </Formik>
    </>
  );
}

export default Register;
