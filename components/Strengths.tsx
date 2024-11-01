import React from "react";

const strengths = [
  {
    title: "Creativity",
    description: "Developing fresh and innovative ideas.",
  },
  { title: "Analytical", description: "Using data to drive decisions." },
];

const Strengths: React.FC = () => {
  return (
    <section className="bg-black text-white py-12">
      <h3 className="text-center text-3xl font-bold mb-8">Strengths</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {strengths.map((strength, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg w-64 text-center"
          >
            <h4 className="text-xl font-bold">{strength.title}</h4>
            <p className="text-gray-400">{strength.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Strengths;
