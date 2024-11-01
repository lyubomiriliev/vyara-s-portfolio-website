import React from "react";

const ContactForm: React.FC = () => {
  return (
    <section className="bg-black p-6 text-white">
      <h3 className="text-3xl font-bold text-center">Get in Touch</h3>
      <form className="mt-6 space-y-4 max-w-md mx-auto">
        <input className="w-full p-3 bg-gray-800 rounded" placeholder="Name" />
        <input className="w-full p-3 bg-gray-800 rounded" placeholder="Email" />
        <textarea
          className="w-full p-3 bg-gray-800 rounded"
          placeholder="Message"
        ></textarea>
        <button className="w-full bg-primary p-3 rounded text-black">
          Send
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
