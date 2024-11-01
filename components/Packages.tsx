import React from "react";

const packages = [
  {
    name: "Basic",
    features: ["Content creation", "1 platform management"],
    price: "$300/month",
  },
  {
    name: "Standard",
    features: ["Content + Ads", "2 platforms"],
    price: "$600/month",
  },
  {
    name: "Premium",
    features: ["Full social media management"],
    price: "$1200/month",
  },
];

export const Packages: React.FC = () => {
  return (
    <section className="bg-secondary text-white p-8">
      <h3 className="text-center text-3xl font-bold">Packages</h3>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="bg-gray-800 p-6 rounded-lg w-60 text-center"
          >
            <h4 className="text-2xl font-bold">{pkg.name}</h4>
            <ul className="text-gray-300 mt-4">
              {pkg.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-primary text-xl font-bold mt-4">{pkg.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
