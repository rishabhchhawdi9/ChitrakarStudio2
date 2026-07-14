import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type AbstractArtProject } from "../lib/abstract-data";
import { STUDIO as staticStudio } from "../lib/studio";
import { useAbstracts, useStudio } from "../lib/store";
import { Eye, ArrowRight, Maximize2, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/abstract")({
  head: () => ({
    meta: [
      { title: `Abstract Collection — ${staticStudio.name}` },
      {
        name: "description",
        content: `Explore the tactile, large-format abstract canvases of ${staticStudio.artist}. Sculpted gesso, natural pigments, and minimal styling.`,
      },
      { property: "og:title", content: `Abstract Collection — ${staticStudio.name}` },
      {
        property: "og:description",
        content: `Tactile, textured abstract collections by ${staticStudio.artist}.`,
      },
      { property: "og:url", content: "/abstract" },
    ],
    links: [{ rel: "canonical", href: "/abstract" }],
  }),
  component: AbstractPage,
});

function AbstractPage() {
  const ABSTRACT_ARTS = useAbstracts();
  const STUDIO = useStudio();

  // Track active photo index for each project by mapping project ID to active photo index
  const [projectPhotoIndices, setProjectPhotoIndices] = useState<Record<string, number>>({});

  // Lightbox State
  const [lightboxState, setLightboxState] = useState<{
    project: AbstractArtProject;
    photoIndex: number;
  } | null>(null);

  const getActivePhotoIndex = (projectId: string) => {
    return projectPhotoIndices[projectId] || 0;
  };

  const setActivePhotoIndex = (projectId: string, index: number) => {
    setProjectPhotoIndices((prev) => ({
      ...prev,
      [projectId]: index,
    }));
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxState) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const { project, photoIndex } = lightboxState;
      if (e.key === "Escape") {
        setLightboxState(null);
      } else if (e.key === "ArrowRight") {
        const nextIndex = (photoIndex + 1) % project.photos.length;
        setLightboxState({ project, photoIndex: nextIndex });
      } else if (e.key === "ArrowLeft") {
        const prevIndex = (photoIndex - 1 + project.photos.length) % project.photos.length;
        setLightboxState({ project, photoIndex: prevIndex });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxState]);

  if (ABSTRACT_ARTS.length === 0) {
    return (
      <div className="bg-background text-primary min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl mb-4">
          No Abstract Projects
        </h1>
        <p className="max-w-md opacity-80 mb-6">
          Create abstract paintings inside the Admin Dashboard to begin.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full text-xs uppercase tracking-wider font-medium"
        >
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-primary min-h-screen overflow-hidden">
      {/* 1. HERO HEADER */}
      <section className="px-6 pt-16 pb-16 md:pt-24 md:pb-20 border-b-2 border-primary/10 grain">
        <div className="mx-auto max-w-7xl text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-primary/60 mb-3 font-semibold">
            Tactile Materiality &amp; Raw Form
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-primary text-6xl md:text-8xl -rotate-1 leading-none tracking-tight">
            Abstract Space
          </h1>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-primary/80 leading-relaxed">
            A permanent long-form exhibition documenting <strong>{STUDIO.artist}'s</strong>{" "}
            experimental abstract paintings. These tactile canvases reject representative
            constraints to explore Italian gesso structures, oxide rust, soot-ash, and hand-beaten
            gold leaf.
          </p>
        </div>
      </section>

      {/* 2. LONG-SCROLLING ALTERNATING SHOWCASE */}
      <div className="py-8 space-y-32">
        {ABSTRACT_ARTS.map((project, index) => {
          const isLeftAligned = index % 2 === 0;
          const activeIndex = getActivePhotoIndex(project.id);
          const activePhoto = project.photos[activeIndex] || project.photos[0];

          return (
            <section key={project.id} className="px-6 md:px-12 relative">
              <div className="mx-auto max-w-7xl">
                {/* Visual Section Anchor / Series Header Card */}
                <div className="mb-10 flex items-center gap-3 border-b border-primary/10 pb-4">
                  <span className="font-mono text-xs text-primary/50">
                    0{index + 1} / 0{ABSTRACT_ARTS.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.25em] bg-primary/5 text-primary/70 px-3 py-1 rounded-full font-bold">
                    {project.series}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                  {/* PHOTOS BLOCK: Rendered left if left-aligned, right if right-aligned */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isLeftAligned ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    {/* Main Active Photo with Tape Accent */}
                    <div className="relative group rounded-xl border-2 border-primary/15 bg-background p-3 shadow-lg hover:shadow-xl transition-all duration-300">
                      {/* Artistic Tape Accent */}
                      <div className="tape left-1/2 -translate-x-1/2 -top-3 z-20 rotate-[-1deg]" />

                      <div
                        className="relative cursor-zoom-in aspect-[4/5] rounded-lg overflow-hidden bg-primary/5"
                        onClick={() => setLightboxState({ project, photoIndex: activeIndex })}
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${project.id}-${activeIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            src={activePhoto?.url}
                            alt={`${project.title} Viewpoint ${activeIndex + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>

                        {/* Interactive Zoom Indicator */}
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <div className="text-white flex items-center gap-2">
                            <Maximize2 className="h-4 w-4" />
                            <span className="text-[9px] uppercase tracking-widest font-bold">
                              Click to inspect surface gesso details
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Miniature Angle Selector Thumbnails */}
                    {project.photos.length > 1 && (
                      <div className="grid grid-cols-4 gap-3.5 px-1.5">
                        {project.photos.map((photo, pIdx) => {
                          const isActive = activeIndex === pIdx;
                          return (
                            <button
                              key={pIdx}
                              onClick={() => setActivePhotoIndex(project.id, pIdx)}
                              className={`group relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                                isActive
                                  ? "border-primary ring-2 ring-primary/5 shadow-md"
                                  : "border-primary/10 opacity-70 hover:opacity-100"
                              }`}
                            >
                              <img
                                src={photo.url}
                                alt="Thumbnail angle view"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute bottom-1 right-1 bg-background/95 border border-primary/10 text-[8px] font-mono px-1 rounded-sm">
                                0{pIdx + 1}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* NARRATIVE/METADATA BLOCK: Rendered opposite to the photo block */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isLeftAligned ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="space-y-1.5 text-left">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary/45 block">
                          Completed · {project.year}
                        </span>
                        <h2 className="font-[family-name:var(--font-display)] text-primary text-4xl md:text-5xl tracking-tight leading-none">
                          {project.title}
                        </h2>
                      </div>

                      {/* Display Medium & Spec metrics */}
                      <p className="text-xs uppercase tracking-[0.15em] text-primary/70 font-semibold border-b border-primary/10 pb-4 pt-1 text-left">
                        {project.medium} <span className="mx-2.5 text-primary/20">|</span>{" "}
                        {project.dimensions}
                      </p>
                    </div>

                    {/* Material narrative */}
                    <div className="space-y-4 text-left">
                      <p className="text-sm md:text-base leading-relaxed text-primary/85 whitespace-pre-line">
                        {project.description}
                      </p>

                      {activePhoto?.caption && (
                        <p className="text-xs italic text-primary/60 border-l-2 border-primary/20 pl-3.5">
                          Currently viewed angle detail: {activePhoto.caption}
                        </p>
                      )}
                    </div>

                    {/* Quick inquiry triggers */}
                    <div className="pt-6 border-t border-primary/10 text-left space-y-4">
                      <Link
                        to="/contact"
                        search={{
                          subject: `Inquiry regarding Abstract: ${project.title} (${project.series})`,
                        }}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:scale-[1.02] active:scale-[0.99] transition-all cursor-pointer shadow-md"
                      >
                        <span>Request Studio Purchase</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <p className="text-[10px] text-primary/45 tracking-wide block">
                        Ships in highly protective custom wooden crating. Worldwide dispatch.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* 3. FULLSCREEN IMMERSIVE LIGHTBOX */}
      <AnimatePresence>
        {lightboxState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxState(null)}
            className="fixed inset-0 z-[200] bg-primary/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            {/* Top Info Bar */}
            <div
              className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-primary-foreground z-10 bg-gradient-to-b from-black/30 to-transparent"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary-foreground/70">
                  {lightboxState.project.series}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-primary-foreground leading-tight">
                  {lightboxState.project.title}
                </h3>
              </div>
              <button
                onClick={() => setLightboxState(null)}
                className="h-10 w-10 rounded-full border border-primary-foreground/20 hover:border-primary-foreground text-primary-foreground flex items-center justify-center transition-all cursor-pointer text-xl"
                aria-label="Close Lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Lightbox Slider Container */}
            <div
              className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxState.photoIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  src={lightboxState.project.photos[lightboxState.photoIndex]?.url}
                  alt={`${lightboxState.project.title} zoom`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-primary-foreground/10 shadow-2xl bg-black/10"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slider Left Arrow */}
              {lightboxState.project.photos.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const prevIndex =
                        (lightboxState.photoIndex - 1 + lightboxState.project.photos.length) %
                        lightboxState.project.photos.length;
                      setLightboxState({ ...lightboxState, photoIndex: prevIndex });
                    }}
                    className="absolute left-6 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none"
                    aria-label="Previous view"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIndex =
                        (lightboxState.photoIndex + 1) % lightboxState.project.photos.length;
                      setLightboxState({ ...lightboxState, photoIndex: nextIndex });
                    }}
                    className="absolute right-6 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none"
                    aria-label="Next view"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Caption and Progress Indicators */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent text-center text-primary-foreground space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {lightboxState.project.photos[lightboxState.photoIndex]?.caption && (
                <p className="text-xs max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed font-sans px-4">
                  {lightboxState.project.photos[lightboxState.photoIndex].caption}
                </p>
              )}

              {/* Progress dots inside Lightbox */}
              {lightboxState.project.photos.length > 1 && (
                <div className="flex justify-center gap-2">
                  {lightboxState.project.photos.map((_, index) => {
                    const isActive = lightboxState.photoIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setLightboxState({ ...lightboxState, photoIndex: index })}
                        className={`h-1.5 rounded-full transition-all cursor-pointer ${
                          isActive ? "w-6 bg-primary-foreground" : "w-1.5 bg-primary-foreground/40"
                        }`}
                        aria-label={`Go to photo ${index + 1}`}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
