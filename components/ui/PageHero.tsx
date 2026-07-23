import { SectionLabel } from "./SectionLabel";
import { Glow } from "./Glow";
import { ReactNode } from "react";

interface PageHeroProps {
  label: string;
  title: string;
  titleGradient?: string;
  description: string;
  children?: ReactNode;
  titleSize?: "default" | "sm";
  bgImage?: string;
  fullHeight?: boolean;
}

export function PageHero({
  label,
  title,
  titleGradient,
  description,
  children,
  titleSize = "default",
  bgImage,
  fullHeight = false,
}: PageHeroProps) {
  const titleWithout = titleGradient
    ? title.replace(titleGradient, "").trim()
    : title;
  const titleClass =
    titleSize === "sm"
      ? "font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl text-white mt-3 mb-4 sm:mb-5 leading-[1.1] break-words hyphens-auto"
      : "font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl text-white mt-3 mb-4 sm:mb-5 leading-[1.05]";
  return (
    <section
      className={
        fullHeight
          ? "relative overflow-hidden flex flex-col justify-center min-h-[70vh] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16"
          : "relative overflow-hidden pt-24 sm:pt-28 md:pt-32 lg:pt-40 3xl:pt-48 4xl:pt-56 pb-12 sm:pb-16 md:pb-0 lg:min-h-[480px] xl:min-h-[520px] 3xl:min-h-[640px] 4xl:min-h-[800px]"
      }
    >
      {bgImage ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
          <Glow color="orange" size={500} className="top-1/2 left-1/3" />
          <Glow color="pink" size={300} className="top-1/3 right-1/4" />
        </>
      ) : (
        <>
          <Glow color="orange" size={500} className="top-1/2 left-1/3" />
          <Glow color="pink" size={300} className="top-1/3 right-1/4" />
        </>
      )}
      <div className="container relative z-10 text-center max-w-3xl 3xl:max-w-4xl 4xl:max-w-5xl mx-auto">
        <SectionLabel>{label}</SectionLabel>
        <h1 className={titleClass}>
          {titleWithout.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))}
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
