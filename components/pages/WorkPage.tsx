"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { projects, projectCategories } from "@/data/projects";
import type { Project, GoalType } from "@/data/projects";
import { scaleIn } from "@/lib/animations";

type Category = (typeof projectCategories)[number];

const typeConfig = {
  carousel: { label: "Carousel", icon: Images, color: "text-accent-violet" },
  image: { label: "Visual", icon: ImageIcon, color: "text-[#F9A8D4]" },
  video: { label: "Reel", icon: Video, color: "text-accent-pink" },
  ai: { label: "AI", icon: Sparkles, color: "text-accent-orange" },
  print: { label: "Print", icon: Printer, color: "text-[#38BDF8]" },
};

const goalConfig: Record<GoalType, { label: string; color: string }> = {
  Engagement: {
    label: "Engagement",
    color: "bg-accent-pink/10 text-accent-pink border-accent-pink/20",
  },
  Sales: {
    label: "Sales",
    color: "bg-accent-violet/10 text-accent-violet border-accent-violet/20",
  },
  Awareness: {
    label: "Awareness",
    color: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
  },
};

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const openModal = useCallback((project: Project) => {
    setSelectedProject(project);
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProject(null);
    document.documentElement.classList.remove("overflow-hidden");
    document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="relative bg-bg-primary">
      {/* ── Filter + Feed ── */}
      <section className="section-padding">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Filter bar */}
          <div className="mb-14 flex justify-center">
            <div
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="relative z-10 py-2 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  style={{
                    color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{
                        background: "linear-gradient(135deg, #FFB76C, #FF419D)",
                      }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry feed — 4 fixed columns, no gaps */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-2 md:columns-3 lg:columns-4 gap-3"
            >
              {filtered.map((project, i) => (
                <FeedCard
                  key={project.id}
                  project={project}
                  index={i}
                  onClick={() => openModal(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ContentModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Feed Card ────────────────────────────────────────────────────────────────

function FeedCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const cfg = typeConfig[project.type];
  const Icon = cfg.icon;
  const isVideo = project.type === "video";

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="break-inside-avoid mb-3 group relative cursor-pointer rounded-2xl overflow-hidden"
      onClick={onClick}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
      >
        {/* Natural aspect ratio — image drives its own height */}
        {isVideo && project.videoSrc ? (
          <div className="relative w-full aspect-[9/16] bg-white/[0.04]">
            <video
              src={project.videoSrc}
              poster={project.thumbnail}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ) : (
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={800}
            height={800}
            className="w-full h-auto block"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-pill
                        bg-black/55 backdrop-blur-md border border-white/10"
        >
          <Icon size={11} className={cfg.color} />
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${cfg.color}`}
          >
            {cfg.label}
          </span>
        </div>

        {/* Play icon for video cards */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Play size={18} className="text-white ml-1" />
            </div>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10
                        opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out
                        flex flex-col justify-end p-4 z-10"
        >
          <h3 className="font-display font-bold text-sm text-white leading-snug mb-2">
            {project.title}
          </h3>
          {project.goal && (
            <span
              className={`self-start text-[9px] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-pill border ${goalConfig[project.goal].color}`}
            >
              {project.goal}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Content Modal ────────────────────────────────────────────────────────────

function ContentModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const cfg = typeConfig[project.type];
  const Icon = cfg.icon;
  const isVideo = project.type === "video";

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
      {/* ── Mobile sheet (slides up from bottom) ── */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 340, damping: 36 }}
        className="md:hidden w-full rounded-t-3xl overflow-hidden flex flex-col
                   bg-[#0f0f18] border-t border-x border-white/[0.08]
                   shadow-[0_-24px_80px_rgba(0,0,0,0.7)]"
        style={{ maxHeight: "92dvh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-9 h-[3px] rounded-full bg-white/20" />
        </div>

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill
                              bg-white/[0.06] border border-white/[0.1] text-[9px]
                              font-bold uppercase tracking-[0.14em]"
            >
              <Icon size={10} className={cfg.color} />
              <span className={cfg.color}>{cfg.label}</span>
            </span>
            {project.goal && (
              <span
                className={`text-[9px] font-semibold uppercase tracking-[0.1em]
                               px-2.5 py-1 rounded-pill border ${goalConfig[project.goal].color}`}
              >
                {project.goal}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.07] border border-white/[0.1]
                       flex items-center justify-center hover:bg-white/[0.14] transition-colors"
          >
            <X size={14} className="text-white/60" />
          </button>
        </div>

        {/* Media */}
        <div
          className="mx-4 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0
                        flex items-center justify-center"
          style={{ maxHeight: "50dvh" }}
        >
          {project.type === "carousel" && project.slides ? (
            <CarouselMedia slides={project.slides} />
          ) : isVideo ? (
            <VideoMedia
              thumbnail={project.thumbnail}
              videoSrc={project.videoSrc}
            />
          ) : (
            <ImageMedia src={project.thumbnail} alt={project.title} />
          )}
        </div>

        {/* Info */}
        <div className="px-5 pt-4 pb-8 overflow-y-auto flex-shrink-0">
          <p className="text-[9px] uppercase tracking-[0.18em] text-white/25 mb-1">
            {project.client} · {project.year}
          </p>
          <h2 className="font-display font-bold text-xl text-white mb-3 leading-tight">
            {project.title}
          </h2>
          <p className="text-[13px] text-white/45 leading-relaxed mb-4">
            {project.description}
          </p>
          <div>
            <p className="text-[9px] uppercase tracking-[0.14em] font-semibold text-white/35 mb-2">
              Strategies Used
            </p>
            <div className="flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span
                key={s}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-pill
                           bg-white/[0.08] border border-white/[0.15] text-white/75"
              >
                {s}
              </span>
            ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Desktop dialog — near-fullscreen ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex rounded-2xl overflow-hidden items-stretch
                   bg-[#0c0c15] border border-white/[0.07]
                   shadow-[0_60px_160px_rgba(0,0,0,0.95)]"
        style={{ height: "min(85vh, 860px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media panel — width derived from height × aspect ratio */}
        <div
          className="flex-shrink-0 overflow-hidden bg-black relative h-full"
          style={{ aspectRatio: project.type === "video" ? "9/16" : "4/5" }}
        >
          {project.type === "carousel" && project.slides ? (
            <CarouselMedia slides={project.slides} />
          ) : isVideo ? (
            <VideoMedia
              thumbnail={project.thumbnail}
              videoSrc={project.videoSrc}
            />
          ) : (
            <ImageMedia src={project.thumbnail} alt={project.title} />
          )}
        </div>

        {/* Right panel */}
        <div className="w-[320px] flex-shrink-0 flex flex-col border-l border-white/[0.06] overflow-y-auto">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-7 pt-7 pb-6
                          border-b border-white/[0.06] flex-shrink-0"
          >
            <div className="flex items-center gap-2">
              <span
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-pill
                                bg-white/[0.06] border border-white/[0.09] text-[9px]
                                font-bold uppercase tracking-[0.14em]"
              >
                <Icon size={10} className={cfg.color} />
                <span className={cfg.color}>{cfg.label}</span>
              </span>
              {project.goal && (
                <span
                  className={`text-[9px] font-semibold uppercase tracking-[0.1em]
                                 px-2.5 py-1 rounded-pill border ${goalConfig[project.goal].color}`}
                >
                  {project.goal}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/[0.07] border border-white/[0.1]
                         flex items-center justify-center hover:bg-white/[0.15] transition-colors"
            >
              <X size={16} className="text-white/60" />
            </button>
          </div>

          {/* Body */}
          <div className="p-7 flex flex-col gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/25 mb-2">
                {project.client} · {project.year}
              </p>
              <h2 className="font-display font-bold text-2xl text-white leading-tight">
                {project.title}
              </h2>
            </div>

            <div className="h-px bg-white/[0.06]" />

            <p className="text-sm text-white/50 leading-relaxed">
              {project.description}
            </p>

            <div className="h-px bg-white/[0.06]" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/40 mb-3">
                Strategies Used
              </p>
              <div className="flex flex-wrap gap-2">
                {project.services.map((s) => (
                  <span
                    key={s}
                    className="text-[12px] font-semibold px-4 py-2 rounded-pill
                               bg-white/[0.08] border border-white/[0.15] text-white/80
                               hover:bg-white/[0.12] hover:text-white transition-colors duration-150"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
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
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 1400px) 75vw, 900px"
      />
    </motion.div>
  );
}

// ─── Carousel Media ───────────────────────────────────────────────────────────

function CarouselMedia({ slides }: { slides: string[] }) {
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(0);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % slides.length),
    [slides.length]
  );

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
    const endX =
      "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart.current - endX;
    if (diff > 50) next();
    else if (diff < -50) prev();
  };

  return (
    <div className="absolute inset-0 select-none">
      {/* Slide — fills entire panel */}
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
            <Image
              src={slides[index]}
              alt={`Slide ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1400px) 75vw, 900px"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Arrows — floating over image, inset from edges */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                     bg-black/50 backdrop-blur-md border border-white/10
                     hover:bg-black/70 flex items-center justify-center transition-all duration-150"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full
                     bg-black/50 backdrop-blur-md border border-white/10
                     hover:bg-black/70 flex items-center justify-center transition-all duration-150"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>

      {/* Dots + counter — floating above image at bottom */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3
                      px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
      >
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-200 ${
                i === index
                  ? "w-5 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-white/50 font-medium tabular-nums">
          {index + 1} / {slides.length}
        </span>
      </div>
    </div>
  );
}

// ─── Video Media ──────────────────────────────────────────────────────────────

function VideoMedia({
  thumbnail,
  videoSrc,
}: {
  thumbnail: string;
  videoSrc?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center p-6 h-full"
    >
      {/* Height is the constraint — width derives from 9:16 */}
      <div
        className="relative"
        style={{
          height: "min(76vh, 640px)",
          aspectRatio: "9/16",
          overflow: "hidden",
          borderRadius: "1rem",
          flexShrink: 0,
          background: "rgba(0,0,0,0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={thumbnail}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
          />
        ) : (
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            fill
            className="object-cover opacity-70"
          />
        )}

        {/* Play/pause overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={toggle}
        >
          {!playing && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20
                         flex items-center justify-center hover:bg-black/80 transition-all duration-200"
            >
              <Play size={24} className="text-white ml-1" />
            </motion.div>
          )}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div
                className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20
                               flex items-center justify-center"
              >
                <Pause size={24} className="text-white" />
              </div>
            </div>
          )}
        </div>

        {/* "Reel" label */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-pill
                        bg-black/50 backdrop-blur-md border border-white/10"
        >
          <Video size={11} className="text-accent-pink" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-pink">
            Reel
          </span>
        </div>
      </div>
    </motion.div>
  );
}
