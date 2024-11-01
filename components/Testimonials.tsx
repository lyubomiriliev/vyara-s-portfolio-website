import React from "react";

const testimonials = [
  {
    name: "John Doe",
    feedback:
      "Vyara helped us reach new heights with her social media strategies. Our engagement grew by 200% in just 3 months!",
    role: "CEO at El Shisha",
  },
  {
    name: "Jane Smith",
    feedback:
      "Professional and insightful! Vyara's work is exceptional, and she knows exactly what a brand needs.",
    role: "Marketing Director at ABC Corp",
  },
  {
    name: "Alex Johnson",
    feedback:
      "Fantastic collaboration! Her ideas are always fresh and relevant. A true social media expert!",
    role: "Brand Manager at XYZ Ltd",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-900 text-white p-8">
      <h3 className="text-3xl font-bold text-center">Testimonials</h3>
      <div className="flex flex-wrap justify-center gap-8 mt-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg max-w-sm text-center shadow-lg"
          >
            <p className="text-lg italic">"{testimonial.feedback}"</p>
            <h4 className="font-semibold mt-4">{testimonial.name}</h4>
            <p className="text-gray-400 text-sm">{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
