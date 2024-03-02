import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Loginformik from "../../components/Loginformik";
import BasicModal from "../../components/BasicModal";
import { motion } from 'framer-motion'


// for animation of this page
export const formVariant = {
  initial: {
    opacity: 0
  },
  final: {
    opacity: 1
  }
}
const Login = () => {

  document.title = "Blogspurr | Login"

  const [loading, setLoading] = useState(false)
  // const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {

    if (isLoggedIn) {
      navigate("/");
    }
  })


  return (
    <motion.div
      className="mt-3"
      initial='initial'
      animate='final'
      variants={formVariant}
    >

      <h1 className="text-center text-2xl  text-slate-200">
        Login and start sharing your stories now!
      </h1>
      <div className="login">
        <Loginformik setLoading={setLoading} />
      </div>
      <BasicModal isLoading={loading} />
    </motion.div>
  );
};

export default Login;
