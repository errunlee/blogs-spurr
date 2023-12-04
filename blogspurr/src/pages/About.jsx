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
    opacity: 0,
    y: "50px",
  },
  final: {
    opacity: 1,
    y: "0px",
    transition: {
      duration: 2,
      delay: 1,
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
        <div className="image absolute ">
            <div className="flex justify-center">
                <motion.h1 variants={childVariants} intial='intial' animate='final' className="text-5xl text-blue-500 font-mono mb-4">Sharing Stories!</motion.h1>
            </div>
            <img src={dpImg} alt="" className=" " />
        </div>
      </div>

      <div className="px-9 flex flex-col items-center text-center mt-7 text-lg ">
        <h1 className="text-3xl font-black">
          Welcome to Arun Khatri's Blog Hub!
        </h1>
        <p className="text-lg ">
          Hello, and welcome to my blog hub! I'm Arun Khatri, a passionate
          learner,developer and tech enthusiast currently enrolled as a BCA
          student at Tribhuwan University. Here, you'll find an array of blogs
          covering various topics, news, inspirational experiences, and
          programming insights.
        </p>
        <h1 className="text-3xl mt-3">About Me</h1>
        <p>
          As a student and an enthusiast of the tech world, I am fervent about
          sharing my experiences and insights. Through my blog, I aspire to
          bring you the latest news, share inspirational stories, and delve into
          programming experiences. Whether it's exploring the latest trends in
          technology or drawing inspiration from people's journeys, this space
          is designed to connect and engage with readers like you.
        </p>
        <h1 className="text-3xl mt-3">Connect with Me</h1>
        <p>
          Your suggestions and thoughts matter greatly to me! If you have any
          questions, suggestions, or simply want to connect, please don't
          hesitate to drop me an email at [errunnp@gmail.com]. I'm always eager
          to engage in discussions and value your input.
        </p>
        <h1 className="text-3xl mt-3">Join the Community</h1>
        <p>
          Stay updated with the latest content by following me on [mention any
          social media platforms you're active on]. Join our community of
          passionate readers and tech enthusiasts to stay connected and be part
          of the conversation.
        </p>
        Thank you for visiting my blog hub and being part of this journey. I'm
        thrilled to have you here and hope you find inspiration, knowledge, and
        connection through the diverse range of blogs shared.
        <h1 className="text-5xl mt-4">Happy reading!
        </h1>
      </div>
    </motion.div>
  );
};

export default About;
