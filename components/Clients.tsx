import React from "react";
import SectionHeading from "./SectionHeading";
import Client from "./Client";
import { clientsData } from "../utils/constants";

const Clients: React.FC = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center max-w-screen-lg px-4 mx-auto text-white py-8 relative">
      <SectionHeading
        title="Clients"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quo."
      />
      {/* Grid Container for Client Cards */}
      <div className="hidden lg:grid lg:grid-cols-1 gap-4 w-full">
        {clientsData.slice(0, 3).map((client, index) => (
          <Client
            key={index}
            title={client.title}
            description={client.description}
            img={client.img}
            logo={client.logo}
            perk1={client.perk1}
            perk2={client.perk2}
            perk3={client.perk3}
            reverse={index % 2 !== 0} // Reverse layout for odd-indexed clients
          />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 lg:hidden gap-4 w-full">
        {clientsData.slice(0, 1).map((client, index) => (
          <Client
            key={index}
            title={client.title}
            description={client.description}
            img={client.img}
            logo={client.logo}
            perk1={client.perk1}
            perk2={client.perk2}
            perk3={client.perk3}
            reverse={index % 2 !== 0} // Reverse layout for odd-indexed clients
          />
        ))}
      </div>
      <div className="absolute bottom-0 right-12 md:left-[25%] w-80 md:w-[600px] h-80 md:h-[400px] bg-pinkGlow rounded-full blur-6xl pointer-events-none -z-20"></div>
    </section>
  );
};

export default Clients;
