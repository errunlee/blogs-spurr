import React from "react";
import "./about.css";
import dpImg from '../assets/img.webp'
import { motion } from "framer-motion";

const About = () => {

  const routeVariants = {
    initial: {
      y: "100vh",
    },
    final: {
      y: "0vh",
      transition: {
        type: "spring",
        mass: 0.4,
      },
    },
  };

  const childVariants = {
    initial: {
      y: '-50%',
      x: '-50%',
      scale:0
    },
    final: {
      y: '-50%',
      x: '-50%',
      scale:1,
      transition: {
        delay: 0.2,
        duration:0.5
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
      <div className="about-wrapper relative">
        <div className="empty"></div>
        <div className="empty1"></div>
        <motion.div className="image absolute "
          variants={childVariants}
          animate='final'
          initial='initial'
        >
          <div className="flex justify-center" >
            <h1 className="text-5xl text-blue-500 font-mono mb-4 text-center">Sharing Stories!</h1>
          </div>
          <img src={dpImg} alt="" className=" " />
        </motion.div>
      </div>

      <div
        className="px-6 flex flex-col items-center text-justify mt-7 text-lg lg:px-[6rem] lg:text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1, }}

          className="text-3xl font-black leading-9">
          Welcome to Arun Khatri's Blog Hub!
        </motion.h1>
        <p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-lg ">
          Hello, and welcome to my blog hub! I'm Arun Khatri, a passionate
          learner,developer and tech enthusiast currently enrolled as a BCA
          student at Tribhuwan University. Here, you'll find an array of blogs
          covering various topics, news, inspirational experiences, and
          programming insights.
        </p>
        <h1 className="text-3xl mt-8 leading-9">About Me</h1>
        <p>
          As a student and an enthusiast of the tech world, I am fervent about
          sharing my experiences and insights. Through my blog, I aspire to
          bring you the latest news, share inspirational stories, and delve into
          programming experiences. Whether it's exploring the latest trends in
          technology or drawing inspiration from people's journeys, this space
          is designed to connect and engage with readers like you.
        </p>
      
      </div>
    </motion.div>
  );
};

export default About;
