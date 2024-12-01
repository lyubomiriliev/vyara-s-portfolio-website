import React from "react";
import Image from "next/image";
import { platformsGray } from "@/utils/constants";

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex w-full relative justify-center items-center text-white md:px-10 md:py-10">
      <div className="w-full md:w-[80%] lg:w-[55%] mx-auto grid grid-cols-3 gap-8 px-4 md:px-4 lg:px-0 md:grid md:grid-cols-3 lg:grid lg:grid-cols-4 items-center">
        {platformsGray.map((logo, index) => (
          <div className="flex justify-center" key={index}>
            <Image
              width={1200}
              height={600}
              unoptimized
              src={logo.icon}
              alt={logo.name}
              className="w-[200px] object-cover opacity-75"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialMediaPlatforms;
