import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { type Work } from "../../lib/works";
import { useStudio } from "../../lib/store";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface FeaturedCarouselProps {
  items: Work[];
}

export function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const STUDIO = useStudio();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (isHovered || !containerRef.current || items.length === 0) return;

    const interval = setInterval(() => {
      const container = containerRef.current;
      if (!container) return;

      const cardWidth = container.clientWidth * 0.8;
      const nextScrollLeft = container.scrollLeft + cardWidth;

      // If we've reached the end, scroll back to the start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollTo({ left: nextScrollLeft, behavior: "smooth" });
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, items.length]);

  // Track active index based on scroll position
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;

    // Calculate which item is closest to the center or start
    const cardWidth = scrollWidth / items.length;
    const newIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.round(scrollLeft / (clientWidth * 0.7))),
    );

    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const scrollAmount = isMobile
      ? index * container.clientWidth
      : index * (container.clientWidth * 0.4);

    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % items.length;
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + items.length) % items.length;
    scrollToIndex(prevIndex);
  };

  return (
    <div
      className="relative w-full overflow-hidden py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scrollable strip with snap alignment */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-none snap-x snap-mandatory gap-8 px-6 md:px-24 pb-12 pt-6 select-none"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {items.map((w, i) => {
          const isActive = activeIndex === i;

          // Creative styling: varying dimensions and rotations to look like a studio pinboard
          const rotations = ["-1.5deg", "1deg", "-2deg", "1.5deg", "-0.5deg", "2deg"];
          const rotation = rotations[i % rotations.length];

          // Alternate dimensions (tall, standard, squareish)
          const aspectRatios = ["aspect-[4/5]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]"];
          const aspect = aspectRatios[i % aspectRatios.length];

          // Tape placement
          const tapes = [
            <div key="t1" className="tape left-1/2 -translate-x-1/2 -top-3 z-10 rotate-[-1deg]" />,
            <div key="t2" className="tape left-4 -top-3 z-10 rotate-[-12deg]" />,
            null,
            <div key="t3" className="tape right-4 -top-3 z-10 rotate-[8deg]" />,
          ];
          const tape = tapes[i % tapes.length];

          return (
            <motion.div
              key={w.id}
              className={`flex-none w-[80vw] sm:w-[50vw] md:w-[35vw] lg:w-[28vw] snap-center relative`}
              animate={{
                scale: isActive ? 1.03 : 0.96,
                opacity: isActive ? 1 : 0.75,
              }}
              transition={{ duration: 0.4 }}
              style={{
                transform: `rotate(${rotation})`,
              }}
            >
              {/* Pinboard board theme card */}
              <div className="relative group rounded-xl border-2 border-primary/20 bg-background p-3 md:p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
                {/* Taped accent */}
                {tape}

                {/* Torn paper feel or styled photo holder */}
                <div className={`relative overflow-hidden rounded-lg bg-primary/5 ${aspect}`}>
                  <img
                    src={w.url}
                    alt={`${w.title} — ${w.category} by ${STUDIO.name}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Info Overlay / Caption */}
                <div className="mt-4 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/50">
                    {w.category}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-primary text-xl mt-1 leading-tight">
                    {w.title}
                  </h3>
                  <p className="text-xs text-primary/70 mt-1 line-clamp-2 leading-relaxed">
                    {w.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="mx-auto max-w-7xl px-6 md:px-24 flex items-center justify-between gap-6 mt-4">
        {/* Progress dots */}
        <div className="flex gap-2.5">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? "w-8 bg-primary" : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Left/Right Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary text-primary flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous artwork"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="h-10 w-10 rounded-full border-2 border-primary/20 hover:border-primary text-primary flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next artwork"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
