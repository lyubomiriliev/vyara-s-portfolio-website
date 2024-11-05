import React from "react";
import Image from "next/image";
import { platformsGray } from "@/utils/constants";

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex w-full relative justify-center items-center text-white py-10">
      <div className="w-full grid grid-cols-4 px-4 md:px-4 lg:px-0 md:grid md:grid-cols-4 lg:flex lg:gap-20 items-center">
        {platformsGray.map((logo) => (
          <Image
            width={1200}
            height={600}
            unoptimized
            src={logo.icon}
            alt={logo.name}
            className="w-40 object-cover"
          />
        ))}
      </div>
    </section>
  );
};

export default SocialMediaPlatforms;
