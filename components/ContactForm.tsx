"use client";

import React, { useState } from "react";
import { contactIcons } from "@/utils/constants";
import Button from "./Button";
import Image from "next/image";
import ToastNotification from "./ToastContainer";

const ContactForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const [toastTitle, setToastTitle] = useState("");
  const [toastDescription, setToastDescription] = useState("");

  const showToast = (title: string, description: string) => {
    setToastTitle(title);
    setToastDescription(description);
    setToastOpen(true);
  };

  const handleContact = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email || !firstName || !lastName || !message) {
      showToast("Error", "Please fill all the fields");
      return;
    }

    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          message: message,
        }),
      });

      if (response.ok) {
        showToast("Success", "Email sent successfully");
      } else {
        throw new Error("Error sending email");
      }
    } catch (error) {
      console.error("Network Error:", error);
      showToast("Error", "Email failed to send");
    }
  };

  return (
    <section
      id="contact"
      className="text-white py-8 w-full flex justify-center items-center flex-col max-w-screen-lg mx-auto px-4"
    >
      <div className="w-full relative overflow-hidden bg-cardBG flex flex-col lg:flex-row border-[1px] border-textGray/20 rounded-xl px-6 md:px-12 pt-10 pb-10 lg:pb-8 lg:pt-9 gap-8 lg:gap-0">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col space-y-4 py-6 gap-6">
          <h1 className="uppercase text-5xl md:text-4xl lg:text-5xl font-bold">
            Contact Me
          </h1>
          <p className="uppercase text-textGray max-w-full lg:max-w-[300px]">
            Have a question or need more information about my services? Fill out
            the form and I will get back to you as soon as possible.
          </p>

          {/* Background Glow Circles */}
          <div className="absolute right-8 md:right-24 -top-10 transform -translate-y-1/2 w-20 h-20 md:w-40 md:h-40 rounded-full bg-blueGlow blur-2xl md:blur-3xl"></div>
          <div className="absolute left-8 md:left-24 -bottom-40 transform -translate-y-1/2 w-20 h-20 md:w-40 md:h-40 rounded-full bg-pinkGlow blur-2xl md:blur-3xl"></div>

          <div className="w-2/3 bg-textGray h-[1px]"></div>
          <div className="flex items-center w-full gap-4 md:gap-6">
            {contactIcons.slice(0, 3).map((logo, index) => (
              <div className="w-8 h-8 md:w-10 md:h-10" key={index}>
                <Image
                  width={600}
                  height={600}
                  src={logo.icon}
                  alt={logo.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 flex flex-col lg:p-6 items-center">
          <form className="flex flex-col gap-2 w-full">
            <label
              className="uppercase text-sm md:text-base"
              htmlFor="firstName"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
              type="text"
            />
            <label
              className="uppercase text-sm md:text-base"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
              type="text"
            />
            <label
              className="uppercase text-sm md:text-base"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
              type="text"
            />

            <label className="uppercase text-sm md:text-base" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-2 rounded-xl bg-textGray/15 pl-3 mb-2 text-sm md:text-base h-32 md:h-40 resize-none"
              placeholder="Tell me about your business"
            ></textarea>
            <Button onClick={handleContact} text="Submit" variant="gradient" />
          </form>
        </div>
      </div>
      <ToastNotification
        title={toastTitle}
        description={toastDescription}
        open={toastOpen}
        setOpen={setToastOpen}
      />
    </section>
  );
};

export default ContactForm;
