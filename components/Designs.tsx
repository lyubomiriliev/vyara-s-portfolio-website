import React from "react";
import { clientsData } from "@/utils/constants";
import Image from "next/image";

const Designs: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
      {clientsData.map((client, index) => (
        <div key={index} className="bg-cardBG rounded-lg p-2 flex w-full">
          <Image width={600} height={600} src={client.img} alt={client.title} />
        </div>
      ))}
    </section>
  );
};

export default Designs;
