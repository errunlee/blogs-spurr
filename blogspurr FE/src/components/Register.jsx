import React, { useState } from "react";
import authService from "../firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../features/blogSlices";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import BasicModal from "./BasicModal";
const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("This field is required")
    .min(3, "at least 3"),
  email: Yup.string()
    .required("This field is required")
    .email("invlaid format"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "at least 8"),
});

function Register() {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true)
    const isCreated = await authService.registerWithEmailPassword(
      values.fullName,
      values.email,
      values.password
    );
    console.log(isCreated)
    if (isCreated.ok) {
      const user = await authService.getUser();
      dispatch(signIn(user));
      navigate("/");
    } else {
      alert("failed to create account" + isCreated);
    }
    setLoading(false)
  };

  return (
    <>
      <BasicModal isLoading={loading} />
      <h1 className="text-3xl my-3 font-mono text-slate-300 font-bold text-center">Join thousands of bloggers from all over the world now!</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col m-2 items-center">
          <Field
            name="fullName"
            type="text"
            placeholder="Full name"
            className="px-3 py-2 bg-gray-300 text-black "
          />
          <p className="text-red-500 mb-3">
            <ErrorMessage name="fullName" />
          </p>
          <Field
            name="email"
            type="text"
            placeholder="email"
            className="px-3 py-2 bg-gray-300 text-black "
          />
          <p className="mb-3 text-red-500">
            {" "}
            <ErrorMessage name="email" />
          </p>
          <Field
            name="password"
            type="text"
            placeholder="password"
            className="px-3 py-2 bg-gray-300 text-black "
          />
          <p className="text-red-500 mb-3">
            <ErrorMessage name="password" />
          </p>

          <button
            className="bg-yellow-700 px-4 py-3 rounded hover:bg-yellow-600"
            type="submit"
          >
            Create account
          </button>
          <Link to='/login' className="underline">Already have an account?</Link>

        </Form>
      </Formik>
    </>
  );
}

export default Register;
