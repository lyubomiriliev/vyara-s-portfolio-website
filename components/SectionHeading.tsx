import React from "react";

interface Heading {
  title: string;
  subTitle: string;
}

const SectionHeading: React.FC<Heading> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col justify-center items-center mb-10 gap-2">
      <h3 className="text-center text-4xl font-bold uppercase">{title}</h3>
      <p className="uppercase text-base">{subTitle}</p>
    </div>
  );
};

export default SectionHeading;
