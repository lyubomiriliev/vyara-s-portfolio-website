import React from "react";

const strengths = [
  {
    title: "Creativity",
    description: "Innovative and engaging content strategies.",
  },
  {
    title: "Analytical Skills",
    description: "Data-driven approach to optimize campaigns.",
  },
  {
    title: "Adaptability",
    description: "Quickly adapts to new trends and platforms.",
  },
];

export const Strengths: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white p-8">
      <h3 className="text-center text-3xl font-bold">Strengths</h3>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {strengths.map((strength) => (
          <div
            key={strength.title}
            className="bg-gray-800 p-6 rounded-lg w-60 text-center"
          >
            <h4 className="text-xl font-semibold">{strength.title}</h4>
            <p className="text-gray-300 mt-2">{strength.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Strengths;
