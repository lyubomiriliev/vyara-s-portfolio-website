import React from "react";
import { educationData } from "@/utils/constants";

const Timeline: React.FC = () => {
  return (
    <section className="text-white pb-20 px-8 md:px-20">
      {/* Education Section */}
      <div className=" flex flex-col">
        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:flex relative items-center justify-center max-w-screen-md mx-auto">
          {/* Main Timeline Line */}
          <div className="absolute w-full h-[2px] bg-primary top-1/2" />

          {educationData.map((item, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center text-center w-[190px] ${
                index % 2 === 0 ? "mt-8" : "mt-8"
              } ${index % 2 === 0 ? "flex-col" : "flex-col-reverse"}`}
              style={{
                top: index % 2 === 0 ? "-5.2rem" : "2.6rem",
              }}
            >
              {/* Timeline Dot */}
              <div
                className={`absolute ${
                  index % 2 === 0
                    ? "top-full mt-[19px]"
                    : "bottom-full mb-[8px]"
                } w-4 h-4 rounded-full bg-primary`}
              />

              <div className="flex flex-col items-center justify-center text-center">
                <div>
                  <p className="text-base font-semibold text-white">
                    {item.dateRange}
                  </p>
                </div>
                <div className="text-center w-full whitespace-nowrap">
                  <h3 className="text-lg md:text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                  <span className="text-sm md-text-xl lg:text-xl font-light">
                    {item.span}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="flex flex-col md:hidden relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-primary" />

          {educationData.map((item, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } -my-3`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />

              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "text-right pr-6" : "text-left pl-6"
                }`}
              >
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <span className="text-sm md-text-xl lg:text-xl font-light">
                  {item.span}
                </span>
                <p className="text-sm text-white font-semibold">
                  {item.dateRange}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
