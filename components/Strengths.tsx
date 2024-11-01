import React from "react";
import SectionHeading from "./SectionHeading";

const Strengths: React.FC = () => {
  return (
    <section className="text-white w-full flex flex-col max-w-screen-xl mx-auto items-center py-12">
      <SectionHeading
        title="Strengths"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, eos?"
      />
      <div className="flex  gap-4">
        <div className="flex w-72 flex-col gap-4">
          <div className="h-60 rounded-xl bg-cardBG"></div>
          <div className="h-60 rounded-xl bg-cardBG"></div>
          <div className="h-60 rounded-xl bg-cardBG"></div>
        </div>
        <div className="w-96 rounded-xl overflow-hidden">
          <img
            src="/images/skillsBG.jpg"
            className="object-cover w-full h-full"
            alt="Skills"
          />
        </div>
        <div className="flex w-72 flex-col gap-4">
          <div className="flex-1 h-60 rounded-xl bg-cardBG"></div>
          <div className="flex-1 h-60 rounded-xl bg-cardBG"></div>
          <div className="flex-1 h-60 rounded-xl bg-cardBG"></div>
        </div>
      </div>
    </section>
  );
};

export default Strengths;
