"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { itemVariants } from "@/utils/animations";

const AnimatedAbout = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      variants={itemVariants}
      viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% of the section is visible
      className="flex flex-col md:flex-row justify-center gap-8 md:gap-10 lg:gap-16 items-center w-full md:w-4/5 lg:w-2/3 px-4 lg:px-0"
    >
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
        Social Media Specialist with a passion for helping brands reach their
        potential. Experienced in multi-platform strategies and content
        creation. Social Media Specialist with a passion for helping brands
        reach their potential. Experienced in multi-platform strategies and
        content creation. Social Media Specialist with a passion for helping
        brands reach their potential. Experienced in multi-platform strategies
        and content creation.
      </p>
    </motion.div>
  );
};

export default AnimatedAbout;
