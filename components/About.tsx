import React from "react";

const About: React.FC = () => {
  return (
    <section className="bg-secondary text-white p-6 text-center">
      <h3 className="text-3xl font-bold">About Me</h3>
      <p className="text-gray-300 mt-4">
        Vyara Ivanova, Social Media Specialist with over 500+ projects.
      </p>
      <div className="flex justify-around mt-6">
        <div>
          <h4 className="text-2xl font-bold">500+</h4>
          <p>Projects</p>
        </div>
        <div>
          <h4 className="text-2xl font-bold">300+</h4>
          <p>Happy Clients</p>
        </div>
        <div>
          <h4 className="text-2xl font-bold">13+</h4>
          <p>Years Experience</p>
        </div>
      </div>
    </section>
  );
};

export default About;
