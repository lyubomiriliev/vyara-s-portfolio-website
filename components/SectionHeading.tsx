import React from "react";

interface Heading {
  title: string;
  subTitle: string;
}

const SectionHeading: React.FC<Heading> = ({ title, subTitle }) => {
  return (
    <div className="flex flex-col justify-center items-center mb-10 gap-2">
      <h3 className="text-center text-4xl lg:text-6xl font-semibold uppercase">
        {title}
      </h3>
      <p className="uppercase text-base lg:text-base max-w-[380px] font-light text-center">
        {subTitle}
      </p>
    </div>
  );
};

export default SectionHeading;
