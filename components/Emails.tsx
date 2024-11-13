import { emailsData } from "@/utils/constants";
import Image from "next/image";
import React from "react";

const Emails: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-1 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
      {emailsData.map((email, index) => (
        <div key={index} className="bg-cardBG rounded-lg p-2 flex w-full">
          <Image
            width={600}
            height={600}
            src={email}
            alt="Emails"
            className="w-full h-80"
          />
        </div>
      ))}
    </section>
  );
};

export default Emails;
