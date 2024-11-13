import React from "react";
import { designsData } from "@/utils/constants";
import Image from "next/image";

const Designs: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
      {designsData.map((design, index) => (
        <div key={index} className="bg-cardBG rounded-2xl p-2 flex w-full">
          <Image
            width={600}
            height={600}
            src={design}
            alt="/"
            className="rounded-xl"
          />
        </div>
      ))}
    </section>
  );
};

export default Designs;
