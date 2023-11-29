import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "../../firebase/auth";
import { signIn, signUserOut } from "../../features/blogSlices";
import { useNavigate } from "react-router";
import Loginformik from "../../components/Loginformik";
import BasicModal from "../../components/BasicModal";

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
    <div className="mt-3">
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
    </div>
  );
};

export default Login;
