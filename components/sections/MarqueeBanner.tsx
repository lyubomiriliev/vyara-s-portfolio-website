"use client";

import Image from "next/image";

const logos = [
  { name: "El Shisha", src: "/clients/elshisha.png" },
  { name: "El Well", src: "/clients/elwell.png" },
  { name: "Pulse Homes", src: "/clients/pulsehomes.png" },
  { name: "Pulse Kids", src: "/clients/pulsekids.png" },
  { name: "Fox Academy", src: "/clients/foxacademy.png" },
  { name: "La Maniere", src: "/clients/lamaniere.png" },
  { name: "CoolFit", src: "/clients/coolfit.png" },
  { name: "Vapy", src: "/clients/vapy.png" },
  { name: "Smart Strips", src: "/clients/smart-strips-logo.png" },
  { name: "Fine Design", src: "/clients/fine-design-logo.png" },
  { name: "Dongfeng", src: "/clients/dongfeng-logo-white.png" },
];

export default function MarqueeBanner() {

  if (logos.length === 0) return null;
  return (
    <section className="relative py-8 sm:py-12 md:py-16 border-y border-white/[0.06] overflow-hidden">

      {/* Outer masks left/right edges */}
      <div
        className="overflow-hidden w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        {/* Inner — four identical copies for seamless -25% loop */}
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 px-5 sm:px-8 md:px-12 lg:px-14 flex items-center justify-center"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={180}
                height={56}
                className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
