import React from "react";
import { platforms } from "../utils/constants";
import Image from "next/image";

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex h-40 justify-center items-center space-x-8 py-10 bg-gradient-to-br from-primary to-secondary text-white">
      {platforms.map(({ name, icon }) => (
        <div key={name} className="rounded-full">
          <Image
            width={1000}
            height={200}
            src={icon}
            alt={name}
            className="w-full rounded-full h-12"
          />
        </div>
      ))}
      <img src="/icons/klaviyo.png" alt="Klaviyo" className="w-40 h-12" />
    </section>
  );
};

export default SocialMediaPlatforms;
