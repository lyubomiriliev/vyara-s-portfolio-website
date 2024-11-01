import React from "react";
import Header from "./Header";
import Button from "./Button";

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100vh] flex flex-col items-center text-center text-white overflow-hidden">
      <Header />

      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -top-16 -z-20 w-full h-full overflow-hidden">
        <img
          src="/backgrounds/BGhero.png"
          alt="Background Image"
          className="object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 top-96 bg-gradient-to-b from-transparent to-black"></div>
      </div>
      <div className="relative z-10 flex flex-col justify-end min-h-[70vh] items-center">
        <img
          src="/images/heroPhone.png"
          alt="Phone Image"
          className="absolute w-full scale-75 -top-1/2 -z-20 object-cover"
        />
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-4 drop-shadow-lg uppercase">
          Social Media Specialist
        </h1>
        <p className="text-xl md:text-lg max-w-2xl text-gray-300 leading-relaxed">
          Helping brands grow and engage with their audience through creative
          and data-driven social media strategies.
        </p>
        <div className="flex mt-4 gap-4">
          <Button text="Explore More" />
          <Button text="Linkedin" variant="outline" />
        </div>
      </div>
      <div className="bg-black w-full h-32 absolute bottom-0 blur-xl scale-150"></div>
    </section>
  );
};

export default Hero;
