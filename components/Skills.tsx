import React from "react";

const Skills: React.FC = () => {
  const skills = [
    { name: "Social Media Marketing", description: "..." },
    { name: "Content Creation", description: "..." },
    { name: "SEO Optimization", description: "..." },
  ];
  return (
    <section className="p-6 bg-black text-white">
      <h3 className="text-3xl font-bold text-center">Skills</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-gray-800 p-4 rounded">
            <h4 className="text-xl font-semibold">{skill.name}</h4>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
