import React from "react";
import { platformsWhite } from "../utils/constants";
import Image from "next/image";

const DailyTools: React.FC = () => {
  return (
    <section className="w-full flex flex-col justify-center py-10 items-center">
      <div className="flex items-center space-x-6 relative">
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-3xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-3xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-3xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-3xl"></div>
        <div className="absolute inset-0 m-auto justify-center flex  flex-col items-center mt-20">
          <div className="bg-cardBG px-12 py-4 mt-10 rounded-full text-xl items-center flex uppercase font-light gap-2 border-[1px] text-white border-white">
            Tools I Use Daily
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <h3 className="text-white text-2xl font-extrabold uppercase">
              professional experience
            </h3>
            <p className="text-white text-sm font-extralight">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
      <div className="flex mt-20 gap-6">
        {platformsWhite.slice(0, 5).map((platform, index) => (
          <div
            key={index}
            className="w-44 h-24 justify-center items-center flex bg-transparent border-[1px] border-textGray/20 rounded-3xl"
          >
            <Image
              width={200}
              height={200}
              className="w-full scale-75 h-12 object-fit"
              src={platform.icon}
              alt={platform.name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyTools;
