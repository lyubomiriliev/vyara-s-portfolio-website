import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="text-white w-full flex flex-col items-center relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-screen-lg w-full px-4 flex flex-col items-center space-y-4">
        <h1 className="uppercase hidden text-4xl font-bold tracking-widest">
          Vyara Ivanova–Ilieva
        </h1>
        <Image
          width={1200}
          height={1200}
          quality={100}
          src="/images/vyaraName.png"
          className="w-full md:w-2/3 pb-4 z-50"
          alt="Vyara Ivanova Ilieva"
        />
        <div className="absolute right-44 -top-16 transform -translate-y-1/2 w-40 h-40 rounded-full bg-blueGlow blur-3xl"></div>
        <div className="absolute left-0 -bottom-40 transform -translate-y-1/3 w-40 h-40 rounded-full bg-blueGlow blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-60 transform -translate-y-1/3 w-40 h-40 rounded-full bg-pinkGlow blur-3xl"></div>
        <div className="absolute inset-0 left-[29%] -top-10 transform -translate-y-1/2 w-40 h-40 rounded-full bg-pinkGlow blur-3xl"></div>

        <div className="flex justify-between w-full text-sm mt-6 space-x-4">
          {/* Column 1: Pages */}
          <div className="flex flex-col space-y-2">
            <h3 className="uppercase text-gray-300 font-medium">Pages</h3>
            <ul className="space-y-1 text-textGray">
              <li>Home</li>
              <li>About Me</li>
              <li>Skills</li>
              <li>Strengths</li>
              <li>Packages</li>
              <li>Clients</li>
              <li>Testimonials</li>
            </ul>
          </div>

          {/* Column 2: Skills */}
          <div className="flex flex-col space-y-2">
            <h3 className="uppercase text-gray-300 font-medium">Skills</h3>
            <ul className="space-y-1 text-textGray">
              <li>Brands</li>
              <li>Social Media</li>
              <li>Content</li>
              <li>Marketing</li>
              <li>Advertising</li>
              <li>Creative</li>
            </ul>
          </div>

          {/* Column 3: Info */}
          <div className="flex flex-col space-y-2">
            <h3 className="uppercase text-gray-300 font-medium">Info</h3>
            <ul className="space-y-1 text-textGray">
              <li>FAQ</li>
              <li>Testimonials</li>
              <li>Features</li>
              <li>Why Me</li>
              <li>Expertise</li>
            </ul>
          </div>

          {/* Column 4: Clients */}
          <div className="flex flex-col space-y-2">
            <h3 className="uppercase text-white font-medium">Clients</h3>
            <ul className="space-y-1 text-textGray">
              <li>El Shisha</li>
              <li>CoolFit</li>
              <li>Pulse Homes</li>
              <li>Pulse Kids</li>
              <li>Fox Academy</li>
              <li>La Maniere</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Text */}
      <div className="text-center text-sm text-white mt-8 uppercase">
        &copy; 2024 lyubomir.dev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
