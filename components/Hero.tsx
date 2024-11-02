import React from "react";
import Header from "./Header";
import Button from "./Button";
import Image from "next/image";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-svh flex flex-col items-center text-center text-white overflow-hidden">
      {/* Header */}
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 top-96 bg-gradient-to-b from-transparent to-black"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-end items-center min-h-[70vh] px-4 md:px-0 select-none">
        <div>
          <Image
            width={1200}
            height={1600}
            quality={100}
            src="/images/heroPhone.png"
            alt="Phone Image"
            className="absolute w-full sm:w-[75%] xl:w-[80%] bottom-[150px] left-2 md:-top-44 md:left-20 -z-10 object-cover"
          />
          <h1 className="text-5xl text-center sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-tight mb-4 drop-shadow-lg uppercase">
            Social Media Specialist
          </h1>
        </div>
        <p className="text-lg mdtext-justify sm:text-xl md:text-2xl max-w-2xl text-gray-300 leading-relaxed px-4">
          Helping brands grow and engage with their audience through creative
          and data-driven social media strategies.
        </p>
        <div className="flex sm:flex-row mt-4 gap-4">
          <Button text="Explore More" />
          <Button text="Linkedin" variant="outline" />
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
