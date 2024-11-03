import React from "react";
import SectionHeading from "./SectionHeading";
import { strengths } from "../utils/constants";
import Image from "next/image";

const Strengths: React.FC = () => {
  return (
    <section className="text-white w-full flex flex-col max-w-screen-xl mx-auto items-center py-12 relative px-4 sm:px-6 lg:px-8">
      <SectionHeading
        title="Strengths"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eos?"
      />

      {/* Responsive Flex Container */}
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center lg:items-stretch w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4">
          {strengths.slice(0, 3).map((strength, index) => (
            <div
              key={index}
              className="h-60 rounded-xl bg-cardBG p-6 flex flex-col justify-around text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start gap-4">
                <Image
                  width={600}
                  height={600}
                  src={strength.icon}
                  alt=""
                  className="w-10 h-10"
                />
                <h3 className="text-xl font-semibold">{strength.title}</h3>
                <div className="w-2/3 h-[1px] bg-textGray"></div>
              </div>
              <p className="text-textGray">{strength.description}</p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="w-full h-60 md:h-full lg:w-1/3 rounded-xl overflow-hidden">
          <Image
            width={1200}
            height={1200}
            quality={100}
            src="/images/skillsBG.jpg"
            className="object-cover w-full h-full "
            alt="Skills"
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4">
          {strengths.slice(3).map((strength, index) => (
            <div
              key={index}
              className="h-60 rounded-xl bg-cardBG p-6 flex flex-col justify-around text-center lg:text-left"
            >
              <div className="flex flex-col items-center lg:items-start gap-4">
                <Image
                  width={600}
                  height={600}
                  src={strength.icon}
                  alt=""
                  className="w-10 h-10"
                />
                <h3 className="text-xl font-semibold">{strength.title}</h3>
                <div className="w-2/3 h-[1px] bg-textGray"></div>
              </div>
              <p className="text-textGray">{strength.description}</p>
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
