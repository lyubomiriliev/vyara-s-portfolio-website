import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-backgroundEnd to-backgroundStart text-white py-8 text-center">
      <p className="text-lg font-medium">
        &copy; 2024 Vyara Ivanova Ilieva. All rights reserved.
      </p>
      <div className="flex justify-center space-x-6 mt-4">
        <a href="#instagram" className="hover:text-accent transition">
          Instagram
        </a>
        <a href="#facebook" className="hover:text-accent transition">
          Facebook
        </a>
        <a href="#linkedin" className="hover:text-accent transition">
          LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
