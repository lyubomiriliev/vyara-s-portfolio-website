import Image from "next/image";
import React from "react";
import clsx from "clsx";

interface SkillCardProps {
  title: string;
  variant?: "desktop" | "mobile" | "large" | "medium" | "small";
  desc: string;
  img: string;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  desc,
  img,
  variant = "desktop",
}) => {
  const baseStyle = "group";

  const variantStyles = {
    desktop: "w-80 h-60 group",
    mobile: "w-full h-40 group",
    large: "w-80 h-[496px] group",
    medium: "w-[350px] h-60 group",
    small: "w-[258px] h-60 group",
  };

  return (
    <div className={clsx(baseStyle, variantStyles[variant])}>
      <div className="relative w-full h-full [transform-style:preserve-3d] transition-all duration-500 group-hover:[transform:rotateY(180deg)]">
        {/* Front Face */}
        <div className="absolute w-full h-full bg-cardBG border-textGray/10 border-[1px] p-5 flex flex-col justify-center text-center md:text-left items-center md:items-start space-y-4 rounded-xl [backface-visibility:hidden] overflow-hidden">
          <Image
            width={600}
            height={600}
            src={img}
            alt={title}
            className="w-14 h-14 object-cover"
          />
          <Image
            width={600}
            height={600}
            src={img}
            alt={title}
            className="w-full absolute top-0 opacity-[0.03]"
          />
          <h1 className="text-md md:text-2xl uppercase font-bold">{title}</h1>
        </div>

        {/* Back Face */}
        <div className="absolute w-full h-full bg-cardBG border-textGray/10 border-[1px] p-4 flex flex-col justify-center items-start space-y-4 rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm text-textGray">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
