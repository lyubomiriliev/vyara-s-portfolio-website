// components/Skills.tsx
import React from "react";

const skills = [
  {
    title: "Content Creation",
    description: "Creating engaging and original content.",
  },
  {
    title: "Social Media Management",
    description: "Managing multi-platform presence.",
  },
  { title: "SEO Optimization", description: "Improving online visibility." },
];

const Skills: React.FC = () => {
  return (
    <section className="bg-gradient-to-bl from-gray-800 to-gray-900 text-white py-16 px-10">
      <h3 className="text-center text-4xl font-bold mb-12">Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-xl transition transform hover:scale-105"
          >
            <h4 className="text-2xl font-semibold mb-2">{skill.title}</h4>
            <p className="text-gray-300 text-lg">{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
