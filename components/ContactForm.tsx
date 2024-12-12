"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/utils/contactSchema";
import Button from "./Button";
import ToastNotification from "./ToastContainer";

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const [toastOpen, setToastOpen] = React.useState(false);
  const [toastTitle, setToastTitle] = React.useState("");
  const [toastDescription, setToastDescription] = React.useState("");

  const showToast = (title: string, description: string) => {
    setToastTitle(title);
    setToastDescription(description);
    setToastOpen(true);
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        showToast("Success", "Email sent successfully");
        reset(); // Reset the form
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
      <div className="w-full bg-cardBG flex flex-col lg:flex-row border-[1px] border-textGray/20 relative overflow-hidden rounded-xl px-6 md:px-12 pt-10 pb-10 lg:pb-8 lg:pt-9 gap-8 lg:gap-0">
        {/* Left Section */}
        <div className="lg:w-1/2 flex flex-col space-y-4 py-6 gap-6">
          <h1 className="uppercase text-5xl md:text-4xl lg:text-5xl font-bold">
            Contact Me
          </h1>
          <p className="uppercase text-textGray max-w-full lg:max-w-[300px]">
            Have a question or need more information about my services? Fill out
            the form and I will get back to you as soon as possible.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="flex-1 flex flex-col lg:p-6 items-center">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="w-full flex flex-col lg:flex-row items-center gap-6">
              <div className="w-full flex flex-col">
                <label
                  className="uppercase text-sm md:text-base pb-1"
                  htmlFor="firstName"
                >
                  First Name*
                </label>
                <input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Your first name"
                  className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
                  type="text"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col">
                <label
                  className="uppercase text-sm md:text-base pb-1"
                  htmlFor="lastName"
                >
                  Last Name*
                </label>
                <input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Your last name"
                  className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
                  type="text"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col">
              <label
                className="uppercase text-sm md:text-base pb-1"
                htmlFor="email"
              >
                Email*
              </label>
              <input
                id="email"
                {...register("email")}
                placeholder="Type your email"
                className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
                type="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="w-full flex flex-col">
              <label
                className="uppercase text-sm md:text-base pb-1"
                htmlFor="phone"
              >
                Phone*
              </label>
              <input
                id="phone"
                {...register("phone")}
                placeholder="Type your phone number"
                className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
                type="text"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="uppercase text-sm md:text-base pb-1"
                htmlFor="business"
              >
                Brand/Business
              </label>
              <input
                id="business"
                {...register("business")}
                placeholder="Tell me about your brand"
                className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base"
                type="text"
              />
              {errors.business && (
                <p className="text-red-500 text-xs">
                  {errors.business.message}
                </p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="uppercase text-sm md:text-base pb-1"
                htmlFor="message"
              >
                Message*
              </label>
              <textarea
                id="message"
                placeholder="Your message should be between 20 and 500 characters."
                {...register("message")}
                className="p-2 rounded-xl bg-textGray/15 pl-3 text-sm md:text-base h-32 md:h-40 resize-none"
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-xs">{errors.message.message}</p>
              )}
            </div>

            <Button
              text={isSubmitting ? "Submitting..." : "Submit"}
              variant="gradient"
              type="submit"
              disabled={isSubmitting}
            />
          </form>
        </div>
        <div className="absolute left-0 -bottom-40 transform -translate-y-1/3 w-40 h-40 rounded-full bg-blueGlow blur-3xl z-0"></div>
        <div className="absolute inset-0 left-[29%] -top-10 transform -translate-y-1/2 w-40 h-40 rounded-full bg-pinkGlow blur-3xl"></div>
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
