// components/Packages.tsx
import React from "react";
import { packages } from "@/utils/constants";
import SectionHeading from "./SectionHeading";
import Button from "./Button";
import { BsCheckCircle } from "react-icons/bs";

const Packages: React.FC = () => {
  return (
    <section className="text-white py-8 relative">
      <SectionHeading
        title="Packages"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, fugit."
      />
      <div className="flex flex-col  md:flex-row w-full max-w-screen-lg mx-auto justify-center gap-10 px-6 md:px-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="relative group bg-cardBG border-2 border-textGray/20 p-8 space-y-4 rounded-xl text-center transition-transform duration-300 transform md:hover:scale-110 hover:border-primary overflow-hidden"
          >
            {/* Left and Right Blurred Circles */}
            <div className="absolute -right-6 top-1/5 transform -translate-y-1/2 w-20 h-20 rounded-full bg-secondary opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute -left-6 bottom-1/3 transform -translate-y-1/2 w-20 h-20 rounded-full bg-primary opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="absolute -right-6 -bottom-14 transform -translate-y-1/2 w-20 h-20 rounded-full bg-secondary opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100"></div>

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
