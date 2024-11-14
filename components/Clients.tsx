"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Client from "./Client";
import { clientsData } from "../utils/constants";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Clients: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const maxPage = Math.ceil(clientsData.length / itemsPerPage) - 1;

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : 0));
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : maxPage));
  };

  const currentClients = clientsData.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Animation variants for fade effect
  const parentVariants = {
    animate: { transition: { staggerChildren: 0.3 } },
  };
  const childVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="clients"
      className="w-full flex flex-col justify-center items-center max-w-screen-xl px-4 mx-auto text-white py-8 relative"
    >
      <SectionHeading
        title="Clients"
        subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quo."
      />

      {/* Desktop view with pagination and fade transition */}
      <div className="hidden lg:flex flex-col w-full relative max-w-screen-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            variants={parentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }} // Adjust duration as needed for smoother fade
            className="flex flex-col gap-4 w-full"
          >
            {currentClients.map((client, index) => (
              <motion.div
                variants={childVariants}
                className="w-full"
                key={index}
              >
                <Client
                  title={client.title}
                  description={client.description}
                  img={client.img}
                  logo={client.logo}
                  perk1={client.perk1}
                  perk2={client.perk2}
                  perk3={client.perk3}
                  reverse={index % 2 !== 0}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-full flex justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-white"></div>
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrevious}
        className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300"
        aria-label="Previous"
      >
        <ChevronLeftIcon className="text-3xl" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/80 transition-all duration-300"
        aria-label="Next"
      >
        <ChevronRightIcon className="text-3xl" />
      </button>

      {/* Mobile component for clients scroll */}
      <div className="lg:hidden flex items-center gap-4 overflow-x-auto scroll-snap-x-mandatory w-full scrollbar-hide">
        {clientsData.map((client, index) => (
          <div
            className="flex-shrink-0 w-[90%] md:w-[70%] snap-center overflow-y-clip"
            key={index}
          >
            <Client
              title={client.title}
              description={client.description}
              img={client.img}
              logo={client.logo}
              perk1={client.perk1}
              perk2={client.perk2}
              perk3={client.perk3}
              reverse={index % 2 !== 0}
            />
          </div>
        ))}
      </div>

      {/* Background Glow */}
      <div className="absolute bottom-0 right-12 md:left-[25%] w-80 md:w-[600px] h-80 md:h-[400px] bg-pinkGlow rounded-full blur-6xl pointer-events-none -z-20"></div>
    </section>
  );
};

export default Clients;
