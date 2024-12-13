import Image from "next/image";
import React from "react";
import AnimatedAbout from "./AnimatedAbout";

const About: React.FC = () => {
  return (
    <section className="text-white md:py-10 lg:py-16 relative">
      <div className="flex flex-col items-center mb-10">
        <div className="flex py-6 gap-2 flex-col justify-center items-center">
          <h2 className="uppercase font-extralight text-lg md:text-xl lg:text-2xl">
            about me
          </h2>
          <Image
            width={400}
            height={200}
            src="/images/vyaraName.png"
            className="w-full max-w-xs md:max-w-lg lg:max-w-xl"
            alt="Vyara Ivanova Ilieva"
          />
          {/* "Open for work" badge for larger screens */}
          <div className="bg-textGray/20 px-6 py-1.5 mt-2 rounded-full hidden items-center md:flex uppercase font-bold gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-2 w-2 rounded-full"></div>
            Open for work
          </div>
        </div>

        {/* Profile Image and Description */}
        <AnimatedAbout />
      </div>

      {/* Background Glow Effects */}
      <div className="absolute bottom-[32%] left-[50%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-blueGlow rounded-full blur-3xl md:blur-5xl lg:blur-6xl opacity-40 pointer-events-none -z-20"></div>
      <div className="absolute top-[32%] left-[26%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow rounded-full blur-3xl md:blur-5xl lg:blur-6xl opacity-60 pointer-events-none -z-20"></div>
    </section>
  );
};

export default About;
