import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../firebase/auth";
import { signIn, signUserOut } from "../../features/blogSlices";
import { useNavigate } from "react-router";
import Loginformik from "../../components/Loginformik";
import BasicModal from "../../components/BasicModal";
import {motion } from 'framer-motion'


// for animation of this page
export const formVariant={
  initial:{
    opacity:0
  },
  final:{
    opacity:1
  }
}
const Login = () => {
  const [loading,setLoading]=useState(false)
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true)
    const user = await authService.loginWithGoogle();
    dispatch(signIn(user));
    setLoading(false)
  };

  if (isLoggedIn) {
    navigate("/");
  }

 
  return (
    <motion.div 
    className="mt-3"
    initial='initial'
    animate='final'
    variants={formVariant}
    >

      <h1 className="text-center text-2xl font-mono text-slate-200">
        Login and start sharing your stories now!
      </h1>
      <div className="login">
        <Loginformik setLoading={setLoading}/>
      </div>
      <div className="flex justify-center">

        <button
          className="bg-yellow-500 rounded px-4 py-3 text-slate-800 "
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
      <BasicModal isLoading={loading}/>
    </motion.div>
  );
};

export default Login;
