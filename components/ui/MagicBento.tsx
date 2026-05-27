"use client";

import React, { useId } from "react";
import * as Icons from "lucide-react";
import Image from "next/image";

const SERVICE_VIDEOS: Record<string, string> = {
  "video-editing": "/services-images/video-editing.mp4",
};

const SERVICE_BACKGROUNDS: Record<string, string> = {
  "social-media-management": "/services-images/social-media-management.webp",
  "ai-powered-marketing": "/services-images/ai-marketing.webp",
  "meta-ads-campaigns": "/services-images/meta-ads.webp",
  "email-marketing": "/services-images/email-marketing.webp",
  "graphic-design": "/services-images/graphic-design.webp",
  "print-materials": "/services-images/print-materials.webp",
  "video-filming": "/services-images/video-filming.webp",
  "video-editing": "/services-images/video-editing.webp",
  copywriting: "/services-images/copywriting.webp",
  "ai-image-generation": "/background-images/ai-master-wallpaper.webp",
  "ai-video-generation": "/services-images/ai-video-generation.webp",
  "seo-optimization": "/services-images/seo-marketing.webp",
  "custom-websites-nextjs": "/services-images/custom-websites.webp",
  "online-store-ecommerce": "/services-images/ecommerce.webp",
  "web-applications": "/services-images/web-applications.webp",
  "saas-solutions": "/services-images/saas-solutions.webp",
  "hosting-domain": "/services-images/hosting-domain.webp",
};

export interface BentoCardData {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

const DEFAULT_GLOW_COLOR = "255, 65, 157";

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
  glowColor = DEFAULT_GLOW_COLOR,
}: MagicBentoProps) {
  const rawId = useId();
  const instanceId = `mb-${rawId.replace(/:/g, "")}`;
  const s = `.${instanceId}`;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        ${s} {
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

        ${s} .card {
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: auto;
        }

        @media (hover: hover) {
          ${s} .card:hover {
            border-color: rgba(${glowColor}, 0.5);
            box-shadow: 0 4px 20px rgba(${glowColor}, 0.15);
            transform: translateY(-2px);
          }
        }

        .text-clamp-1 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; overflow: hidden; }
        .text-clamp-2 { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }

        @media (max-width: 599px) {
          .card-responsive .card { width: 100%; min-height: 180px; }
        }
      `,
        }}
      />

      <div
        className={`bento-section grid gap-2 p-3 select-none relative ${instanceId}`}
        style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5em)" }}
      >
        <div className="card-responsive">
          {(() => {
            const scoreOf = (c: BentoCardData) =>
              (c.description?.length ?? 0) + (c.benefits?.join("").length ?? 0);
            const byScore = [...cards].sort((a, b) => scoreOf(b) - scoreOf(a));
            const bigIds = [byScore[0]?.id, byScore[1]?.id].filter(Boolean);
            const smalls = cards.filter((c) => !bigIds.includes(c.id));
            const bigs = bigIds
              .map((id) => cards.find((c) => c.id === id)!)
              .filter(Boolean);
            const ordered = [...smalls.slice(0, 2), ...bigs, ...smalls.slice(2)];

            return ordered.map((card, index) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const IconComp = (Icons as any)[card.icon] as
                | React.ElementType
                | undefined;
              const bgImage = SERVICE_BACKGROUNDS[card.id];
              const bgVideo = SERVICE_VIDEOS[card.id];

              return (
                <div
                  key={index}
                  className="card flex flex-col relative min-h-[220px] sm:min-h-[260px] md:min-h-[300px] w-full max-w-full rounded-[20px] border border-solid font-light overflow-hidden"
                  style={{
                    backgroundColor: "#0d0a14",
                    borderColor: "var(--border-color)",
                    color: "white",
                  }}
                >
                  {bgVideo && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <video
                        src={bgVideo}
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.25]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/70 to-transparent" />
                    </div>
                  )}

                  {bgImage && !bgVideo && (
                    <div className="absolute inset-0 z-0 pointer-events-none">
                      <Image
                        src={bgImage}
                        alt=""
                        fill
                        loading="lazy"
                        className="object-cover opacity-[0.18]"
                        sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a14] via-[#0d0a14]/70 to-transparent" />
                    </div>
                  )}

                  <div className="flex flex-col relative p-4 sm:p-5 md:p-6 z-10 gap-3 sm:gap-4 h-full">
                    <div className="flex flex-col gap-2 sm:gap-3 flex-1">
                      <h3 className="font-bold text-[18px] sm:text-[20px] md:text-[24px] leading-snug text-white m-0">
                        {card.title}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] md:text-[17px] leading-[1.65] text-white/70 m-0">
                        {card.description}
                      </p>
                    </div>

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
                </div>
              );
            });
          })()}
        </div>
      </div>
    </>
  );
}
