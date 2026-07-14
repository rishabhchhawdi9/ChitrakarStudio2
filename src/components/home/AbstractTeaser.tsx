import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useAbstracts, useStudio } from "../../lib/store";

export function AbstractTeaser() {
  const ABSTRACT_ARTS = useAbstracts();
  const STUDIO = useStudio();
  const [activeCard, setActiveCard] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredArts = ABSTRACT_ARTS.slice(0, 3);

  // Auto-rotate every 4 seconds unless hovered
  useEffect(() => {
    if (isHovered || featuredArts.length <= 1) return;

    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % featuredArts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered, featuredArts.length]);

  if (featuredArts.length === 0) return null;

  return (
    <section
      className="px-6 py-24 bg-card border-y-2 border-primary/10 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic background blur badge */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/2 opacity-40 blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Text and Context */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-primary/70 font-semibold">
              New Exhibition Launch
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-primary text-5xl md:text-7xl -rotate-1 leading-none tracking-tight">
              Abstract Series
            </h2>
            <p className="text-base md:text-lg text-primary/80 leading-relaxed">
              Step away from representative walls and delve into raw, physical materiality. Our
              newly published dedicated space showcases {STUDIO.artist}'s experimental abstract
              paintings — featuring hand-troweled Italian marble dust, custom oxide-pigments,
              soot-ash, and precious metals.
            </p>
            <p className="text-sm text-primary/70 leading-relaxed">
              Each piece is documented across multiple photographic states, including direct studio
              lights, physical gesso textures, and actual living-space installations.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-start gap-4">
              <Link
                to="/abstract"
                className="inline-flex items-center gap-3 px-8 py-3 bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-[0.25em] rounded-full hover:scale-105 transition-transform cursor-pointer shadow-sm"
              >
                Explore Abstract Space <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Swappable Visual Stack */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[480px] md:min-h-[520px] pt-12 lg:pt-0">
            {/* The Overlapping Deck */}
            <div className="relative w-full max-w-[320px] md:max-w-[350px] aspect-[4/5] flex items-center justify-center">
              {featuredArts.map((art, index) => {
                const photos = art.photos || [];
                if (photos.length === 0) return null;

                // Determine ordering, scale, z-index and rotation offsets dynamically based on the active card
                const isFront = activeCard === index;

                // Index relative to the active card (0 = front, 1 = middle, 2 = back)
                const relativePos =
                  (index - activeCard + featuredArts.length) % featuredArts.length;

                let zIndex = 10;
                let rotate = "0deg";
                let scale = 1;
                let xOffset = "0px";
                let yOffset = "0px";

                if (relativePos === 0) {
                  zIndex = 30;
                  rotate = "2deg";
                  scale = 1.02;
                  xOffset = "0px";
                  yOffset = "0px";
                } else if (relativePos === 1) {
                  zIndex = 20;
                  rotate = "-6deg";
                  scale = 0.94;
                  xOffset = "25px";
                  yOffset = "10px";
                } else {
                  zIndex = 10;
                  rotate = "8deg";
                  scale = 0.88;
                  xOffset = "-25px";
                  yOffset = "-10px";
                }

                return (
                  <motion.div
                    key={art.id}
                    layout
                    style={{ zIndex }}
                    animate={{
                      scale,
                      rotate,
                      x: xOffset,
                      y: yOffset,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 18,
                    }}
                    onClick={() => setActiveCard(index)}
                    className={`absolute inset-0 rounded-2xl border-2 border-primary/25 bg-background p-3.5 shadow-xl cursor-pointer select-none`}
                  >
                    {/* Tape Accent on front card */}
                    {isFront && (
                      <div className="tape left-1/2 -translate-x-1/2 -top-3.5 z-40 rotate-[-1.5deg]" />
                    )}

                    <div className="relative w-full h-full flex flex-col">
                      <div className="relative flex-1 rounded-lg overflow-hidden bg-primary/5">
                        <img
                          src={photos[0].url}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          draggable={false}
                        />
                      </div>
                      <div className="mt-4 text-left">
                        <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-primary/40 block">
                          {art.series}
                        </span>
                        <p className="font-[family-name:var(--font-display)] text-lg text-primary leading-tight mt-0.5">
                          {art.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination / Controls underneath */}
            <div className="mt-8 flex gap-2.5 z-40 relative">
              {featuredArts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCard(index)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    activeCard === index
                      ? "w-8 bg-primary"
                      : "w-2.5 bg-primary/25 hover:bg-primary/45"
                  }`}
                  aria-label={`Show abstract card ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
