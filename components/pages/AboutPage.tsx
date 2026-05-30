"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useCallback, useEffect } from "react";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { Glow } from "@/components/ui/Glow";
import { useLang } from "@/lib/LanguageContext";

function ScrollableBio({
  children,
  thumbColor,
  fadeColor = "rgb(13,10,24)",
}: {
  children: React.ReactNode;
  thumbColor: string;
  fadeColor?: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);

  const updateThumb = useCallback(() => {
    const el = contentRef.current;
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!el || !thumb || !track) return;
    const ratio = el.scrollTop / (el.scrollHeight - el.clientHeight);
    const trackH = track.clientHeight;
    const thumbH = Math.max(40, (el.clientHeight / el.scrollHeight) * trackH);
    thumb.style.height = `${thumbH}px`;
    thumb.style.top = `${ratio * (trackH - thumbH)}px`;
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    updateThumb();
    el.addEventListener("scroll", updateThumb, { passive: true });
    return () => el.removeEventListener("scroll", updateThumb);
  }, [updateThumb]);

  const onTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = contentRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!el || !track || !thumb) return;
    const trackRect = track.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const thumbH = thumb.clientHeight;
    const ratio = (clickY - thumbH / 2) / (track.clientHeight - thumbH);
    el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
  }, []);

  const onThumbMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = contentRef.current?.scrollTop ?? 0;

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const el = contentRef.current;
      const track = trackRef.current;
      const thumb = thumbRef.current;
      if (!el || !track || !thumb) return;
      const delta = ev.clientY - dragStartY.current;
      const ratio = delta / (track.clientHeight - thumb.clientHeight);
      el.scrollTop = dragStartScroll.current + ratio * (el.scrollHeight - el.clientHeight);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp, { once: true });
  }, []);

  return (
    <div className="relative flex gap-2" style={{ flex: "1 1 0px", minHeight: 0 }}>
      {/* Scrollable content — native scrollbar hidden */}
      <div
        ref={contentRef}
        className="flex flex-col gap-3 flex-1 min-h-0"
        style={{ overflowY: "scroll", scrollbarWidth: "none" }}
      >
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
        {children}
        {/* Bottom padding so last line isn't under the fade */}
        <div className="flex-shrink-0 h-10" />
      </div>

      {/* Bottom fade overlay */}
      <div
        className="absolute bottom-0 left-0 right-4 h-14 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${fadeColor})` }}
      />

      {/* Custom scrollbar track */}
      <div
        ref={trackRef}
        className="flex-shrink-0 relative w-[2px] rounded-full cursor-pointer self-stretch"
        style={{ background: "rgba(255,255,255,0.08)" }}
        onClick={onTrackClick}
      >
        {/* Thumb */}
        <div
          ref={thumbRef}
          className="absolute left-0 right-0 rounded-full cursor-grab active:cursor-grabbing"
          style={{ background: thumbColor, minHeight: "40px", top: 0 }}
          onMouseDown={onThumbMouseDown}
        />
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { t } = useLang();

  return (
    <main>
      {/* ── Hero — WHO WE ARE ── */}
      <section
        className="relative overflow-hidden min-h-screen flex items-center"
        style={{ background: "rgb(10,8,18)" }}
      >
        {/* Ambient glows */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "900px",
            height: "900px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -60%)",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.1) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            left: "50%",
            bottom: "-100px",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10 w-full">
          <div className="pt-40 pb-20 lg:pt-44 lg:pb-24">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center gap-7 w-full max-w-4xl mx-auto"
            >
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.about.pageLabel}</SectionLabel>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display font-extrabold leading-[0.92] tracking-tight"
                style={{ letterSpacing: "-0.03em" }}
              >
                {/* First two words — big warm gradient */}
                <span
                  className="block"
                  style={{
                    fontSize: "clamp(56px, 8vw, 112px)",
                    background: "linear-gradient(135deg, #FFB76C 0%, #FF5E9E 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.about.pageTitle.split(". ").slice(0, 2).join(". ")}.
                </span>
                {/* Rest of title — smaller, white */}
                <span
                  className="block text-white mt-1"
                  style={{ fontSize: "clamp(28px, 3.8vw, 54px)" }}
                >
                  {t.about.pageTitle.split(". ").slice(2).join(". ")}
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/55 leading-relaxed max-w-3xl"
                style={{ fontSize: "clamp(16px, 1.3vw, 20px)" }}
              >
                {t.about.pageDescription}
              </motion.p>

              <motion.div variants={fadeUp}>
                <Link href="/contact">
                  <ButtonPrimary size="lg">{t.about.ctaButton}</ButtonPrimary>
                </Link>
              </motion.div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-px w-full mt-6 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                {[
                  { value: "8г+", label: t.clients.stats[1].label, accent: "#E040A0" },
                  { value: "16+", label: t.clients.stats[0].label, accent: "#4A9EFF" },
                  { value: "100%", label: t.clients.stats[2].label, accent: "#FFB76C" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 + i * 0.1 }}
                    className="flex flex-col items-center gap-1 py-7 px-4"
                    style={{ background: "rgb(10,8,18)" }}
                  >
                    <span
                      className="font-display font-extrabold leading-none"
                      style={{ fontSize: "clamp(32px, 3.5vw, 52px)", letterSpacing: "-0.04em", color: s.accent }}
                    >
                      {s.value}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why We're Different ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(13,10,24)" }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            left: "-200px",
            top: "-100px",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            right: "-100px",
            bottom: "-100px",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-end mb-16 md:mb-20"
          >
            <div>
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.about.whyLabel}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-extrabold text-white mt-5 leading-[0.95] tracking-tight"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 64px)",
                  letterSpacing: "-0.03em",
                }}
              >
                {t.about.whyTitle}
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="flex flex-col gap-4 text-white/50 text-base sm:text-lg leading-relaxed lg:pb-2"
            >
              {t.about.whySub.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </motion.div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-white/[0.06] mb-16" />

          {/* Three-column value cards — same pattern as screenshot */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-px mb-24"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {[
              {
                number: "01",
                iconColor: "#E040A0",
                border: "rgba(224,64,160,0.3)",
                glow: "rgba(224,64,160,0.15)",
                title: t.whyAviva.cards[0].title,
                body: t.whyAviva.cards[0].body,
              },
              {
                number: "02",
                iconColor: "#9B59F5",
                border: "rgba(155,89,245,0.3)",
                glow: "rgba(155,89,245,0.15)",
                title: t.whyAviva.cards[1].title,
                body: t.whyAviva.cards[1].body,
              },
              {
                number: "03",
                iconColor: "#4A9EFF",
                border: "rgba(74,158,255,0.3)",
                glow: "rgba(74,158,255,0.15)",
                title: t.whyAviva.cards[2].title,
                body: t.whyAviva.cards[2].body,
              },
            ].map((card) => (
              <motion.div
                key={card.number}
                variants={fadeUp}
                className="group relative p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-5 cursor-default min-h-[320px] md:min-h-[360px]"
                style={{ background: "rgb(13,10,24)" }}
                whileHover={{
                  background: `radial-gradient(circle at 30% 0%, ${card.glow} 0%, rgb(13,10,24) 60%)`,
                  transition: { duration: 0.4 },
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.iconColor}, transparent)`,
                  }}
                />
                <span
                  className="font-display font-extrabold text-[80px] leading-none select-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-300 absolute top-6 right-8"
                  style={{ color: card.iconColor }}
                >
                  {card.number}
                </span>
                <div className="flex flex-col gap-5 pt-8">
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(10,8,18)" }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "800px",
            height: "800px",
            left: "-200px",
            top: "50%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(224,64,160,0.08) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            right: "-150px",
            top: "50%",
            transform: "translateY(-50%)",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.09) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-16 md:mb-20"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{t.about.teamSectionLabel}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-display font-extrabold text-white mt-5 leading-[0.95] tracking-tight"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                letterSpacing: "-0.03em",
              }}
            >
              {t.about.teamSectionTitle}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #FFB76C 0%, #FF6B6B 50%, #E040A0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t.about.teamSectionAccent}
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-white/45 text-base sm:text-lg leading-relaxed mt-5"
            >
              {t.about.teamSectionSub}
            </motion.p>
          </motion.div>

          {/* Founder cards — full-width, image panel left, bio right */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >
            {/* Vyara */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-[28px] overflow-hidden"
              style={{
                background: "rgb(13,10,24)",
                border: "1px solid rgba(224,64,160,0.12)",
                height: "520px",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] z-10"
                style={{ background: "linear-gradient(90deg, transparent 0%, #E040A0 20%, rgba(224,64,160,0.3) 55%, transparent 100%)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(224,64,160,0.06) 0%, transparent 60%)" }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-[30%_1fr] h-full">
                <div className="relative hidden lg:block overflow-hidden">
                  <Image src="/profile/vyara-ilieva.png" alt="Vyara Ivanova-Ilieva" fill className="object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 40%, rgb(13,10,24) 100%)" }} />
                </div>

                <div className="flex flex-col p-6 sm:p-8 lg:p-10 lg:pl-6 overflow-hidden" style={{ height: "520px" }}>
                  <div className="flex-shrink-0 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#E040A0" }}>{t.about.founder1Role}</p>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight mt-1">{t.about.founder1Name}</h3>
                  </div>

                  <ScrollableBio thumbColor="#E040A0">
                    {t.about.founder1Bio.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm sm:text-base text-white/55 leading-relaxed">{para}</p>
                    ))}
                  </ScrollableBio>

                  <div className="flex-shrink-0 flex flex-wrap gap-2 pt-4">
                    {[t.about.founder1Tag1, t.about.founder1Tag2, t.about.founder1Tag3].map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(224,64,160,0.08)", border: "1px solid rgba(224,64,160,0.22)", color: "rgba(224,64,160,0.85)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Lyubomir — warm orange accent */}
            <motion.div
              variants={fadeUp}
              className="group relative rounded-[28px] overflow-hidden"
              style={{
                background: "rgb(13,10,24)",
                border: "1px solid rgba(255,183,108,0.12)",
                height: "520px",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-[1px] z-10"
                style={{ background: "linear-gradient(90deg, transparent 0%, #FFB76C 20%, rgba(255,183,108,0.3) 55%, transparent 100%)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 0% 50%, rgba(255,183,108,0.06) 0%, transparent 60%)" }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-[30%_1fr] h-full">
                <div className="relative hidden lg:block overflow-hidden">
                  <Image src="/team/lyubomir-iliev.webp" alt="Lyubomir Iliev" fill className="object-cover object-top" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 55%, rgb(13,10,24) 100%)" }} />
                </div>

                <div className="flex flex-col h-full p-6 sm:p-8 lg:p-10 lg:pl-6 overflow-hidden">
                  <div className="flex-shrink-0 mb-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: "#FFB76C" }}>{t.about.founder2Role}</p>
                    <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight mt-1">{t.about.founder2Name}</h3>
                  </div>

                  <div className="flex flex-col gap-3 overflow-hidden" style={{ flex: "1 1 0px", minHeight: 0 }}>
                    {t.about.founder2Bio.split("\n\n").map((para, i) => (
                      <p key={i} className="text-sm sm:text-base text-white/55 leading-relaxed">{para}</p>
                    ))}
                  </div>

                  <div className="flex-shrink-0 flex flex-wrap gap-2 pt-4">
                    {[t.about.founder2Tag1, t.about.founder2Tag2, t.about.founder2Tag3].map((tag) => (
                      <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: "rgba(255,183,108,0.08)", border: "1px solid rgba(255,183,108,0.22)", color: "rgba(255,183,108,0.85)" }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AI Section ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: "rgb(13,10,24)" }}
      >
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "800px",
            height: "800px",
            right: "-200px",
            top: "-100px",
            background:
              "radial-gradient(circle, rgba(155,89,245,0.09) 0%, transparent 65%)",
            filter: "blur(100px)",
          }}
        />
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            left: "-100px",
            bottom: "-100px",
            background:
              "radial-gradient(circle, rgba(74,158,255,0.07) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start"
          >
            {/* Left — label + headline */}
            <div className="flex flex-col gap-5 lg:sticky lg:top-32">
              <motion.div variants={fadeUp}>
                <SectionLabel>{t.about.aiLabel}</SectionLabel>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-display font-extrabold text-white leading-[0.95] tracking-tight"
                style={{
                  fontSize: "clamp(36px, 4.5vw, 64px)",
                  letterSpacing: "-0.03em",
                }}
              >
                {t.about.aiTitle}{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #FFB76C 0%, #E040A0 55%, #9B59F5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {t.about.aiTitleAccent}
                </span>
              </motion.h2>
            </div>

            {/* Right — two body paragraphs */}
            <motion.div
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <motion.div
                variants={fadeUp}
                className="p-6 sm:p-8 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-white/55 leading-relaxed text-base sm:text-lg">
                  {t.about.aiBody1}
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                className="p-6 sm:p-8 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-white/55 leading-relaxed text-base sm:text-lg">
                  {t.about.aiBody2}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section-padding relative overflow-hidden">
        <Glow color="pink" size={600} className="top-1/2 left-1/2" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative rounded-[28px] pt-16 md:pt-24 px-6 sm:px-10 md:px-20 lg:px-28 pb-0 text-center max-w-5xl mx-auto flex flex-col"
            style={{
              background:
                "linear-gradient(135deg, rgba(224,64,160,0.07), rgba(155,89,245,0.07), rgba(74,158,255,0.05))",
              border: "1px solid rgba(224,64,160,0.2)",
            }}
          >
            <video
              aria-hidden
              autoPlay
              loop
              muted
              playsInline
              suppressHydrationWarning
              className="absolute inset-0 w-full h-full object-cover rounded-[28px] pointer-events-none"
              style={{ opacity: 0.4 }}
            >
              <source src="/videos/ai-master-video.mp4" type="video/mp4" />
            </video>
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[28px]"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,10,15,0.2) 0%, rgba(10,10,15,0.85) 100%)",
              }}
            />
            <div
              className="absolute top-0 left-1/4 right-1/4 h-[1px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(224,64,160,0.6), transparent)",
              }}
            />
            <div className="relative z-10">
              <motion.h2
                variants={fadeUp}
                className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
              >
                {t.about.ctaTitle}
              </motion.h2>
            </div>
            <motion.div
              variants={fadeUp}
              className="relative z-10 flex justify-center mt-auto pt-8 sm:pt-10 pb-10 sm:pb-12 md:pb-16"
            >
              <Link href="/contact">
                <button
                  className="inline-flex items-center font-display font-semibold px-8 md:px-10 py-4 text-sm sm:text-base text-white hover:opacity-90 transition-all duration-150 cursor-pointer whitespace-nowrap"
                  style={{
                    background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                    borderRadius: "16px",
                  }}
                >
                  {t.about.ctaButton}
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
