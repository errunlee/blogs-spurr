import React from "react";
import { useSelector } from "react-redux";
import Blogs from "../../components/forHome/Blogs";
import NotLoggedIn from "../../components/forHome/NotLoggedIn";
import { motion } from "framer-motion";
const Homepage = () => {
  const isLoggedIn = useSelector((state) => state.user);
  const routeVariants = {
    initial: {
        y: '100vh'
    },
    final: {
        y: '0vh'
    }
}

const childVariants = {
  initial: {
    opacity: 0,
    y: "50px",
  },
  final: {
    opacity: 1,
    y: "0px",
    transition: {
      duration: 0.5,
      delay: 0.5,
    },
  },
};

  return (
    <motion.div
    variants={routeVariants}
    initial="initial"
    animate="final"
    className="home component"
  >
      <h1  className="lg:text-4xl text-2xl my-4 lg:mx-[5rem] mx-5">Latest blogs</h1>
      {isLoggedIn ? <Blogs /> : <NotLoggedIn />}
    </motion.div>
  );
};

export default Homepage;
