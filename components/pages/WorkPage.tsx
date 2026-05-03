"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import type { Project } from "@/data/projects";
import { scaleIn } from "@/lib/animations";
import ContentModal, { typeConfig } from "@/components/ui/ContentModal";

type Category = (typeof projectCategories)[number];

const STORAGE_KEY = "work-filter";

// CSS columns fills top-to-bottom per column, so with 4 columns:
// visual row N = items at flat indices [N*4, N*4+1, N*4+2, N*4+3].
// Pick exactly 1 video from each group of 4 to autoplay.
// Use the group's row number as a stable seed so the pick never changes on re-render.
function buildAutoplayIds(list: { id: string; type: string; videoSrc?: string }[]): Set<string> {
  const ids = new Set<string>();
  const rowCount = Math.ceil(list.length / 4);
  for (let row = 0; row < rowCount; row++) {
    const group = list.slice(row * 4, row * 4 + 4);
    const videos = group.filter((p) => p.type === "video" || !!p.videoSrc);
    if (videos.length === 0) continue;
    // Deterministic pick per row: hash the row index into [0, videos.length)
    const seed = ((row * 2654435761) >>> 0) % videos.length;
    ids.add(videos[seed].id);
  }
  return ids;
}

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Category | null;
      if (saved && (projectCategories as readonly string[]).includes(saved)) {
        setActiveFilter(saved);
      }
    } catch {}
  }, []);

  const handleFilterChange = useCallback((cat: Category) => {
    setActiveFilter(cat);
    try { localStorage.setItem(STORAGE_KEY, cat); } catch {}
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const videoList = useMemo(
    () => filtered.filter((p) => p.type === "video" || !!p.videoSrc),
    [filtered]
  );

  const autoplayIds = useMemo(() => buildAutoplayIds(filtered), [filtered]);


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

  const navigateVideo = useCallback((dir: 1 | -1) => {
    setSelectedProject((cur) => {
      if (!cur) return cur;
      const idx = videoList.findIndex((p) => p.id === cur.id);
      if (idx === -1) return cur;
      return videoList[(idx + dir + videoList.length) % videoList.length] ?? cur;
    });
  }, [videoList]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (!selectedProject) return;
      const isVid = selectedProject.type === "video" || !!selectedProject.videoSrc;
      if (isVid && e.key === "ArrowLeft") navigateVideo(-1);
      if (isVid && e.key === "ArrowRight") navigateVideo(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeModal, navigateVideo, selectedProject]);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="relative bg-bg-primary">
      <section className="section-padding">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Filter bar */}
          <div className="mb-14 flex justify-center">
            <div
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange(cat)}
                  className="relative z-10 py-2 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  style={{ color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.45)" }}
                >
                  {activeFilter === cat && (
                    <motion.span
                      layoutId="work-filter-pill"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ background: "linear-gradient(135deg, #FFB76C, #FF419D)" }}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry feed */}
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
                  autoplay={autoplayIds.has(project.id)}
                  onClick={() => openModal(project)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ContentModal
            project={selectedProject}
            onClose={closeModal}
            onPrev={() => navigateVideo(-1)}
            onNext={() => navigateVideo(1)}
            isVideo={selectedProject.type === "video" || !!selectedProject.videoSrc}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Feed Card ────────────────────────────────────────────────────────────────

function FeedCard({
  project,
  index,
  autoplay,
  onClick,
}: {
  project: Project;
  index: number;
  autoplay: boolean;
  onClick: () => void;
}) {
  const cfg = typeConfig[project.type];
  const Icon = cfg.icon;
  const isVideo = project.type === "video" || !!project.videoSrc;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered || autoplay) { v.play().catch(() => {}); }
    else { v.pause(); }
  }, [hovered, autoplay]);

  const showDim = isVideo && !autoplay && !hovered;

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3) }}
      className="break-inside-avoid mb-3 group relative cursor-pointer rounded-2xl overflow-hidden"
      onClick={onClick}
      onMouseEnter={() => isVideo && setHovered(true)}
      onMouseLeave={() => isVideo && setHovered(false)}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
      >
        {isVideo && project.videoSrc ? (
          <div className="relative w-full aspect-[9/16] bg-white/[0.04]">
            <video
              ref={videoRef}
              src={project.videoSrc}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              suppressHydrationWarning
            />
            {/* Dim overlay */}
            <div
              className="absolute inset-0 z-10 transition-opacity duration-300"
              style={{ background: "rgba(0,0,0,0.45)", opacity: showDim ? 1 : 0, pointerEvents: "none" }}
            />
            {/* Centered play icon */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300"
              style={{ opacity: showDim ? 1 : 0, pointerEvents: "none" }}
            >
              <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play size={20} className="text-white ml-1" />
              </div>
            </div>
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
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-black/55 backdrop-blur-md border border-white/10">
          <Icon size={11} className={cfg.color} />
          <span className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${cfg.color}`}>{cfg.label}</span>
        </div>

        {/* Hover overlay — static only */}
        {!isVideo && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-end p-4 z-10">
            <h3 className="font-display font-bold text-sm text-white leading-snug">{project.title}</h3>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
