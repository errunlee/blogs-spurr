import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import authService from "../firebase/auth";
import { auth } from "../firebase";
import Toaster, { notify } from "./Blogform/Toaster";
import { signIn } from "../features/blogSlices";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("This field is required")
    .email("invlaid format"),
  password: Yup.string()
    .required("This field is required")
    .min(8, "at least 8"),
});

function Loginformik({ setLoading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const isLogged = await authService.loginWithEmailPass(
        values.email,
        values.password
      );
      if (isLogged.ok) {
        const user = await authService.getUser();
        dispatch(signIn(user));
        navigate("/");
      }
      else {
        notify("Failed to login,please check the credentials ")
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false)
  };

  return (
    <>
      <Toaster />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col m-2 items-center">
          <div className="p-11  rounded-3xl flex flex-col">
            <div className="flex border">
              <span className=" bg-slate-400">
                <img width="40" height="40" src="https://img.icons8.com/windows/32/user.png" alt="user" />
              </span>
              <Field
                name="email"
                type="text"
                placeholder="Email ID"
                className="px-3 py-2 bg-gray-300 text-black outline-none"
              />
            </div>
            <p className="mb-3 text-red-500">
              {" "}
              <ErrorMessage name="email" />
            </p>
            <div className=" flex">
              <span className="bg-slate-400 w-[40px]">
                <img width="35" height="35" src="https://img.icons8.com/ios/50/lock--v2.png" alt="lock--v2" />
              </span>
              <Field
                name="password"
                type="text"
                placeholder="Password"
                className="px-3 py-2 bg-gray-300 text-black outline-none "
              />
            </div>
            <p className="text-red-500 mb-3">
              <ErrorMessage name="password" />
            </p>

            <button
              className="bg-slate-700  text-white px-4 py-3 rounded hover:bg-slate-600"
              type="submit"
            >
              Login
            </button>
          </div>
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
