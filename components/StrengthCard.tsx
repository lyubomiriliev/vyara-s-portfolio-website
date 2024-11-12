import React from "react";
import Image from "next/image";

interface StrengthCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor?: string;
  reverse?: boolean;
}

const StrengthCard: React.FC<StrengthCardProps> = ({
  title,
  description,
  icon,
  bgColor = "bg-primary", // Default background color,
  reverse = false,
}) => {
  return (
    <div
      className={`flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center relative shadow-lg rounded-lg px-4 py-4 lg:py-8 ${bgColor} w-full max-w-md`}
    >
      {/* Icon with Circle */}
      <div
        className={`absolute ${
          reverse ? "-right-12" : "-left-12"
        } flex items-center justify-center bg-cardBG border-8 border-dark rounded-full w-24 h-24 shadow-2xl`}
      >
        <Image
          src={icon}
          alt={title}
          width={600}
          height={600}
          className="object-contain w-2/4"
        />
      </div>

      {/* Text Content */}
      <div
        className={`flex flex-col justify-center ${
          reverse ? "items-start" : "items-end"
        } h-20 ${reverse ? "pr-10 text-left" : "pl-10 text-right"}`}
      >
        <h3 className="text-white font-bold text-lg">{title}</h3>
        <p className="text-white text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

export default StrengthCard;
