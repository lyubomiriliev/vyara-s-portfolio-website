import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white text-center p-6">
      <p>&copy; 2024 Vyara Ivanova Ilieva. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <a href="#instagram">Instagram</a>
        <a href="#facebook">Facebook</a>
        <a href="#linkedin">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;
