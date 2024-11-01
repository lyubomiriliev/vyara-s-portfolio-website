import React from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  variant?: "default" | "outline" | "gradient";
}

const Button: React.FC<ButtonProps> = ({ text, variant = "default" }) => {
  const baseStyles = "px-8 py-2 font-bold rounded-full transition-all";

  const variantStyles = {
    default: "bg-primary text-black uppercase",
    outline:
      "border border-white text-white bg-transparent hover:bg-white hover:text-black uppercase",
    gradient: "bg-gradient-to-r from-primary to-secondary text-black uppercase",
  };

  return (
    <button className={clsx(baseStyles, variantStyles[variant])}>{text}</button>
  );
};

export default Button;
