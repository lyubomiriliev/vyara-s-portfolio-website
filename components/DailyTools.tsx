import React from "react";

const DailyTools: React.FC = () => {
  return (
    <section className="w-full flex flex-col justify-center py-10 items-center">
      <div className="flex items-center space-x-6 relative">
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-2xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-2xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-2xl"></div>
        <div className="w-56 h-36 bg-transparent border-[1px] border-textGray/20 rounded-2xl"></div>
        <div className="absolute inset-0 m-auto justify-center flex  flex-col items-center mt-20">
          <div className="bg-cardBG px-12 py-4 rounded-full text-xl items-center flex uppercase font-light border-[1px] text-white border-white">
            Tools I Use Daily
          </div>
          <div className="flex flex-col justify-center items-center mt-6">
            <h3 className="text-white text-2xl font-extrabold tracking-wide uppercase">
              professional experience
            </h3>
            <p className="text-white text-sm font-extralight">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 md:mt-20"></div>
    </section>
  );
};

export default DailyTools;
