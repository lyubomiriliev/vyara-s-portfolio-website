"use client";
import React, { useState } from "react";
import { headerLinks } from "@/utils/constants";
import { FiMenu, FiX } from "react-icons/fi"; // Icons for mobile menu toggle
import Image from "next/image";
import Button from "./Button";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="text-white w-full max-w-screen-xl mx-auto py-6 px-0 md:px-0 md:py-10 relative z-50">
      <nav className="flex justify-between md:justify-center items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex border-[1px] border-textGray/30 bg-cardBG/30 backdrop-blur-[0.2rem] p-4 rounded-full items-center space-x-8 text-sm uppercase fixed top-6 z-50">
          {headerLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <Button text="Contact Me" variant="default" />
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center space-x-4 px-4 py-4 z-50">
          <div className="flex items-center md:hidden">
            <Image
              width={600}
              height={300}
              src="/images/vyaraName.png"
              alt="VyaraIvanova-Ilieva"
              className="w-full"
            />
          </div>
          <button onClick={toggleMenu} aria-label="Toggle Menu">
            {menuOpen ? <FiX size={32} /> : <FiMenu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="fixed top-0 backdrop-blur-[2px] w-full mx-auto bg-dark bg-opacity-80 flex flex-col items-center pt-24 pb-8 space-y-3 text-base uppercase">
          {headerLinks.map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)} // Close menu on link click
            >
              {link}
            </a>
          ))}
          <Button text="Contact Me" variant="outline" />
        </div>
      )}
    </header>
  );
};

export default Header;
