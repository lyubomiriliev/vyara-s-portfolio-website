import React from "react";

interface Client {
  title: string;
  description: string;
  img: string;
  perk1: string;
  perk2: string;
  perk3: string;
  reverse?: boolean;
}

const Client: React.FC<Client> = ({
  title,
  description,
  img,
  perk1,
  perk2,
  perk3,
  reverse = false,
}) => {
  return (
    <div
      className={`w-full flex ${
        reverse ? "flex-row-reverse" : "flex-row"
      } items-center bg-cardBG rounded-xl my-6`}
    >
      <img
        src={img}
        className="w-60 h-60 p-2 object-cover rounded-xl"
        alt={title}
      />
      <div className="flex w-full px-12 mx-auto gap-5 flex-col">
        <h1 className="text-4xl font-bold uppercase">{title}</h1>
        <p>{description}</p>
        <div className="flex justify-center items-center space-x-6 gap-8 bg-textGray/10 rounded-xl p-4">
          <div className="flex justify-center items-center flex-col">
            <span className="text-primary uppercase text-center text-2xl font-bold">
              40%
            </span>
            <h1 className="text-primary text-sm uppercase text-center font-light">
              {perk1}
            </h1>
          </div>
          <div className="w-[1px] h-10 bg-primary"></div>
          <div className="flex justify-center items-center flex-col">
            <span className="text-primary uppercase text-center text-2xl font-bold">
              100+
            </span>
            <h1 className="text-primary text-sm uppercase text-center font-light">
              {perk2}
            </h1>
          </div>
          <div className="w-[1px] h-10 bg-primary"></div>
          <div className="flex justify-center items-center flex-col">
            <span className="text-primary uppercase text-center text-2xl font-bold">
              40%
            </span>
            <h1 className="text-primary text-sm uppercase text-center font-light">
              {perk3}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
