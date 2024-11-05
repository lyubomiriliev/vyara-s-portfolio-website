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
      {clientsData.map((client, index) => (
        <div className="w-full" key={index}>
          <Client
            key={index}
            title={client.title}
            description={client.description}
            img={client.img}
            perk1={client.perk1}
            perk2={client.perk2}
            perk3={client.perk3}
            reverse={index % 2 !== 0} // Reverse layout for odd-indexed clients
          />
        </div>
      ))}

      <div className="absolute right-16 md:left-[35%] top-16 md:top-[8%] w-60 md:w-[400px] h-60 md:h-[400px] bg-blueGlow rounded-full blur-6xl pointer-events-none -z-20"></div>
      <div className="absolute bottom-0 right-12 md:left-[25%] w-80 md:w-[600px] h-80 md:h-[400px] bg-pinkGlow rounded-full blur-6xl pointer-events-none -z-20"></div>
    </section>
  );
};

export default Clients;
