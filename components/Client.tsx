import Image from "next/image";
import React from "react";

interface ClientProps {
  title: string;
  description: string;
  img: string; // Updated to string for the image URL
  logo: string;
  perk1: string;
  perk2: string;
  perk3: string;
  reverse?: boolean;
}

const Client: React.FC<ClientProps> = ({
  title,
  description,
  img,
  logo,
  perk1,
  perk2,
  perk3,
  reverse = false,
}) => {
  return (
    <div
      className={`w-full mx-auto lg:w-full py-4 h-[240px] md:h-60 flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center border-[1px] border-textGray/20 bg-gradient-to-tr from-cardBG via-cardBG/80 to-cardBG/70 rounded-xl my-4`}
    >
      <Image
        width={1200}
        height={600}
        src={img}
        className="w-1/2 hidden lg:block h-96 object-cover md:w-60 md:h-60 p-[1px] rounded-xl"
        alt={title}
      />
      <div className="flex w-full px-4 md:px-12 mx-auto gap-2 md:gap-5 flex-col">
        <div className="flex flex-col justify-center items-center md:items-start lg:gap-2 mb-3 md:mb-0">
          <div className="flex flex-col justify-center items-center lg:items-start lg:gap-2">
            <h1 className="text-xl md:text-4xl font-bold hidden lg:block uppercase">
              {title}
            </h1>
            <Image
              width={800}
              height={800}
              src={logo}
              className="w-44 lg:hidden object-cover"
              alt={title}
            />
            <p className="text-sm text-center lg:text-left max-w-[300px]">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center md:hidden gap-4">
          <div className="flex flex-col w-1/3">
            <span className="text-white uppercase text-center text-lg font-bold">
              40%
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk1}
            </h1>
          </div>
          <div className="flex flex-col w-1/3">
            <span className="text-white uppercase text-center text-lg font-bold">
              100+
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk2}
            </h1>
          </div>
          <div className="flex flex-col w-1/3">
            <span className="text-white uppercase text-center text-lg font-bold">
              40%
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk3}
            </h1>
          </div>
        </div>

        {/* Client Results */}
        <div className="md:flex hidden justify-center items-center space-x-6 gap-4 bg-textGray/20 rounded-xl p-4">
          <div className="flex justify-center items-center flex-col">
            <span className="text-white uppercase text-center text-2xl font-bold">
              40%
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk1}
            </h1>
          </div>
          <div className="w-[1px] h-10 bg-white"></div>
          <div className="flex justify-center items-center flex-col">
            <span className="text-white uppercase text-center text-2xl font-bold">
              100+
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk2}
            </h1>
          </div>
          <div className="w-[1px] h-10 bg-white"></div>
          <div className="flex justify-center items-center flex-col">
            <span className="text-white uppercase text-center text-2xl font-bold">
              40%
            </span>
            <h1 className="text-white text-sm uppercase text-center font-light">
              {perk3}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
