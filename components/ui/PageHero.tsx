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
    <section className="relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-0 lg:min-h-[480px] xl:min-h-[520px] 3xl:min-h-[640px]">
      <Glow color="orange" size={500} className="top-1/2 left-1/3" />
      <Glow color="pink" size={300} className="top-1/3 right-1/4" />
      <div className="container relative z-10 text-center max-w-3xl 3xl:max-w-4xl mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl text-white mt-3 mb-4 sm:mb-5 leading-[1.05]">
          {titleWithout}
          {titleGradient && (
            <>
              <br />
              <span className="text-gradient-warm">{titleGradient}</span>
            </>
          )}
        </h1>
        <p className="text-base sm:text-lg 3xl:text-xl text-white/60 leading-relaxed max-w-xl 3xl:max-w-2xl mx-auto">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
