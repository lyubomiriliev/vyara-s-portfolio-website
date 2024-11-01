import React from "react";

const clients = [
  {
    name: "El Shisha",
    image: "/images/client1.jpg",
    description: "Luxury shisha brand with innovative campaigns.",
  },
];

const Clients: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white p-12">
      <h3 className="text-center text-3xl font-bold mb-8">Clients</h3>
      <div className="flex flex-wrap justify-center gap-8">
        {clients.map((client, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg max-w-xs text-center shadow-lg"
          >
            <img
              src={client.image}
              alt={client.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h4 className="text-xl font-bold">{client.name}</h4>
            <p className="text-gray-400">{client.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
