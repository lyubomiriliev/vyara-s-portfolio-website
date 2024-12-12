"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { headerLinks } from "@/utils/constants";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSession, setActiveSession] = useState("home");

  const parentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.7 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = headerLinks.map((link) =>
        document.getElementById(link.toLowerCase())
      );

      // Find the currently visible section
      let currentSection = "home"; // Default section
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.getBoundingClientRect().top;
          if (sectionTop <= window.innerHeight / 2) {
            currentSection = section.id; // Update to the current section's ID
          }
        }
      });

      setActiveSession(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle scrolling to the correct section
  const handleScrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const headerOffset = 60; // Adjust to your header height
      const elementPosition =
        section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      setActiveSession(sectionId); // Update active session when clicked
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setMenuOpen(false); // Close the menu after navigating
    }
  };

  return (
    <header className="text-white w-full mx-auto py-6 px-0 md:px-0 md:py-10 relative lg:z-50">
      <nav className="flex justify-center items-center">
        {/* Desktop Navigation */}
        <div className="flex items-center justify-between w-full top-9 fixed px-4">
          {/* Centered Menu */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 border-[1px] border-textGray/30 bg-cardBG/30 backdrop-blur-[0.2rem] px-6 py-4 rounded-full items-center space-x-8 text-sm uppercase z-50">
            {headerLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleScrollToSection(link.toLowerCase())}
                className={`hover:text-primary transition-colors ${
                  activeSession === link.toLowerCase()
                    ? "text-primary font-bold"
                    : "text-white"
                }`}
              >
                {link}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center w-[90%] fixed top-6 border-[1px] border-textGray/30 bg-cardBG/30 backdrop-blur-[0.2rem] rounded-full space-x-4 px-4 py-2 z-30">
          <div
            onClick={() => handleScrollToSection("home")}
            className="flex items-center md:hidden"
          >
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
        <div className="fixed top-0 backdrop-blur-[2px] w-full mx-auto bg-dark bg-opacity-80 flex flex-col items-center pt-24 pb-8 space-y-5 text-base uppercase z-20">
          {headerLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleScrollToSection(link.toLowerCase())}
              className={`hover:text-primary ${
                activeSession === link.toLowerCase()
                  ? "text-primary font-bold"
                  : "text-white transition-colors"
              }`}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
