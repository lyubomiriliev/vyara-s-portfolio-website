import React from "react";
import clsx from "clsx";
import Image from "next/image";

interface ButtonProps {
  text: string;
  variant?: "default" | "outline" | "gradient";
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ text, variant = "default", icon }) => {
  const baseStyles =
    "px-4 py-2 font-bold rounded-full transition-all flex items-center justify-center gap-2";

  const variantStyles = {
    default: "bg-primary text-black uppercase",
    outline:
      "border border-white text-white bg-transparent hover:bg-white hover:text-black uppercase",
    gradient:
      "bg-gradient-to-r from-primary to-secondary rounded-xl text-black uppercase text-white",
  };

  return (
    <div className={clsx(baseStyles, variantStyles[variant])}>
      {icon && (
        <Image
          width={300}
          height={300}
          alt="Icon"
          src={icon}
          className="w-6 h-6 object-cover"
        />
      )}
      <button className="uppercase">{text}</button>
    </div>
  );
};

export default Button;
