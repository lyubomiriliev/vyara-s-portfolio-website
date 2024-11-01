import React from "react";
import { testimonials } from "@/utils/constants";
import SectionHeading from "./SectionHeading";

export const Testimonials: React.FC = () => {
  return (
    <section className="text-white py-8 relative overflow-hidden">
      <SectionHeading
        title="Testimonials"
        subTitle="What my customers say about my work"
      />

      {/* Fade-out effect on left and right sides */}
      <div className="absolute inset-0 flex z-20 justify-between pointer-events-none">
        <div className="w-16 bg-gradient-to-r from-dark to-transparent"></div>
        <div className="w-16 bg-gradient-to-l from-dark to-transparent"></div>
      </div>

      {/* Scrolling container */}
      <div className="flex items-center animate-scroll space-x-8">
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-cardBG p-6 h-44 border-[1px] border-textGray/20 flex flex-col justify-between items-center rounded-lg max-w-xs text-center shadow-lg overflow-hidden flex-shrink-0"
          >
            {/* Background Glow Circles */}
            <div className="absolute -right-16 bottom-3 transform -translate-y-1/2 w-20 h-20 rounded-full bg-secondary blur-2xl"></div>
            <div className="absolute -left-16 bottom-3 transform -translate-y-1/2 w-20 h-20 rounded-full bg-primary blur-2xl"></div>

            {/* Profile Picture and Name */}
            <div className="flex items-center w-full gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0 overflow-hidden">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>

            {/* Testimonial Text */}
            <p className="text-sm text-gray-300 italic mb-3">{`"${testimonial.feedback}"`}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
