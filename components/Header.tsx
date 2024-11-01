import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-secondary text-white p-6">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Vyara Ivanova</h1>
        <ul className="flex space-x-6">
          <li>Home</li>
          <li>About</li>
          <li>Skills</li>
          <li>Clients</li>
          <li>Contact</li>
        </ul>
        <button className="bg-primary px-4 py-2 rounded-full">
          Let's Talk
        </button>
      </nav>
      <div className="mt-10 text-center">
        <h2 className="text-4xl font-extrabold">Social Media Specialist</h2>
      </div>
    </header>
  );
};

export default Header;
