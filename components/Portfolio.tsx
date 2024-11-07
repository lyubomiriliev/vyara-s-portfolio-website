"use client";

import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import { portfolioLinks } from "@/utils/constants";
import Designs from "./Designs";

const Portfolio = () => {
  const [designsOpen, setDesignsOpen] = useState(true);

  const centerCardIndex = Math.floor(portfolioLinks.length / 2);
  const [selectedCardIndex, setSelectedCardIndex] = useState(centerCardIndex);

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index);
    setDesignsOpen(!designsOpen);
  };

  return (
    <section id="portfolio" className="text-white py-8">
      <SectionHeading
        title="Portfolio"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, praesentium."
      />
      <div className="flex flex-col w-full max-w-screen-lg mx-auto justify-center items-center text-white px-4 md:px-0">
        <div className="w-full grid grid-cols-3 justify-center items-center p-2 gap-4 lg:gap-10 relative rounded-lg">
          {portfolioLinks.map((link, index) => (
            <div
              onClick={() => handleCardClick(index)}
              className={`${
                selectedCardIndex === index
                  ? "h-24 bg-cardBG border-2 border-primary scale-110 transition-all duration-500 ease-in-out p-2 items-center justify-center flex rounded-lg relative overflow-hidden"
                  : "h-24 bg-cardBG p-2 items-center justify-center flex rounded-lg relative overflow-hidden"
              }`}
              key={index}
            >
              <h1 className="text-lg lg:text-2xl uppercase">{link}</h1>
              <div className="absolute h-24 w-24 blur-3xl -top-12 rounded-full bg-pinkGlow "></div>
            </div>
          ))}
        </div>
        {designsOpen && <Designs />}
      </div>
    </section>
  );
};

export default Portfolio;
