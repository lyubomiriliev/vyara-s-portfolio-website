import { SectionLabel } from "./SectionLabel";
import { Glow } from "./Glow";
import { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  title: string;
  titleGradient?: string;
  description: string;
  children?: ReactNode;
}

export function PageHero({
  label,
  title,
  titleGradient,
  description,
  children,
}: PageHeroProps) {
  const titleWithout = titleGradient
    ? title.replace(titleGradient, "").trim()
    : title;
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-0">
      <Glow color="orange" size={500} className="top-1/2 left-1/3" />
      <Glow color="pink" size={300} className="top-1/3 right-1/4" />
      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-white mt-3 mb-5 leading-[1.05]">
          {titleWithout}
          {titleGradient && (
            <>
              <br />
              <span className="text-gradient-warm">{titleGradient}</span>
            </>
          )}
        </h1>
        <p className="text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
