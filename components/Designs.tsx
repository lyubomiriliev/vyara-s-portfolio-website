"use client";

import React, { useState } from "react";
import { designsData } from "@/utils/constants";
import Image from "next/image";
import ImageModal from "./ImageModal";

const Designs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Open the modal with the selected image index
  const handleCardClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Go to the previous image
  const showPrevImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? designsData.length - 1 : prevIndex - 1
    );
  };

  // Go to the next image
  const showNextImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === designsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
      {designsData.map((design, index) => (
        <div
          onClick={() => handleCardClick(index)}
          key={index}
          className="bg-cardBG rounded-2xl p-2 flex w-full cursor-pointer"
        >
          <Image
            width={600}
            height={600}
            src={design}
            alt={`Design ${index + 1}`}
            className="rounded-xl"
          />
        </div>
      ))}

      {/* Render the modal once, outside the loop */}
      {isModalOpen && (
        <ImageModal
          isOpen={isModalOpen}
          imageSrc={designsData[modalImageIndex]} // Show the current image
          onClose={closeModal}
          onPrevImage={showPrevImage} // Pass function to go to previous image
          onNextImage={showNextImage} // Pass function to go to next image
        />
      )}
    </section>
  );
};

export default Designs;
