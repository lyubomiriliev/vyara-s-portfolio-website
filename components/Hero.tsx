import React from "react";

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white h-screen flex flex-col justify-center items-center text-center p-8">
      <h1 className="text-5xl font-extrabold mb-4">Social Media Specialist</h1>
      <p className="text-lg max-w-md mb-8">
        Helping brands grow and engage with their audience through creative and
        data-driven social media strategies.
      </p>
      <button className="bg-primary px-6 py-3 rounded-full font-bold">
        Let's Talk
      </button>
      <div className="absolute top-8 right-8 flex space-x-4">
        {/* Additional elements like floating icons if needed */}
      </div>
    </section>
  );
};

export default Hero;
