"use client";
import React, { useState, useRef } from "react";
import { packages } from "@/utils/constants";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { BsCheckCircle } from "react-icons/bs";

const Packages: React.FC = () => {
  const centerCardIndex = Math.floor(packages.length / 2);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(centerCardIndex);
  const cardRefs = useRef<HTMLDivElement[]>([]); // Array of refs for each card

  // Scroll to the card when clicked
  const handleCardClick = (index: number) => {
    if (cardRefs.current[index]) {
      cardRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <section className="text-white py-8 relative">
      <SectionHeading
        title="Packages"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, fugit."
      />
      <div className="flex flex-col md:flex-row w-full max-w-screen-lg mx-auto justify-center gap-10 py-5 px-6 md:px-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el!; // Set the ref for each card
            }} // Adjusted ref function to have no return value
            onClick={() => handleCardClick(index)} // Call scroll handler on click
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(centerCardIndex)}
            className={`relative group bg-cardBG border-2 p-8 space-y-4 rounded-xl text-center transition-transform duration-300 transform overflow-hidden
             ${
               hoveredCardIndex === index
                 ? "scale-110 border-primary"
                 : "border-textGray/20"
             }
           `}
          >
            {/* Left and Right Blurred Circles */}
            <div
              className={`absolute -right-6 top-1/5 transform -translate-y-1/2 w-20 h-20 rounded-full bg-secondary blur-3xl transition-opacity duration-300 ${
                hoveredCardIndex === index ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute -left-6 bottom-1/3 transform -translate-y-1/2 w-20 h-20 rounded-full bg-primary blur-3xl transition-opacity duration-300 ${
                hoveredCardIndex === index ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`absolute -right-6 -bottom-14 transform -translate-y-1/2 w-20 h-20 rounded-full bg-secondary blur-3xl transition-opacity duration-300 ${
                hoveredCardIndex === index ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            <h4 className="text-2xl font-bold mb-3">{pkg.name}</h4>
            <div className="bg-textGray/30 w-full h-[1px]"></div>
            <p className="text-left text-textGray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              dolor excepturi laborum atque accusantium voluptates itaque omnis
              dolores nemo provident?
            </p>
            <ul className="text-white mb-4 text-left">
              {pkg.features.map((feature, i) => (
                <li key={i} className="mb-2 gap-2 flex items-center">
                  <BsCheckCircle />
                  {feature}
                </li>
              ))}
            </ul>
            <Button text="GET STARTED" variant="outline" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
