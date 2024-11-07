import React from "react";
import SectionHeading from "./SectionHeading";
import { strengths } from "../utils/constants";
import Image from "next/image";
import StrengthCard from "./StrengthCard";

const Strengths: React.FC = () => {
  return (
    <section className="text-white w-full flex flex-col max-w-screen-xl mx-auto items-center py-12 relative px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Key Strengths"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eos?"
      />

      {/* Main Container */}
      <div className="relative flex justify-center items-center w-full lg:flex-row gap-8 py-10">
        {/* Left Side Strengths */}
        <div className="flex flex-col gap-6 items-end w-1/3">
          {strengths.slice(0, 3).map((strength, index) => (
            <div
              key={index}
              className="relative flex items-center rounded-lg shadow-lg text-center w-full max-w-[350px]"
            >
              <StrengthCard
                title={strength.title}
                description={strength.description}
                icon={strength.icon}
                bgColor={
                  index % 2 === 0
                    ? "bg-gradient-to-r from-primary to-darkPrimary"
                    : "bg-gradient-to-r from-cyan-300 to-cyan-500"
                } // Alternate colors
              />
            </div>
          ))}
          <div className="flex flex-col">
            <div className="bg-white w-44 h-[3px] rotate-[20deg] -z-10 absolute top-[120px] left-1/3"></div>
            <div className="bg-white w-44 h-[3px] -z-10 absolute bottom-56 left-1/3"></div>
            <div className="bg-white w-44 h-[3px] -rotate-[20deg] -z-10 absolute bottom-[120px] left-1/3"></div>
          </div>
        </div>

        {/* Center Circle with Image */}
        <div className="relative flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-primary shadow-lg">
            <Image
              src="/images/skillsBG.jpg"
              width={400}
              height={400}
              alt="Skills"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Side Strengths */}
        <div className="flex flex-col gap-6 items-start w-1/3">
          {strengths.slice(3, 6).map((strength, index) => (
            <div
              key={index}
              className="relative flex items-end rounded-lg shadow-lg text-center w-full max-w-[350px]"
            >
              <StrengthCard
                title={strength.title}
                description={strength.description}
                icon={strength.icon}
                bgColor={
                  index % 2 === 0
                    ? "bg-gradient-to-r from-darkPrimary to-primary"
                    : "bg-gradient-to-r from-cyan-500 to-cyan-300"
                } // Alternate colors
                reverse
              />
            </div>
          ))}
          <div className="flex">
            <div className="bg-white w-44 h-[3px] rotate-[160deg] -z-10 absolute top-[120px] right-1/3"></div>
            <div className="bg-white w-44 h-[3px] -z-10 absolute bottom-56 right-1/3"></div>
            <div className="bg-white w-44 h-[3px] -rotate-[160deg] -z-10 absolute bottom-[120px] right-1/3"></div>
          </div>
        </div>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute bottom-[85%] left-[25%] md:bottom-[45%] md:left-[36%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow rounded-full blur-4xl md:blur-5xl lg:blur-6xl pointer-events-none -z-20"></div>
    </section>
  );
};

export default Strengths;
