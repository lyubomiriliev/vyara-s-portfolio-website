import React from "react";
import SectionHeading from "./SectionHeading";
import { contactIcons } from "@/utils/constants";
import Button from "./Button";
import Image from "next/image";

const ContactForm: React.FC = () => {
  return (
    <section className="text-white py-8 w-full flex justify-center items-center flex-col max-w-screen-lg mx-auto px-4">
      <SectionHeading
        title="contact me"
        subTitle="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, id!"
      />
      <div className="w-full relative overflow-hidden bg-cardBG flex border-[1px] border-textGray/20 rounded-xl px-12 pt-10 pb-24">
        <div className="w-1/2 flex flex-col space-y-4 py-6 gap-6">
          <h1 className="uppercase text-5xl font-bold">Get in Touch With Me</h1>
          <p className="uppercase text-textGray max-w-[300px]">
            have a question or need more information about my services? fill out
            the form and i will get back to you as soon as possible.
          </p>

          {/* Background Glow Circles */}
          <div className="absolute right-24 -top-10 transform -translate-y-1/2 w-40 h-40 rounded-full bg-secondary blur-3xl"></div>
          <div className="absolute left-24 -bottom-40 transform -translate-y-1/2 w-40 h-40 rounded-full bg-primary blur-3xl"></div>

          <div className="w-2/3 bg-textGray h-[1px]"></div>
          <div className="flex items-center w-full gap-6">
            {contactIcons.slice(0, 3).map((logo, index) => (
              <div className="w-10 h-10" key={index}>
                <Image
                  width={600}
                  height={600}
                  src={logo.icon}
                  alt={logo.name}
                  className="w-full h-full object-fit"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-6 flex-col items-center">
          <form className="flex flex-col gap-2">
            <label className="uppercase" htmlFor="">
              First name
            </label>
            <input
              className="p-2 rounded-xl bg-textGray/15 pl-3 text-base"
              placeholder="Vyara"
              type="text"
            />
            <label className="uppercase" htmlFor="">
              Last name
            </label>
            <input
              className="p-2 rounded-xl bg-textGray/15 pl-3 text-base"
              placeholder="Ivanova"
              type="text"
            />
            <label className="uppercase" htmlFor="">
              Message
            </label>
            <input
              className="p-2 rounded-xl bg-textGray/15 pl-3 mb-2 text-base pb-20 flex justify-start items-start"
              placeholder="Tell me about your business"
              type="text"
            />
            <Button text="Submit" variant="gradient" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
