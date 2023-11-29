import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import authService from "../firebase/auth";
import { auth } from "../firebase";
import Toaster, { notify } from "./Blogform/Toaster";
const validationSchema = Yup.object({
  email: Yup.string()
    .required("This field is required")
    .email("invlaid format"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "at least 8"),
});

function Loginformik({setLoading}) {
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const isLogged = await authService.loginWithEmailPass(
        auth,
        values.email,
        values.password
      );
      dispatch(signIn(isLogged));
      navigate("/");

    } catch (e) {
        notify("Failed to login,please check the credentials ")
        console.log(e);
    }
    setLoading(false)
  };

  return (
    <>
    <Toaster/>
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
            Login
          </button>
          <>
            <Link className="underline" to="/register">
              Don't have an account? Create now!{" "}
            </Link>
          </>
        </Form>
      </Formik>
    </>
  );
}

export default Loginformik;
