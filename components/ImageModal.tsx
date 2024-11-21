"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Image from "next/image";

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

  if (!isOpen) return null; // Don't render if modal is not open

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
        <div className="absolute inset-0 -top-10 w-full flex justify-between">
          <button onClick={onPrevImage}>
            <ChevronLeftIcon className="text-4xl bg-cardBG rounded-full left-0 absolute" />
          </button>
          <button onClick={onNextImage}>
            <ChevronRightIcon className="text-4xl bg-cardBG rounded-full right-0 absolute" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-cardBG p-1 rounded-xl text-white text-2xl font-bold hover:text-gray-400"
        >
          <FiX size={28} />
        </button>
        <Image
          width={800}
          height={800}
          src={imageSrc}
          alt="Enlarged Design"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </motion.div>
  );
};

export default ImageModal;
