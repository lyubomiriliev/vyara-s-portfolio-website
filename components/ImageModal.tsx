"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void; // Correct typing for the onClose function
  onPrevImage: () => void; // Correct typing for the onClose function
  onNextImage: () => void; // Correct typing for the onClose function
}

const ImageModal: React.FC<ModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onPrevImage,
  onNextImage,
}) => {
  if (!isOpen) return null; // Don't render if modal is not open

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        onPrevImage();
      } else if (event.key === "ArrowRight") {
        onNextImage();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevImage, onNextImage]);

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-11/12 md:w-2/3 lg:w-1/3 bg-cardBG p-4 rounded-lg shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-cardBG p-1 rounded-xl text-white text-2xl font-bold hover:text-gray-400"
        >
          <FiX size={28} />
        </button>
        <img
          src={imageSrc}
          alt="Enlarged Design"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </motion.div>
  );
};

export default ImageModal;
