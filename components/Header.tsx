import React from "react";

const Header: React.FC = () => {
  return (
    <header className="text-white w-full flex py-10 items-center">
      <nav className="flex px-6 py-4 border-[1px] border-textGray/20 bg-textGray/5 rounded-full gap-8 mx-auto items-center">
        <ul className="flex space-x-8 text-sm uppercase">
          <li>Home</li>
          <li>About</li>
          <li>Skills</li>
          <li>Strengths</li>
          <li>Clients</li>
          <li>Testimonials</li>
        </ul>
        <button className="bg-primary text-bg font-bold px-4 py-2 rounded-full uppercase">
          Contact Me
        </button>
      </nav>
    </header>
  );
};

export default Header;
