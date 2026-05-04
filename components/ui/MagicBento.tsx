"use client";

import React, { useRef, useEffect, useState, useCallback, useId } from "react";
import { gsap } from "gsap";
import * as Icons from "lucide-react";
import Image from "next/image";

// Map service IDs to background videos (MP4)
const SERVICE_VIDEOS: Record<string, string> = {
  "video-editing": "/services-images/video-editing.mp4",
};

// Map service IDs to background images
const SERVICE_BACKGROUNDS: Record<string, string> = {
  "social-media-management": "/services-images/social-media-management.png",
  "ai-powered-marketing": "/services-images/ai-marketing.png",
  "meta-ads-campaigns": "/services-images/meta-ads.png",
  "email-marketing": "/services-images/email-marketing.png",
  "graphic-design": "/services-images/graphic-design.png",
  "print-materials": "/services-images/print-materials.png",
  "video-filming": "/services-images/video-filming.png",
  "video-editing": "/services-images/video-editing.png",
  copywriting: "/services-images/copywriting.png",
  "ai-image-generation": "/background-images/ai-master-wallpaper.png",
  "ai-video-generation": "/services-images/ai-video-generation.png",
  "seo-optimization": "/services-images/seo-marketing.png",
  "custom-websites-nextjs": "/services-images/custom-websites.png",
  "online-store-ecommerce": "/services-images/ecommerce.png",
  "web-applications": "/services-images/web-applications.png",
  "saas-solutions": "/services-images/saas-solutions.png",
  "hosting-domain": "/services-images/hosting-domain.png",
};

export interface BentoCardData {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 65, 157";
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (
  x: number,
  y: number,
  color: string = DEFAULT_GLOW_COLOR,
): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// ─── ParticleCard ─────────────────────────────────────────────────────────────
const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" },
        );
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt)
        gsap.to(element, {
          rotateX: 8,
          rotateY: 8,
          duration: 0.4,
          ease: "power1.out",
          transformPerspective: 1000,
        });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt)
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: "power1.out",
        });
      if (enableMagnetism)
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt)
        gsap.to(element, {
          rotateX: ((y - centerY) / centerY) * -15,
          rotateY: ((x - centerX) / centerX) * 15,
          duration: 0.2,
          ease: "power1.out",
          transformPerspective: 1000,
        });
      if (enableMagnetism)
        magnetismAnimationRef.current = gsap.to(element, {
          x: (x - centerX) * 0.05,
          y: (y - centerY) * 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxDistance * 2}px;height:${maxDistance * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxDistance}px;top:${y - maxDistance}px;pointer-events:none;z-index:1000;`;
      element.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);
    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

// ─── GlobalSpotlight ──────────────────────────────────────────────────────────
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = `
      position: fixed;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.07) 0%,
        rgba(${glowColor}, 0.04) 15%,
        rgba(${glowColor}, 0.02) 25%,
        rgba(${glowColor}, 0.01) 40%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll(".card");

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance)
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
      const targetOpacity =
        minDistance <= proximity
          ? 0.4
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.4
            : 0;
      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current
        ?.querySelectorAll(".card")
        .forEach((card) =>
          (card as HTMLElement).style.setProperty("--glow-intensity", "0"),
        );
      if (spotlightRef.current)
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ─── BentoCardGrid ────────────────────────────────────────────────────────────
const BentoCardGrid: React.FC<{
  children: React.ReactNode;
  gridRef?: React.RefObject<HTMLDivElement>;
  instanceId?: string;
}> = ({ children, gridRef, instanceId }) => (
  <div
    className={`bento-section grid gap-2 p-3 select-none relative${instanceId ? ` ${instanceId}` : ""}`}
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5em)" }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

// ─── Main export ──────────────────────────────────────────────────────────────
interface MagicBentoProps {
  cards: BentoCardData[];
  getStartedLabel?: string;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

export default function MagicBento({
  cards,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = false,
}: MagicBentoProps) {
  const rawId = useId();
  const instanceId = `mb-${rawId.replace(/:/g, "")}`;
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const s = `.${instanceId}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${s} {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: ${glowColor};
          --border-color: rgba(${glowColor}, 0.25);
          --background-dark: #0d0a14;
        }

        .card-responsive {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          width: 100%;
        }

        @media (min-width: 600px) {
          .card-responsive { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .card-responsive { grid-template-columns: repeat(4, 1fr); }
          .card-responsive .card:nth-child(3) { grid-column: span 2; grid-row: span 2; }
          .card-responsive .card:nth-child(4) { grid-column: 1 / span 2; grid-row: 2 / span 2; }
          .card-responsive .card:nth-child(6) { grid-column: 4; grid-row: 3; }
        }

        ${s} .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 4px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 1.0)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.6)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: subtract;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }

        ${s} .card--border-glow:hover {
          box-shadow: 0 4px 24px rgba(${glowColor}, 0.15), 0 0 40px rgba(${glowColor}, 0.25);
        }

        .particle::before {
          content: '';
          position: absolute;
          top: -2px; left: -2px; right: -2px; bottom: -2px;
          background: rgba(${glowColor}, 0.2);
          border-radius: 50%;
          z-index: -1;
        }

        .particle-container:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.3), 0 0 30px rgba(${glowColor}, 0.2);
        }

        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
        }

        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }

        @media (max-width: 599px) {
          .card-responsive .card { width: 100%; min-height: 180px; }
        }
      `,
        }}
      />

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef as React.RefObject<HTMLDivElement>}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid
        gridRef={gridRef as React.RefObject<HTMLDivElement>}
        instanceId={instanceId}
      >
        <div className="card-responsive">
          {(() => {
            const scoreOf = (c: BentoCardData) =>
              (c.description?.length ?? 0) + (c.benefits?.join("").length ?? 0);
            const byScore = [...cards].sort((a, b) => scoreOf(b) - scoreOf(a));
            const bigIds = [byScore[0]?.id, byScore[1]?.id].filter(Boolean);
            const smalls = cards.filter((c) => !bigIds.includes(c.id));
            const bigs = bigIds.map((id) => cards.find((c) => c.id === id)!).filter(Boolean);
            const ordered = [...smalls.slice(0, 2), ...bigs, ...smalls.slice(2)];
            return ordered.map((card, index) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComp = (Icons as any)[card.icon] as
              | React.ElementType
              | undefined;
            const baseClassName = `card flex flex-col relative min-h-[300px] w-full max-w-full rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${enableBorderGlow ? "card--border-glow" : ""}`;
            const cardStyle: React.CSSProperties = {
              backgroundColor: "#0d0a14",
              borderColor: "var(--border-color)",
              color: "white",
              "--glow-x": "50%",
              "--glow-y": "50%",
              "--glow-intensity": "0",
              "--glow-radius": "200px",
            } as React.CSSProperties;

            const bgImage = SERVICE_BACKGROUNDS[card.id];
            const bgVideo = SERVICE_VIDEOS[card.id];

            const cardContent = (
              <>
                {/* Background video with dark overlay */}
                {bgVideo && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <video
                      src={bgVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/70 to-transparent" />
                  </div>
                )}

                {/* Background image with dark overlay */}
                {bgImage && !bgVideo && (
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <Image
                      src={bgImage}
                      alt=""
                      fill
                      className="object-cover opacity-[0.18]"
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/70 to-transparent" />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col relative p-6 z-10 gap-4 h-full">
                  {/* Text content */}
                  <div className="flex flex-col gap-3 flex-1">
                    <h3 className="font-bold text-[24px] leading-snug text-white m-0">
                      {card.title}
                    </h3>
                    <p className="text-[17px] leading-[1.65] text-white/70 m-0">
                      {card.description}
                    </p>
                  </div>

                  {/* Icon — bottom right */}
                  <div className="flex justify-end">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: `rgba(${glowColor}, 0.2)` }}
                    >
                      {IconComp && (
                        <IconComp
                          size={17}
                          style={{ color: `rgba(${glowColor}, 1)` }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            );

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  {cardContent}
                </ParticleCard>
              );
            }

            return (
              <div key={index} className={baseClassName} style={cardStyle}>
                {cardContent}
              </div>
            );
          });
          })()}
        </div>
      </BentoCardGrid>
    </>
  );
}
