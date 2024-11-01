import React from "react";

const Clients: React.FC = () => {
  const clients = ["Client1", "Client2", "Client3"];
  return (
    <section className="p-6 bg-secondary text-white">
      <h3 className="text-3xl font-bold text-center">Clients</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {clients.map((client) => (
          <div key={client} className="bg-gray-800 p-4 rounded">
            <p>{client}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
