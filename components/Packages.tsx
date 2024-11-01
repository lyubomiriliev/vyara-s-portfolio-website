import React from "react";
import { packages } from "@/utils/constants";
import SectionHeading from "./SectionHeading";
import Button from "./Button";

const Packages: React.FC = () => {
  return (
    <section className="text-white py-8">
      <SectionHeading
        title="Packages"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, fugit."
      />
      <div className="flex w-full max-w-screen-lg mx-auto justify-center gap-10 px-4">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="relative group bg-cardBG border border-textGray/20 p-8 space-y-4 rounded-xl text-center transition-transform duration-300 transform hover:scale-110 hover:border-primary"
          >
            <h4 className="text-2xl font-bold mb-3">{pkg.name}</h4>
            <div className="bg-textGray/30 w-full h-[1px]"></div>
            <p className="text-left text-textGray">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              dolor excepturi laborum atque accusantium voluptates itaque omnis
              dolores nemo provident?
            </p>
            <ul className="text-white mb-4 text-left">
              {pkg.features.map((feature, i) => (
                <li key={i} className="mb-2 flex items-center">
                  <span className="text-primary mr-2">✔</span>
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
