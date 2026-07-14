import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useWorks } from "../../lib/store";
import { ArrowRight, Sparkles } from "lucide-react";

export function ExclusiveSection() {
  const works = useWorks();
  const exclusiveItems = works.filter((w) => w.exclusive).slice(0, 5);

  if (exclusiveItems.length === 0) return null;

  return (
    <section className="px-6 py-24 bg-card border-t border-primary/10 overflow-hidden relative">
      {/* Torn paper divider effect or background decoration */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl relative">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-primary/70 mb-3 font-semibold">
            <Sparkles className="h-4 w-4 animate-pulse text-primary/70" />
            <span>Bespoke Masterpieces</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-primary text-5xl md:text-7xl -rotate-1 leading-none tracking-tight">
            Exclusive &amp; On-Demand
          </h2>
          <p className="mt-4 text-base md:text-lg text-primary/80 max-w-2xl leading-relaxed">
            Highly tactile, specialized creations combining hardwood carpentry, hand-poured epoxy
            resin, dynamic fiber structures, and metal foils. Crafted individually on commission.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Item 1: Featured Large (spanning 7 cols) */}
          {exclusiveItems[0] && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 rounded-2xl border-2 border-primary/20 bg-background relative overflow-hidden group shadow-lg"
            >
              {/* Tape Accent */}
              <div className="tape left-10 -top-3 z-10 rotate-[-4deg]" />

              <div className="space-y-6">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-primary/5">
                  <img
                    src={exclusiveItems[0].url}
                    alt={exclusiveItems[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/50 block">
                    {exclusiveItems[0].category} · Signature Piece
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-primary text-3xl md:text-4xl leading-tight">
                    {exclusiveItems[0].title}
                  </h3>
                  <p className="text-sm md:text-base text-primary/80 leading-relaxed max-w-xl">
                    {exclusiveItems[0].caption}
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                <span className="text-xs uppercase tracking-widest text-primary/60 font-semibold">
                  Custom sizes on order
                </span>
                <Link
                  to="/contact"
                  search={{
                    subject: `Commission inquiry for ${exclusiveItems[0].title}`,
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold text-xs uppercase tracking-[0.2em] rounded-full hover:opacity-95 transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  Enquire About Piece <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Items 2 & 3: Stacked Smaller (spanning 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {exclusiveItems.slice(1, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="flex-1 flex flex-col justify-between p-5 rounded-xl border border-primary/15 bg-background relative overflow-hidden group shadow-md"
              >
                {/* Tape Accent */}
                <div className="tape right-12 -top-3 z-10 rotate-[6deg]" />

                <div className="flex gap-4 items-start sm:items-center">
                  <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-lg overflow-hidden shrink-0 bg-primary/5">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="space-y-1 text-left min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-primary/45 block">
                      {item.category}
                    </span>
                    <h4 className="font-[family-name:var(--font-display)] text-primary text-xl truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-primary/70 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-primary/10 flex items-center justify-between gap-3 mt-4">
                  <span className="text-[10px] uppercase tracking-wider text-primary/50">
                    Exclusive Selection
                  </span>
                  <Link
                    to="/contact"
                    search={{
                      subject: `Commission inquiry for ${item.title}`,
                    }}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:opacity-75 flex items-center gap-1.5"
                  >
                    <span>Enquire</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Extra items (if available) */}
        {exclusiveItems.length > 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {exclusiveItems.slice(3, 5).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-5 p-4 rounded-xl border border-primary/15 bg-background group shadow-sm"
              >
                <div className="h-20 w-20 rounded-md overflow-hidden bg-primary/5 shrink-0">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-primary/40 block">
                    {item.category}
                  </span>
                  <h4 className="font-[family-name:var(--font-display)] text-lg text-primary truncate">
                    {item.title}
                  </h4>
                  <Link
                    to="/contact"
                    search={{
                      subject: `Commission inquiry for ${item.title}`,
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold text-primary hover:opacity-70 mt-1 inline-flex items-center gap-1"
                  >
                    Send inquiry <ArrowRight className="h-2.5 w-2.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
