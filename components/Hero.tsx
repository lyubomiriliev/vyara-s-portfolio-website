"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  containerVariants,
  itemVariants,
  titleVariant,
} from "@/utils/animations";

const words = ["Manager", "Expert", "Psychologist", "Master", "Nomad"];

const Hero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState(words[0]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseDuration = 1000;

  useEffect(() => {
    if (!hasInitialized) {
      setTimeout(() => setHasInitialized(true), pauseDuration);
      return;
    }

    const currentWord = words[currentWordIndex];

    if (isDeleting) {
      if (displayedText.length > 0) {
        setTimeout(
          () => setDisplayedText((prev) => prev.slice(0, -1)),
          deletingSpeed
        );
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }
    } else {
      if (displayedText.length < currentWord.length) {
        setTimeout(
          () =>
            setDisplayedText(
              (prev) => prev + currentWord.charAt(displayedText.length)
            ),
          typingSpeed
        );
      } else {
        setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    }
  }, [displayedText, isDeleting, currentWordIndex, hasInitialized]);

  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 120; // Adjust to your header height
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLinkedInClick = () => {
    window.open(
      "https://www.linkedin.com/in/vyara-ivanova-ilieva-4a46071ba/",
      "_blank"
    );
  };

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col justify-between items-center text-center text-white py-28 md:py-56 overflow-hidden"
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -top-16 -z-20 w-full h-full overflow-hidden select-none">
        <Image
          priority
          width={1200}
          height={800}
          unoptimized
          src="/backgrounds/BGHero.avif"
          alt="Background Image"
          className="w-full h-screen lg:h-full object-cover"
        />
        <div className="absolute inset-0 top-96 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Hero Content */}
      <div className="w-full z-10 flex flex-col justify-end items-center min-h-[70vh] px-4 md:px-0 select-none">
        <motion.div
          initial="hidden"
          animate="show"
          variants={containerVariants}
          className="absolute w-[95%] sm:w-[75%] mt-20 bottom-[300px] left-5 md:bottom-[280px] md:left-24 md:w-[80%] lg:w-[39%] lg:-top-[108px] lg:left-[32%] -z-10"
        >
          <Image
            width={1200}
            height={1600}
            unoptimized
            src="/images/AVIVA.svg.svg"
            alt="Phone Image"
            className="object-cover"
          />
        </motion.div>
        <div className="flex flex-col w-full justify-center items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="w-full h-28 lg:h-40 flex flex-col justify-start items-center"
          >
            <motion.div initial="hidden" animate="show" variants={itemVariants}>
              <h1 className="text-6xl max-w-[480px] mx-auto justify-center items-center overflow-hidden sm:text-5xl md:text-6xl lg:text-6xl font-extralight tracking-tighter leading-tighter drop-shadow-lg uppercase">
                Social Media{" "}
              </h1>
            </motion.div>
            <div className="uppercase -mt-4">
              <span className="text-primary text-[50px] lg:text-[85px] font-extrabold inline-block relative min-w-7">
                {displayedText}
                <span
                  className={`absolute top-4 lg:top-7 -right-4
                  w-[8px] h-[60%] bg-primary ${
                    isDeleting ||
                    displayedText.length < words[currentWordIndex].length
                      ? "animate-blink"
                      : ""
                  }`}
                ></span>
              </span>
            </div>
          </motion.div>

          <p className="text-md md:text-center font-light text-center sm:text-xl md:text-2xl max-w-3xl text-gray-300 leading-relaxed px-4 md:px-0">
            Helping brands grow and engage with their audience through creative
            and data-driven social media strategies.
          </p>
        </div>
        <motion.div
          initial="hidden"
          animate="show"
          variants={titleVariant}
          className="flex py-6 md:py-4 justify-center w-full gap-4 items-center"
        >
          <Button
            type="button"
            onClick={() => handleScrollToSection("contact")}
            text="Contact me"
            icon="/icons/contact.png"
          />
          <Button
            type="button"
            onClick={handleLinkedInClick}
            text="Linkedin"
            variant="outline"
            icon="/icons/white/linkedinw.png"
            hoverIcon="/icons/linkedin.png"
          />
        </motion.div>
      </div>

      {/* Background Decorations */}
      <div className="bg-dark w-full scale-150 opacity-80 h-24 absolute -top-6 blur-xl -z-20"></div>
      <div className="bg-gradient-to-b from-dark to-transparent w-full h-20 -z-20 blur-md absolute -top-20 scale-150"></div>
      <div className="bg-gradient-to-t from-dark to-transparent w-full h-20 absolute bottom-[83px] scale-150"></div>
    </section>
  );
};

export default Hero;
