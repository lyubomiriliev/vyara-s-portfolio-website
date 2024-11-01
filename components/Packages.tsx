// components/Packages.tsx
import React from "react";

const packages = [
  {
    name: "Basic",
    features: ["Content Creation", "Platform Management"],
    price: "$300/month",
  },
  {
    name: "Standard",
    features: ["Content + Ads", "2 Platforms"],
    price: "$600/month",
  },
  { name: "Premium", features: ["Full Management"], price: "$1200/month" },
];

const Packages: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white p-16">
      <h3 className="text-center text-4xl font-bold mb-10">Packages</h3>
      <div className="flex flex-wrap justify-center gap-10">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-gray-800 p-8 rounded-lg w-64 text-center border border-gradient-to-br from-pink-500 to-purple-600 shadow-lg hover:shadow-pink-600 transition"
          >
            <h4 className="text-2xl font-bold mb-3">{pkg.name}</h4>
            <ul className="text-gray-400 mb-4">
              {pkg.features.map((feature, i) => (
                <li key={i} className="mb-2">
                  {feature}
                </li>
              ))}
            </ul>
            <p className="text-pink-500 font-bold text-xl">{pkg.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
