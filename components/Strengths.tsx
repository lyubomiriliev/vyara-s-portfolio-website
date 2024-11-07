import React from "react";
import SectionHeading from "./SectionHeading";
import { strengths } from "../utils/constants";
import Image from "next/image";
import StrengthCard from "./StrengthCard";

const Strengths: React.FC = () => {
  return (
    <section id="strengths" className="text-white py-8 justify-center items-center flex flex-col mx-auto max-w-screen-lg">
      <SectionHeading
        title="Key Strengths"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eos?"
      />

      {/* Main Container */}
      <div className="flex flex-col justify-center items-center lg:flex-row w-full gap-8 md:gap-6 lg:gap-8">
        {/* Left Side Strengths */}
        <div className="flex flex-col gap-8 items-center lg:items-end justify-center w-full md:w-2/3 lg:w-1/3">
          {strengths.slice(0, 3).map((strength, index) => (
            <div
              key={index}
              className="flex items-center text-center w-[80%] ml-8 lg:ml-0 lg:w-full lg:max-w-[350px]"
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
        </div>

        {/* Center Circle with Image */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-primary shadow-lg">
            <Image
              src="/images/skillsBG.jpg"
              width={800}
              height={800}
              alt="Skills"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* Right Side Strengths */}
        <div className="flex flex-col gap-8 items-center lg:items-start md:mr-0 justify-center w-full md:w-2/3 lg:w-1/3">
          {strengths.slice(3, 6).map((strength, index) => (
            <div
              key={index}
              className="flex items-center text-center w-[80%] mr-8 lg:mr-0 lg:w-full lg:max-w-[350px]"
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
        </div>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute bottom-[85%] left-[25%] md:bottom-[45%] md:left-[36%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow rounded-full blur-4xl md:blur-5xl lg:blur-6xl pointer-events-none -z-20"></div>
    </section>
  );
};

export default Strengths;
