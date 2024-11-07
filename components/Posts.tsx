import React, { useState } from "react";
import { clientsData } from "@/utils/constants";
import Image from "next/image";

const Posts = () => {
  return (
    <section className="w-full grid grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-4 py-8">
      {clientsData.map((client, index) => (
        <div key={index} className="bg-cardBG rounded-lg p-2 flex w-full">
          <Image width={600} height={600} src={client.img} alt={client.title} />
        </div>
      ))}
    </section>
  );
};

export default Posts;
