// components/SocialMediaPlatforms.tsx
import React from "react";

const platforms = [
  { name: "Instagram", icon: "/icons/instagram.png" },
  { name: "Facebook", icon: "/icons/fb.png" },
  { name: "TikTok", icon: "/icons/tiktok.png" },
  { name: "LinkedIn", icon: "/icons/linkedin.png" },
  { name: "Meta", icon: "/icons/meta.png" },
  { name: "Canva", icon: "/icons/canva.png" },
];

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex h-40 justify-center items-center space-x-8 py-10 bg-gradient-to-br from-primary to-secondary text-white">
      {platforms.map(({ name, icon }) => (
        <div key={name} className="rounded-full">
          <img src={icon} alt={name} className="w-full rounded-full h-12" />
        </div>
      ))}
      <img src="/icons/klaviyo.png" alt="Klaviyo" className="w-40 h-12" />
    </section>
  );
};

export default SocialMediaPlatforms;
