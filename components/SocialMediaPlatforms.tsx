import React from "react";

const platforms = [
  "Instagram",
  "Facebook",
  "TikTok",
  "Pinterest",
  "LinkedIn",
  "Klaviyo",
];

const SocialMediaPlatforms: React.FC = () => {
  return (
    <section className="flex justify-center space-x-4 py-6 bg-gray-900 text-white">
      {platforms.map((platform) => (
        <div key={platform} className="p-4 rounded bg-gray-800">
          <img
            src={`/icons/${platform.toLowerCase()}.svg`}
            alt={platform}
            className="w-8 h-8 mx-auto"
          />
          <p className="text-center text-sm mt-2">{platform}</p>
        </div>
      ))}
    </section>
  );
};

export default SocialMediaPlatforms;
