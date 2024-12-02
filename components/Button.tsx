"use client";

import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

interface ButtonProps {
  text: string;
  variant?: "default" | "outline" | "gradient";
  type: "button" | "submit" | "reset";
  icon?: string;
  hoverIcon?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant = "default",
  icon,
  type,
  disabled = false,
  hoverIcon,
  onClick,
}) => {
  const baseStyles =
    "px-4 py-2 font-bold rounded-full transition-all flex items-center justify-center gap-2";

  const variantStyles = {
    default:
      "bg-cyan-400 text-black uppercase hover:bg-primary duration-300 transition-all ease-in-out cursor-pointer",
    outline:
      "border border-white text-white bg-transparent hover:bg-white hover:text-black uppercase cursor-pointer",
    gradient:
      "bg-gradient-to-r from-primary to-secondary rounded-xl text-black uppercase text-white cursor-pointer",
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        disabled && "cursor-not-allowed opacity-50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon && (
        <Image
          width={300}
          height={300}
          alt="Icon"
          src={isHovered && hoverIcon ? hoverIcon : icon}
          className="w-6 h-6 object-cover"
        />
      )}
      {text}
    </button>
  );
};

export default Button;
