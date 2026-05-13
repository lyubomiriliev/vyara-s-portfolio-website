"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Play } from "lucide-react";
import { projects, projectCategories } from "@/data/projects";
import type { Project } from "@/data/projects";
import { scaleIn } from "@/lib/animations";
import ContentModal, { typeConfig } from "@/components/ui/ContentModal";
import ProjectsPage from "@/components/pages/ProjectsPage";
import { useLang } from "@/lib/LanguageContext";

type Category = (typeof projectCategories)[number] | "Custom Websites" | "E-Commerce";

const STORAGE_KEY = "work-filter";

// CSS columns fills top-to-bottom per column, so with 4 columns:
// visual row N = items at flat indices [N*4, N*4+1, N*4+2, N*4+3].
// Pick exactly 1 video from each group of 4 to autoplay.
// Use the group's row number as a stable seed so the pick never changes on re-render.
function buildAutoplayIds(
  list: { id: string; type: string; videoSrc?: string }[],
): Set<string> {
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
  const { t } = useLang();
  const wf = t.workFilters;
  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Category | null;
      const allCategories: string[] = [...projectCategories, "Custom Websites", "E-Commerce"];
      if (saved && allCategories.includes(saved)) {
        setActiveFilter(saved);
      }
    } catch {}
  }, []);

  const handleFilterChange = useCallback((cat: Category) => {
    setActiveFilter(cat);
    try {
      localStorage.setItem(STORAGE_KEY, cat);
    } catch {}
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const videoList = useMemo(
    () => filtered.filter((p) => p.type === "video" || !!p.videoSrc),
    [filtered],
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

  const navigateVideo = useCallback(
    (dir: 1 | -1) => {
      setSelectedProject((cur) => {
        if (!cur) return cur;
        const idx = videoList.findIndex((p) => p.id === cur.id);
        if (idx === -1) return cur;
        return (
          videoList[(idx + dir + videoList.length) % videoList.length] ?? cur
        );
      });
    },
    [videoList],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (!selectedProject) return;
      const isVid =
        selectedProject.type === "video" || !!selectedProject.videoSrc;
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

  const isWebFilter = activeFilter === "Custom Websites" || activeFilter === "E-Commerce";

  return (
    <div className="relative bg-bg-primary">
      <section className="section-padding">
        {/* Filter bar — always centred */}
        <div className="mb-14 flex flex-wrap justify-center items-end gap-4 sm:gap-6 px-4 overflow-x-auto">
          {/* Social & Content group */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
              {wf.socialContent}
            </span>
            <div
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {projectCategories.map((cat) => {
                const label: Record<string, string> = {
                  All: wf.all, Visual: wf.visual, Reels: wf.reels, AI: wf.ai, Print: wf.print,
                };
                return (
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
                    {label[cat] ?? cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Web Development group */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30">
              {wf.webDevelopment}
            </span>
            <div
              className="relative inline-flex items-center gap-1 p-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {(["Custom Websites", "E-Commerce"] as const).map((cat) => {
                const label: Record<string, string> = {
                  "Custom Websites": wf.customWebsites,
                  "E-Commerce": wf.ecommerce,
                };
                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className="relative z-10 py-2 px-5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                    style={{ color: activeFilter === cat ? "#fff" : "rgba(255,255,255,0.45)" }}
                  >
                    {activeFilter === cat && (
                      <motion.span
                        layoutId="work-filter-pill-web"
                        className="absolute inset-0 rounded-full z-[-1]"
                        style={{ background: "linear-gradient(135deg, #FFB76C, #FF419D)" }}
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    {label[cat]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        {isWebFilter ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectsPage webFilter={activeFilter === "Custom Websites" ? "custom" : "ecommerce"} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 3xl:columns-5 gap-3"
              >
                {filtered.map((project, i) => (
                  <FeedCard
                    key={project.id}
                    project={project}
                    index={i}
                    autoplay={project.category === "Reels" || autoplayIds.has(project.id)}
                    onClick={() => openModal(project)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

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
        )}
      </section>
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
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [inView, setInView] = useState(false);

  // Track when the card enters the viewport so autoplay works for off-screen items
  useEffect(() => {
    const el = videoRef.current;
    if (!el || !autoplay) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { rootMargin: "0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [autoplay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered || (autoplay && inView)) {
      v.play().catch(() => {});
    } else if (!autoplay && !hovered) {
      v.pause();
    }
  }, [hovered, autoplay, inView]);

  const isPlaying = hovered || (autoplay && inView);
  const showDim = isVideo && !isPlaying;

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
              onLoadedData={() => setVideoLoaded(true)}
            />
            {!videoLoaded && (
              <div className="absolute inset-0 z-30 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              </div>
            )}
            {/* Dim overlay */}
            <div
              className="absolute inset-0 z-10 transition-opacity duration-300"
              style={{
                background: "rgba(0,0,0,0.45)",
                opacity: showDim ? 1 : 0,
                pointerEvents: "none",
              }}
            />
            {/* Centered play icon */}
            <div
              className="absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300"
              style={{
                opacity: showDim && videoLoaded ? 1 : 0,
                pointerEvents: "none",
              }}
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
          <span
            className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${cfg.color}`}
          >
            {cfg.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
