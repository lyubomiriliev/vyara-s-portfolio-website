"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Button from "./Button";
import Image from "next/image";

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

  return (
    <section id="home" className="relative min-h-svh flex flex-col justify-between items-center text-center text-white md:py-28 overflow-hidden">
      <Header />
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -top-16 -z-20 w-full h-full overflow-hidden select-none">
        <Image
          layout="fill"
          unoptimized
          quality={100}
          src="/backgrounds/BGHero.avif"
          alt="Background Image"
          className="object-cover"
        />
        <div className="absolute inset-0 top-96 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Hero Content */}
      <div className="z-10 flex flex-col justify-end items-center min-h-[70vh] px-4 md:px-0 select-none">
        <div>
          <Image
            width={1200}
            height={1600}
            quality={100}
            src="/images/heroPhone.png"
            alt="Phone Image"
            className="absolute w-[95%] sm:w-[75%] bottom-[200px] left-5 md:bottom-[280px] md:left-24 md:w-[80%]  lg:w-[36%] lg:-top-[90px] lg:left-[32%] -z-10 object-cover"
          />
        </div>
        <div className="flex flex-col justify-centerm items-center  w-full">
          <h1 className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tighter leading-tighter drop-shadow-lg uppercase">
            Social Media{" "}
            <span className="text-primary font-extrabold inline-block relative min-w-7">
              {displayedText}
              <span
                className={`absolute top-0 -right-4
                  w-[10px] h-full bg-primary ${
                    isDeleting ||
                    displayedText.length < words[currentWordIndex].length
                      ? "animate-blink"
                      : ""
                  }`}
              ></span>
            </span>
          </h1>
          <p className="text-md md:text-center font-light sm:text-xl md:text-2xl max-w-3xl text-gray-300 leading-relaxed px-4 md:px-0">
            Helping brands grow and engage with their audience through creative
            and data-driven social media strategies.
          </p>
        </div>
        <div className="flex py-6 md:py-4 justify-center w-full gap-4 items-center">
          <Button text="Contact me" icon="/icons/contact.png" />
          <Button
            text="Linkedin"
            variant="outline"
            icon="/icons/white/linkedinw.png"
            hoverIcon="/icons/linkedin.png"
          />
        </div>
      </div>

      {/* Background Decorations */}
      <div className="bg-dark w-full scale-150 opacity-80 h-24 absolute -top-6 blur-xl -z-20"></div>
      <div className="bg-gradient-to-b from-dark to-transparent w-full h-20 -z-20 blur-md absolute -top-20 scale-150"></div>
      <div className="bg-gradient-to-t from-dark to-transparent w-full h-20 absolute bottom-[83px] scale-150"></div>
    </section>
  );
};

export default Hero;
