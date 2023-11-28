import React from "react";
import Login from "../auth/Login";
import dbService from "../../firebase/config";
import { useSelector } from "react-redux";
import Blogs from "../../components/forHome/Blogs";
import NotLoggedIn from "../../components/forHome/NotLoggedIn";

const Homepage = () => {
  const isLoggedIn = useSelector((state) => state.user);
  return (
    <div>
      <h1 className="text-4xl my-4 mx-[5rem]">Top blogs</h1>
      {isLoggedIn ? <Blogs /> : <NotLoggedIn />}
    </div>
  );
};

export default Homepage;
