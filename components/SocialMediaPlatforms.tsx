import React from "react";
import Image from "next/image";

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex relative justify-center items-center text-white py-10">
      <div className="flex gap-20 items-center w-full">
        <Image
          width={1200}
          height={600}
          unoptimized
          src="/icons/gray/platforms2.png"
          alt="platforms"
          className="w-full object-cover h-16 md:h-20"
        />
      </div>
      <div className="absolute -inset-8 flex z-20 justify-between pointer-events-none">
        <div className="w-24 bg-gradient-to-r from-dark to-transparent"></div>
        <div className="w-24 bg-gradient-to-l from-dark to-transparent"></div>
      </div>
    </section>
  );
};

export default SocialMediaPlatforms;
