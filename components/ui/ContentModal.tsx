"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Images,
  Video,
  Sparkles,
  ImageIcon,
  Printer,
} from "lucide-react";
import type { Project, GoalType } from "@/data/projects";

// ─── Shared config ────────────────────────────────────────────────────────────

export const typeConfig = {
  carousel: { label: "Carousel", icon: Images,    color: "text-[#FB923C]" },
  image:    { label: "Visual",   icon: ImageIcon, color: "text-[#C084FC]" },
  video:    { label: "Reel",     icon: Video,     color: "text-[#FF419D]" },
  ai:       { label: "AI",       icon: Sparkles,  color: "text-[#86EFAC]" },
  print:    { label: "Print",    icon: Printer,   color: "text-[#38BDF8]" },
};

export const goalConfig: Record<GoalType, { label: string; color: string }> = {
  Engagement: { label: "Engagement", color: "bg-accent-pink/10 text-accent-pink border-accent-pink/20" },
  Sales:      { label: "Sales",      color: "bg-accent-violet/10 text-accent-violet border-accent-violet/20" },
  Awareness:  { label: "Awareness",  color: "bg-accent-blue/10 text-accent-blue border-accent-blue/20" },
};

// ─── ContentModal ─────────────────────────────────────────────────────────────

export default function ContentModal({
  project,
  onClose,
  onPrev,
  onNext,
  isVideo,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isVideo: boolean;
}) {
  const cfg = typeConfig[project.type];
  const Icon = cfg.icon;
  const isStatic = !isVideo;

  // Detect mobile so we don't render two <video> elements simultaneously
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center
                 bg-black/85 backdrop-blur-2xl"
      onClick={onClose}
    >
      {/* ── Mobile sheet ── */}
      {isMobile && (
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        className="w-full rounded-t-3xl overflow-hidden flex flex-col
                   bg-[#0f0f18] border-t border-x border-white/[0.08]
                   shadow-[0_-24px_80px_rgba(0,0,0,0.7)]"
        style={{ maxHeight: "92dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-9 h-[3px] rounded-full bg-white/20" />
        </div>
        <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/55 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-[0.14em]">
              <Icon size={10} className={cfg.color} />
              <span className={cfg.color}>{cfg.label}</span>
            </span>
            {project.goal && (
              <span className={`text-[9px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-pill border ${goalConfig[project.goal].color}`}>
                {project.goal}
              </span>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.14] transition-colors">
            <X size={14} className="text-white/60" />
          </button>
        </div>
        <div className="mx-4 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 flex items-center justify-center" style={{ maxHeight: "50dvh" }}>
          {project.type === "carousel" && project.slides ? (
            <CarouselMedia slides={project.slides} />
          ) : isVideo ? (
            <VideoMedia thumbnail={project.thumbnail} videoSrc={project.videoSrc} compact />
          ) : (
            <ImageMedia src={project.thumbnail} alt={project.title} />
          )}
        </div>
        {isStatic && (
          <div className="px-5 pt-4 pb-8 overflow-y-auto flex-shrink-0">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-1">{project.client} · {project.year}</p>
            <h2 className="font-display font-bold text-xl text-white mb-3 leading-tight">{project.title}</h2>
            <p className="text-[13px] text-white/45 leading-relaxed mb-4">{project.description}</p>
            <div>
              <p className="text-[9px] uppercase tracking-[0.14em] font-semibold text-white/35 mb-2">Strategies Used</p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span key={s} className="text-[11px] font-semibold px-3 py-1.5 rounded-pill bg-white/[0.08] border border-white/[0.15] text-white/75">{s}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
      )}

      {/* ── Desktop ── */}
      {!isMobile && (isVideo ? (
        /* Stories-style video viewer */
        <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
          {/* Prev arrow */}
          <button
            onClick={onPrev}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15
                       flex items-center justify-center hover:bg-white/20 transition-all duration-150 flex-shrink-0"
          >
            <ChevronLeft size={22} className="text-white" />
          </button>

          {/* Video card */}
          <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 34 }}
            className="relative rounded-2xl overflow-hidden bg-black border border-white/[0.07]
                       shadow-[0_60px_160px_rgba(0,0,0,0.95)]"
            style={{ height: "min(90vh, 900px)", aspectRatio: "9/16" }}
          >
            <VideoMedia key={project.id} thumbnail={project.thumbnail} videoSrc={project.videoSrc} />

            {/* Category pill — top-left */}
            <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/55 backdrop-blur-md border border-white/10">
              <Icon size={11} className={cfg.color} />
              <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${cfg.color}`}>
                {cfg.label}
              </span>
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full
                         bg-black/60 backdrop-blur-md border border-white/20
                         flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X size={16} className="text-white/80" />
            </button>
          </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          <button
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/15
                       flex items-center justify-center hover:bg-white/20 transition-all duration-150 flex-shrink-0"
          >
            <ChevronRight size={22} className="text-white" />
          </button>
        </div>
      ) : (
        /* Static content — media + side panel */
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex rounded-2xl overflow-hidden items-stretch
                     bg-[#0c0c15] border border-white/[0.07]
                     shadow-[0_60px_160px_rgba(0,0,0,0.95)]"
          style={{ height: "min(85vh, 860px)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex-shrink-0 overflow-hidden bg-black relative h-full" style={{ aspectRatio: "4/5" }}>
            {project.type === "carousel" && project.slides ? (
              <CarouselMedia slides={project.slides} />
            ) : (
              <ImageMedia src={project.thumbnail} alt={project.title} />
            )}
          </div>
          <div className="w-[320px] flex-shrink-0 flex flex-col border-l border-white/[0.06] overflow-y-auto">
            <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/55 backdrop-blur-md border border-white/10 text-[9px] font-bold uppercase tracking-[0.14em]">
                  <Icon size={10} className={cfg.color} />
                  <span className={cfg.color}>{cfg.label}</span>
                </span>
                {project.goal && (
                  <span className={`text-[9px] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-pill border ${goalConfig[project.goal].color}`}>
                    {project.goal}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.15] transition-colors">
                <X size={16} className="text-white/60" />
              </button>
            </div>
            <div className="p-7 flex flex-col gap-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-2">{project.client} · {project.year}</p>
                <h2 className="font-display font-bold text-2xl text-white leading-tight">{project.title}</h2>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <p className="text-sm text-white/50 leading-relaxed">{project.description}</p>
              <div className="h-px bg-white/[0.06]" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-3">Strategies Used</p>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="text-[12px] font-semibold px-4 py-2 rounded-pill bg-white/[0.08] border border-white/[0.15] text-white/80 hover:bg-white/[0.12] hover:text-white transition-colors duration-150">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Image Media ──────────────────────────────────────────────────────────────

function ImageMedia({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0"
    >
      <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 1400px) 75vw, 900px" />
    </motion.div>
  );
}

// ─── Carousel Media ───────────────────────────────────────────────────────────

function CarouselMedia({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);

  const prev = useCallback(() => setIndex((i) => (i - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % slides.length), [slides.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next]);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    dragStart.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };
  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    setDragging(false);
    const endX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart.current - endX;
    if (diff > 50) next();
    else if (diff < -50) prev();
  };

  return (
    <div className="absolute inset-0 select-none">
      <div
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
            style={{ pointerEvents: "none" }}
          >
            <Image src={slides[index]} alt={`Slide ${index + 1}`} fill className="object-contain" sizes="(max-width: 1400px) 75vw, 900px" draggable={false} />
          </motion.div>
        </AnimatePresence>
        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 flex items-center justify-center transition-all duration-150">
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 flex items-center justify-center transition-all duration-150">
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} className={`rounded-full transition-all duration-200 ${i === index ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`} />
          ))}
        </div>
        <span className="text-[11px] text-white/50 font-medium tabular-nums">{index + 1} / {slides.length}</span>
      </div>
    </div>
  );
}

// ─── Video Media ──────────────────────────────────────────────────────────────

function VideoMedia({
  thumbnail,
  videoSrc,
  compact = false,
}: {
  thumbnail: string;
  videoSrc?: string;
  compact?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Autoplay on mount — unmuted; if browser blocks it, stay paused (user clicks to play with sound)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.play().catch(() => {});
    return () => { v.pause(); };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  const getBarRatio = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = barRef.current;
    if (!bar) return null;
    const rect = bar.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const handleSeekClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const ratio = getBarRatio(e);
    if (ratio === null) return;
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSeeking(true);
    handleSeekClick(e);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!seeking) return;
    e.stopPropagation();
    const ratio = getBarRatio(e);
    if (ratio === null) return;
    const v = videoRef.current;
    if (!v || !duration) return;
    v.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  };

  if (!videoSrc) {
    return (
      <div className="relative w-full h-full">
        <Image src={thumbnail} alt="Video" fill className="object-cover opacity-70" />
      </div>
    );
  }

  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div
      className="relative overflow-hidden bg-black"
      style={compact ? { width: "100%", height: "100%" } : { height: "min(90vh, 900px)", aspectRatio: "9/16" }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        poster={thumbnail}
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onTimeUpdate={() => { if (!seeking) setCurrentTime(videoRef.current?.currentTime ?? 0); }}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        suppressHydrationWarning
      />

      {/* Click overlay — play / pause */}
      <div
        className="absolute inset-0 z-10 flex items-center justify-center cursor-pointer"
        onClick={togglePlay}
      >
        {paused && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20
                       flex items-center justify-center"
          >
            <Play size={24} className="text-white ml-1" />
          </motion.div>
        )}
        {!paused && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
            <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Pause size={24} className="text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-10"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-[13px] text-white/70 tabular-nums font-semibold">
            {formatTime(currentTime)}
          </span>
          <div
            ref={barRef}
            className="flex-1 h-[5px] rounded-full bg-white/20 cursor-pointer relative group/bar"
            onClick={handleSeekClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setSeeking(false)}
            onMouseLeave={() => setSeeking(false)}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white transition-none"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white
                         opacity-0 group-hover/bar:opacity-100 transition-opacity duration-150
                         shadow-[0_0_6px_rgba(255,255,255,0.6)]"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>
          <span className="text-[13px] text-white/40 tabular-nums font-semibold">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
