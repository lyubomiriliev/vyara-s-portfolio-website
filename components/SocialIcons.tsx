import React from "react";

const SocialIcons: React.FC = () => {
  const icons = ["instagram", "facebook", "linkedin", "tiktok"];
  return (
    <div className="flex space-x-4 justify-center py-6">
      {icons.map((icon) => (
        <span
          key={icon}
          className={`icon-${icon} bg-gray-800 p-2 rounded-full`}
        >
          {/* Render social icon based on the platform */}
        </span>
      ))}
    </div>
  );
};

export default SocialIcons;
