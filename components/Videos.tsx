import React from "react";
import { videosData } from "@/utils/constants";
import Image from "next/image";

const Videos: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
      {videosData.map((video, index) => (
        <div
          key={index}
          className="bg-cardBG rounded-lg p-2 flex w-full h-[400px]"
        >
          <Image width={600} height={600} src={video} alt="PortfolioVideo" />
        </div>
      ))}
    </section>
  );
};

export default Videos;
