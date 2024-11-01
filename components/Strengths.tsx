// components/Strengths.tsx
import React from "react";
import SectionHeading from "./SectionHeading";
import { strengths } from "../utils/constants";

const Strengths: React.FC = () => {
  return (
    <section className="text-white w-full flex flex-col max-w-screen-xl mx-auto items-center py-12">
      <SectionHeading
        title="Strengths"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eos?"
      />
      <div className="flex gap-4">
        {/* Left Column */}
        <div className="flex w-72 flex-col gap-4">
          {strengths.slice(0, 3).map((strength, index) => (
            <div
              key={index}
              className="h-60 rounded-xl bg-cardBG p-6 flex flex-col justify-around"
            >
              <div className="flex flex-col items-start gap-4">
                <img src={strength.icon} alt="" className="w-10 h-10" />
                <h3 className="text-xl font-semibold">{strength.title}</h3>
                <div className="w-2/3 h-[1px] bg-textGray"></div>
              </div>
              <p className="text-textGray">{strength.description}</p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="w-96 rounded-xl overflow-hidden">
          <img
            src="/images/skillsBG.jpg"
            className="object-cover w-full h-full"
            alt="Skills"
          />
        </div>

        {/* Right Column */}
        <div className="flex w-72 flex-col gap-4">
          {strengths.slice(3).map((strength, index) => (
            <div
              key={index}
              className="h-60 rounded-xl bg-cardBG p-6 flex flex-col justify-between"
            >
              <div className="flex flex-col items-start gap-4">
                <img src={strength.icon} alt="" className="w-10 h-10" />
                <h3 className="text-xl font-semibold">{strength.title}</h3>
                <div className="w-2/3 h-[1px] bg-textGray"></div>
              </div>
              <p className="text-textGray">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Strengths;
