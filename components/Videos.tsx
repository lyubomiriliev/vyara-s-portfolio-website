import React from "react";
import { videosData } from "@/utils/constants";

const Videos: React.FC = () => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:flex justify-center items-center max-w-screen-lg gap-4 lg:gap-4 py-8">
      {videosData.map((video, index) => (
        <div
          key={index}
          className="bg-cardBG rounded-2xl flex w-full items-center justify-center"
        >
          <video
            className="w-full h-full object-fit rounded-2xl"
            controls
            src={video}
            preload="metadata" // Preloads metadata for faster loading
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </section>
  );
};

export default Videos;
