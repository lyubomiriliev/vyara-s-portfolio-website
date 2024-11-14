"use client";

import React, { useState } from "react";
import { designsData } from "@/utils/constants";
import Image from "next/image";
import ImageModal from "./ImageModal";
import Button from "./Button";

const Designs: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [visibleDesigns, setVisibleDesigns] = useState(6);

  const handleCardClick = (index: number) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showPrevImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? designsData.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === designsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleShowMore = () => {
    setVisibleDesigns(designsData.length); // Show all items
  };

  const handleShowLess = () => {
    setVisibleDesigns(6); // Show all items
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center max-w-screen-lg gap-4 px-2 py-8">
        {designsData.slice(0, visibleDesigns).map((design, index) => (
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
      </div>
      <div className="flex items-center justify-center flex-col">
        {visibleDesigns < designsData.length ? (
          <Button text="Show More" variant="default" onClick={handleShowMore} />
        ) : (
          <Button text="Show Less" variant="default" onClick={handleShowLess} />
        )}
      </div>
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
