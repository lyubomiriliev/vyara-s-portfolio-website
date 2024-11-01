import Image from "next/image";
import React from "react";

const About: React.FC = () => {
  return (
    <section className="text-white py-10 px-10 text-center">
      <div className="flex flex-col items-center mb-10">
        <div className="flex py-6 gap-2 flex-col justify-center items-center">
          <h2 className="uppercase font-extralight text-xl">about me</h2>
          <Image
            width={400}
            height={200}
            src="/images/vyaraName.png"
            className="w-full"
            alt="Vyara Ivanova Ilieva"
          />
          <div className="bg-textGray/20 px-6 py-1.5 mt-2 rounded-full items-center flex uppercase font-light gap-2 border-[1px] border-white">
            <div className="bg-green-300 h-1 w-1 rounded-full"></div>
            Open for work
          </div>
        </div>

        <div className="flex justify-center gap-20 items-center w-2/3">
          <Image
            width={1000}
            height={1000}
            quality={100}
            src="/profile/profilepic.jpg"
            alt="Vyara Ivanova Ilieva"
            className="w-96 h-96 border-2 object-cover rounded-full mb-6 shadow-lg"
          />
          <p className="max-w-md text-gray-300 text-justify leading-relaxed text-lg mb-8">
            Social Media Specialist with a passion for helping brands reach
            their potential. Experienced in multi-platform strategies and
            content creation. Social Media Specialist with a passion for helping
            brands reach their potential. Experienced in multi-platform
            strategies and content creation.Social Media Specialist with a
            passion for helping brands reach their potential. Experienced in
            multi-platform strategies and content creation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
