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
      className={`w-full h-96 md:h-60 flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center border-[1px] border-textGray/20 bg-gradient-to-tr from-cardBG via-cardBG/90 to-cardBG/30 rounded-xl my-4`}
    >
      <Image
        width={1200}
        height={600}
        src={img}
        className="w-1/2 h-96 md:w-60 md:h-60 object-cover p-[1px] rounded-xl"
        alt={title}
      />
      <div className="flex w-full px-4 md:px-12 mx-auto gap-2 md:gap-5 flex-col">
        <div className="flex flex-col justify-center items-center md:items-start gap-2 mb-3 md:mb-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl md:text-4xl font-bold uppercase">{title}</h1>
            <Image
              width={600}
              height={600}
              src={logo}
              alt={title}
              className="w-20"
            />
          </div>
          <p className="text-sm text-center max-w-s">{description}</p>
          <div className="w-2/3 flex md:hidden h-[1px] mt-2 bg-primary"></div>
        </div>
        <div className="flex flex-col items-center gap-2 md:hidden">
          <span className="text-white uppercase text-center text-xl font-bold">
            40%
          </span>
          <h1 className="text-white text-sm uppercase text-center font-light">
            {perk1}
          </h1>
          <span className="text-white uppercase text-center text-2xl font-bold">
            100+
          </span>
          <h1 className="text-white text-sm uppercase text-center font-light">
            {perk2}
          </h1>
          <span className="text-white uppercase text-center text-2xl font-bold">
            40%
          </span>
          <h1 className="text-white text-sm uppercase text-center font-light">
            {perk3}
          </h1>
        </div>

        {/* Client Results */}
        <div className="md:flex hidden  justify-center items-center space-x-6 gap-4 bg-textGray/20 rounded-xl p-4">
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
