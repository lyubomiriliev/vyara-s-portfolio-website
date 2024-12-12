"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.6 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.3, // Delay between each child animation
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const titleVariant = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  return (
    <section className="text-white md:py-10 lg:py-16 relative">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex flex-col items-center mb-10"
      >
        <div className="flex py-6 gap-2 flex-col justify-center items-center">
          <h2 className="uppercase font-extralight text-lg md:text-xl lg:text-2xl">
            about me
          </h2>
          <Image
            width={400}
            height={200}
            src="/images/vyaraName.png"
            className="w-full max-w-xs md:max-w-lg lg:max-w-xl"
            alt="Vyara Ivanova Ilieva"
          />
          {/* "Open for work" badge for larger screens */}
          <div className="bg-textGray/20 px-6 py-1.5 mt-2 rounded-full hidden items-center md:flex uppercase font-bold gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-2 w-2 rounded-full"></div>
            Open for work
          </div>
        </div>

        {/* Profile Image and Description */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 lg:gap-16 items-center w-full md:w-4/5 lg:w-2/3 px-4 lg:px-0">
          <Image
            width={1000}
            height={1000}
            unoptimized
            src="/profile/profilepic2.jpg"
            alt="Vyara Ivanova Ilieva"
            className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 border-2 object-cover rounded-full md:mb-6 shadow-lg"
          />
          {/* "Open for work" badge for smaller screens */}
          <div className="bg-textGray/20 px-6 py-1.5 rounded-full flex items-center md:hidden uppercase font-bold gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-2 w-2 rounded-full"></div>
            Open for work
          </div>
          <p className="max-w-md text-gray-300 text-justify leading-relaxed text-base md:text-lg lg:text-xl mb-8">
            Social Media Specialist with a passion for helping brands reach
            their potential. Experienced in multi-platform strategies and
            content creation. Social Media Specialist with a passion for helping
            brands reach their potential. Experienced in multi-platform
            strategies and content creation. Social Media Specialist with a
            passion for helping brands reach their potential. Experienced in
            multi-platform strategies and content creation.
          </p>
        </div>
      </motion.div>

      {/* Background Glow Effects */}
      <div className="absolute bottom-[32%] left-[50%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-blueGlow rounded-full blur-3xl md:blur-5xl lg:blur-6xl opacity-40 pointer-events-none -z-20"></div>
      <div className="absolute top-[32%] left-[26%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow rounded-full blur-3xl md:blur-5xl lg:blur-6xl opacity-60 pointer-events-none -z-20"></div>
    </section>
  );
};

export default About;
