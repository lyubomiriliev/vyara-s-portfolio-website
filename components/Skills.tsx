import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";

const Skills: React.FC = () => {
  return (
    <>
      {/* DESKTOP COMPONENT */}
      <section className="text-white py-16 hidden md:block px-10 relative">
        <SectionHeading
          title="Skills"
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
          possimus?"
        />
        <div className="w-full flex flex-col py-8 justify-center items-center gap-4 max-w-screen-xl mx-auto">
          <div className="flex gap-4">
            <div className="flex">
              <div className="w-80 flex flex-col p-4 justify-center items-start space-y-4 rounded-xl bg-cardBG border-textGray/10 border-[1px]">
                <Image
                  width={600}
                  height={600}
                  src="/images/strategy.png"
                  alt="SkillIcon"
                  className="w-14 h-14 object-cover"
                />
                <h1 className="text-2xl uppercase font-bold">Brand Strategy</h1>
                <p className="text-sm text-textGray">
                  Creating cohesive brand identities with unique styles,
                  slogans, colors, and messaging.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex">
                <div className="w-80 h-[244px] rounded-xl flex justify-center items-start flex-col p-6 space-y-4 bg-cardBG border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                    Email marketing
                  </h1>
                  <p className="text-sm text-textGray">
                    Running weekly campaigns, managing databases, and optimizing
                    for better engagement.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80 h-[244px] rounded-xl flex justify-center items-start flex-col p-4 space-y-4 bg-cardBG border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                    Email marketing
                  </h1>
                  <p className="text-sm text-textGray">
                    Tailoring plans to drive campaigns, promotions,
                    partnerships, and product launches.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex">
                <div className="w-80 h-[244px] rounded-xl flex justify-center items-start flex-col p-4 space-y-4 bg-cardBG border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                    Creative content creation
                  </h1>
                  <p className="text-sm text-textGray">
                    Producing engaging content, from concept to design,
                    copywriting, and scheduling.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80 h-[244px] rounded-xl flex justify-center items-start flex-col p-4 space-y-4 bg-cardBG border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-xl uppercase font-bold">
                    Influencer & B2B partnerships
                  </h1>
                  <p className="text-sm text-textGray">
                    Building strategic partnerships with influencers and
                    business partners, managing contracts, campaigns, and
                    performance to align with brand goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-4 justify-center items-center">
              <div className="flex">
                <div className="w-56 h-[300px] rounded-xl bg-cardBG justify-center p-4 space-y-4 border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                    Content production
                  </h1>
                  <p className="text-sm text-textGray">
                    Creating, editing, and posting photos/videos, ensuring
                    alignment with brand strategy.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-72 h-[300px] rounded-xl bg-cardBG justify-center space-y-4 p-4 border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                    AI-driven marketing:
                  </h1>
                  <p className="text-sm text-textGray">
                    Using AI tools to refine strategies, enhance presence, and
                    optimize campaigns.
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-[450px] h-[300px] rounded-xl bg-cardBG justify-center space-y-4 p-4 border-textGray/10 border-[1px]">
                  <Image
                    width={600}
                    height={600}
                    src="/images/strategy.png"
                    alt="SkillIcon"
                    className="w-14 h-14 object-cover"
                  />
                  <h1 className="text-2xl uppercase font-bold">
                     Digital advertising & analytics
                  </h1>
                  <p className="text-sm text-textGray">
                    Managing campaigns on META Ads Manager and Google Ads,
                    optimizing with analytics tools.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute  bottom-[50%] left-[40%] w-[400px] h-[400px] bg-blueGlow rounded-full blur-5xl pointer-events-none -z-20"></div>
      </section>

      {/* MOBILE COMPONENT */}
      <section className="text-white block md:hidden py-10 md:py-16 px-4 md:px-10 relative">
        <SectionHeading
          title="Skills"
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, possimus?"
        />
        <div className="w-full flex flex-col py-8 justify-center items-center max-w-screen-xl mx-auto">
          {/* First Row of Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                Brand Strategy
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Creating cohesive brand identities with unique styles, slogans,
                colors, and messaging.
              </p>
            </div>
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                Email Marketing
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Running weekly campaigns, managing databases, and optimizing for
                better engagement.
              </p>
            </div>
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                Creative Content Creation
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Producing engaging content, from concept to design, copywriting,
                and scheduling.
              </p>
            </div>
          </div>

          {/* Second Row of Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-4">
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                Content Production
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Creating, editing, and posting photos/videos, ensuring alignment
                with brand strategy.
              </p>
            </div>
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                AI-Driven Marketing
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Using AI tools to refine strategies, enhance presence, and
                optimize campaigns.
              </p>
            </div>
            <div className="flex flex-col p-4 w-full rounded-xl bg-cardBG border-textGray/10 border-[1px]">
              <Image
                width={600}
                height={600}
                src="/images/strategy.png"
                alt="SkillIcon"
                className="w-14 h-14 object-cover mb-4"
              />
              <h1 className="text-lg md:text-2xl uppercase font-bold">
                Digital Advertising & Analytics
              </h1>
              <p className="text-xs md:text-sm text-textGray mt-2">
                Managing campaigns on META Ads Manager and Google Ads,
                optimizing with analytics tools.
              </p>
            </div>
          </div>
        </div>
        {/* Background Glow Effect */}
        <div className="absolute bottom-[50%] left-[40%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] bg-blueGlow rounded-full blur-3xl md:blur-5xl pointer-events-none -z-20"></div>
      </section>
    </>
  );
};

export default Skills;
