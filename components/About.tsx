import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <section className="text-white md:py-10 relative">
      <div className="flex flex-col items-center mb-10">
        <div className="flex py-6 gap-2 flex-col justify-center items-center">
          <h2 className="uppercase font-extralight text-lg md:text-xl">
            about me
          </h2>
          <Image
            width={400}
            height={200}
            src="/images/vyaraName.png"
            className="w-full max-w-xs md:max-w-xl"
            alt="Vyara Ivanova Ilieva"
          />
          <div className="bg-textGray/20 px-6 py-1.5 mt-2 rounded-full hidden items-center md:flex uppercase font-light gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-1 w-1 rounded-full"></div>
            Open for work
          </div>
        </div>

        {/* Profile Image and Description */}
        <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-20 items-center w-full md:w-2/3">
          <Image
            width={1000}
            height={1000}
            quality={100}
            src="/profile/profilepic.jpg"
            alt="Vyara Ivanova Ilieva"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-2 object-cover rounded-full md:mb-6 shadow-lg"
          />
          <div className="bg-textGray/20 px-6 py-1.5 rounded-full flex items-center md:hidden uppercase font-light gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-1 w-1 rounded-full"></div>
            Open for work
          </div>
          <p className="max-w-md text-gray-300 text-justify leading-relaxed text-base md:text-lg mb-8 px-4 md:px-0">
            Social Media Specialist with a passion for helping brands reach
            their potential. Experienced in multi-platform strategies and
            content creation. Social Media Specialist with a passion for helping
            brands reach their potential. Experienced in multi-platform
            strategies and content creation. Social Media Specialist with a
            passion for helping brands reach their potential. Experienced in
            multi-platform strategies and content creation.
          </p>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute bottom-[32%] left-[50%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-blueGlow rounded-full blur-3xl md:blur-5xl opacity-40 pointer-events-none -z-20"></div>
      <div className="absolute top-[32%] left-[26%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow rounded-full blur-3xl md:blur-5xl opacity-60 pointer-events-none -z-20"></div>
    </section>
  );
};

export default About;
