import React, { useEffect } from "react";
import Blogs from "../../components/forHome/Blogs";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
const Homepage = () => {
  const routeVariants = {
    initial: {
      y: "100vh",
    },
    final: {
      y: "0vh",
    },
  };

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

  document.title = "Blogspurr | Home";

  const { tag } = useParams();
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      className="home component"
    >
      <Blogs tag={tag} />
    </motion.div>
  );
};

export default Homepage;
