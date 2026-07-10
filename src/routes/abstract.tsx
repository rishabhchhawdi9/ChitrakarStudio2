import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type AbstractArtProject } from "../lib/abstract-data";
import { STUDIO as staticStudio } from "../lib/studio";
import { useAbstracts, useStudio } from "../lib/store";
import { Eye, ArrowRight, Maximize2, Sparkles } from "lucide-react";

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

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [zoomPhotoIndex, setZoomPhotoIndex] = useState<number>(0);

  // Auto-resolve current project safely
  const selectedProject = useMemo(() => {
    if (!ABSTRACT_ARTS || ABSTRACT_ARTS.length === 0) return null;
    const found = ABSTRACT_ARTS.find((p) => p.id === selectedProjectId);
    return found || ABSTRACT_ARTS[0];
  }, [ABSTRACT_ARTS, selectedProjectId]);

  // When selected project changes, reset the active photo index
  useEffect(() => {
    setActivePhotoIndex(0);
  }, [selectedProject?.id]);

  // Handle keyboard navigation for the lightbox
  useEffect(() => {
    if (!lightboxOpen || !selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowRight") {
        setZoomPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
      } else if (e.key === "ArrowLeft") {
        setZoomPhotoIndex(
          (prev) => (prev - 1 + selectedProject.photos.length) % selectedProject.photos.length,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, selectedProject]);

  const openLightbox = (index: number) => {
    setZoomPhotoIndex(index);
    setLightboxOpen(true);
  };

  if (!selectedProject) {
    return (
      <div className="bg-background text-primary min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl mb-4">
          No Abstract Projects
        </h1>
        <p className="max-w-md opacity-80 mb-6">
          Create your first abstract series inside the Admin Dashboard.
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
    <div className="bg-background text-primary min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16 border-b border-primary/10">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-3 font-semibold">
            Tactile Materiality &amp; Space
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl leading-none tracking-tight">
                Abstract Arts
              </h1>
              <p className="mt-4 max-w-2xl text-sm md:text-base text-primary/70 leading-relaxed">
                A dedicated gallery space exploring <strong>{STUDIO.artist}'s</strong> experimental
                abstract practice. Large-format canvases featuring sculpted gesso structures, raw
                mineral pigments, and deep, quiet conceptual space.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MAIN WORKSPACE */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Series selector bar */}
          <div className="flex flex-nowrap overflow-x-auto gap-3 pb-3 mb-10 border-b border-primary/5 scrollbar-none">
            {ABSTRACT_ARTS.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProjectId(proj.id)}
                  className={`px-5 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] border cursor-pointer transition-all shrink-0 font-semibold ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "border-primary/10 text-primary/70 hover:border-primary/40 hover:bg-primary/5"
                  }`}
                >
                  {proj.series}
                </button>
              );
            })}
          </div>

          {/* Active Series Presentation Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* LEFT SIDE - Elegant Artwork Display */}
            <div className="lg:col-span-6 space-y-6">
              {/* Main Artwork Container */}
              <div className="relative group overflow-hidden rounded-xl border border-primary/10 bg-card shadow-sm transition-all duration-300">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedProject.id}-${activePhotoIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative cursor-zoom-in aspect-[4/5] flex items-center justify-center overflow-hidden"
                    onClick={() => openLightbox(activePhotoIndex)}
                  >
                    <img
                      src={selectedProject.photos[activePhotoIndex]?.url}
                      alt={`${selectedProject.title} — ${selectedProject.photos[activePhotoIndex]?.caption || ""}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-101"
                      referrerPolicy="no-referrer"
                    />

                    {/* Simple Overlay Indicator */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex items-end p-4">
                      <div className="text-white flex items-center gap-2">
                        <Maximize2 className="h-4 w-4" />
                        <span className="text-[10px] uppercase tracking-widest font-semibold">
                          Click to zoom canvas details
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Multi-angle photographic thumbnails (only if multiple photos exist) */}
              {selectedProject.photos.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {selectedProject.photos.map((photo, index) => {
                    const isActive = activePhotoIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActivePhotoIndex(index)}
                        className={`group relative aspect-[4/3] rounded-lg overflow-hidden border transition-all cursor-pointer ${
                          isActive
                            ? "border-primary ring-2 ring-primary/5"
                            : "border-primary/10 opacity-70 hover:opacity-100"
                        }`}
                        title={photo.caption}
                      >
                        <img
                          src={photo.url}
                          alt={`Thumbnail viewpoint ${index + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute bottom-1 right-1 bg-background/80 text-[8px] font-mono px-1 rounded border border-primary/5">
                          0{index + 1}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT SIDE - Minimal Metadata & Conceptual Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-primary/50 block">
                  {selectedProject.series} · {selectedProject.year}
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-primary text-4xl md:text-5xl tracking-tight leading-tight">
                  {selectedProject.title}
                </h2>

                {/* Single, Beautifully Styled Subtitle Line for Metadata */}
                <p className="text-sm font-medium text-primary/80 border-b border-primary/10 pb-4 pt-1">
                  {selectedProject.medium} <span className="mx-2 text-primary/30">|</span>{" "}
                  {selectedProject.dimensions}
                </p>
              </div>

              {/* Conceptual Narrative */}
              <div className="space-y-4">
                <p className="text-sm md:text-base leading-relaxed text-primary/80">
                  {selectedProject.description}
                </p>

                {selectedProject.photos[activePhotoIndex]?.caption && (
                  <p className="text-xs italic text-primary/60 border-l-2 border-primary/10 pl-3">
                    Currently viewing: {selectedProject.photos[activePhotoIndex].caption}
                  </p>
                )}
              </div>

              {/* Call to action: Clean direct inquiry link */}
              <div className="pt-6 border-t border-primary/10 space-y-4">
                <Link
                  to="/contact"
                  search={{
                    subject: `Inquiry regarding ${selectedProject.title} (${selectedProject.series})`,
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                >
                  <span>Inquire About This Canvas</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <p className="text-[11px] text-primary/40">
                  Shipped globally inside heavy wooden protection crates. Certificate of
                  authenticity included.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FULLSCREEN IMMERSIVE LIGHTBOX */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center cursor-zoom-out"
          >
            {/* Top Close bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
                  {selectedProject.series}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-left">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="h-10 w-10 rounded-full border border-white/20 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer text-xl"
                aria-label="Close lightbox"
              >
                ×
              </button>
            </div>

            {/* Main Interactive Zoom Image */}
            <div
              className="relative max-w-5xl w-full max-h-[75vh] flex items-center justify-center px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={zoomPhotoIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  src={selectedProject.photos[zoomPhotoIndex]?.url}
                  alt="Zoomed Art View"
                  className="max-w-full max-h-[70vh] object-contain rounded-lg border border-white/10 shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Slider Left Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomPhotoIndex(
                    (prev) =>
                      (prev - 1 + selectedProject.photos.length) % selectedProject.photos.length,
                  );
                }}
                className="absolute left-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none text-xl"
                aria-label="Previous image"
              >
                ‹
              </button>

              {/* Slider Right Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
                }}
                className="absolute right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-colors cursor-pointer select-none text-xl"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* Bottom Caption details */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-center text-white space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedProject.photos[zoomPhotoIndex]?.caption && (
                <p className="text-xs max-w-2xl mx-auto text-white/80 leading-relaxed font-sans px-4">
                  {selectedProject.photos[zoomPhotoIndex].caption}
                </p>
              )}

              {/* Lightbox Mini Picker indicators */}
              <div className="flex justify-center gap-2">
                {selectedProject.photos.map((_, index) => {
                  const isActive = zoomPhotoIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setZoomPhotoIndex(index)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${isActive ? "w-6 bg-white" : "w-1.5 bg-white/35"}`}
                      aria-label={`Go to photo ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
