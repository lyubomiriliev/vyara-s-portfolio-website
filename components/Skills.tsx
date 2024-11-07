import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import SocialMediaPlatforms from "./SocialMediaPlatforms";
import SkillCard from "./SkillCard";
import { skills } from "@/utils/constants";

const Skills: React.FC = () => {
  return (
    <>
      {/* DESKTOP COMPONENT */}
      <section className="text-white py-16 hidden md:block px-10 relative">
        <SectionHeading
          title="Tools & Services"
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          possimus?"
        />
        <div className="flex">
          <SocialMediaPlatforms />
        </div>
        <div className="w-full flex flex-col items-center py-6 max-w-screen-lg mx-auto">
          <div className="flex">
            <div className="flex gap-4">
              {skills.slice(0, 1).map((skill, index) => (
                <SkillCard
                  key={index}
                  title={skill.title}
                  desc={skill.description}
                  img={skill.img}
                  variant={index === 0 ? "large" : "desktop"}
                />
              ))}
              <div className="flex-col space-y-4">
                {skills.slice(1, 3).map((skill, index) => (
                  <SkillCard
                    key={index}
                    title={skill.title}
                    desc={skill.description}
                    img={skill.img}
                    variant="desktop"
                  />
                ))}
              </div>
              <div className="flex-col space-y-4">
                {skills.slice(3, 5).map((skill, index) => (
                  <SkillCard
                    key={index}
                    title={skill.title}
                    desc={skill.description}
                    img={skill.img}
                    variant="desktop"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            {skills.slice(5, 9).map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.title}
                desc={skill.description}
                img={skill.img}
                variant={
                  index === 0
                    ? "desktop"
                    : index === 1
                    ? "desktop"
                    : index === 2
                    ? "desktop"
                    : "desktop"
                }
              />
            ))}
          </div>
        </div>
        <div className="absolute  bottom-[50%] left-[40%] w-[400px] h-[400px] bg-blueGlow rounded-full blur-5xl pointer-events-none -z-20"></div>
      </section>

      {/* MOBILE COMPONENT */}
      <section className="text-white block md:hidden px-4 relative">
        <SectionHeading
          title="Tools & Services"
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, possimus?"
        />
        <div>
          <SocialMediaPlatforms />
        </div>
        <div className="w-full grid grid-cols-2 gap-4 items-center py-6 justify-center">
          {skills.map((skill, index) => (
            <div className="w-full" key={index}>
              <SkillCard
                title={skill.title}
                desc={skill.description}
                variant="mobile"
                img={skill.img}
              />
            </div>
          ))}
        </div>

        {/* Background Glow Effect */}
        <div className="absolute bottom-[63%] left-[9%] md:bottom-[50%] md:left-[40%] w-[400px] h-[400px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-blueGlow/80 rounded-full blur-3xl md:blur-5xl pointer-events-none -z-20"></div>
        <div className="absolute bottom-[20%] left-[10%] md:bottom-[50%] md:left-[40%] w-[400px] h-[400px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-pinkGlow/80 rounded-full blur-3xl md:blur-5xl pointer-events-none -z-20"></div>
      </section>
    </>
  );
};

export default Skills;
