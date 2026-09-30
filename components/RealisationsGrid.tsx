"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RealisationCard } from "@/components/RealisationCard";

export type RealisationItem = {
  id: string;
  slug: string;
  title: string;
  service: string;
  serviceLabel: string;
  location: string | null;
  image: { src: string; alt: string } | null;
};

const EASE = [0.22, 1, 0.36, 1] as const;

// Grille des réalisations avec filtre par métier (le filtre n'apparaît que s'il y a plusieurs métiers)
export function RealisationsGrid({ items }: { items: RealisationItem[] }) {
  const [filter, setFilter] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const filters = [...new Map(items.map((r) => [r.service, r.serviceLabel])).entries()];
  const visible = filter ? items.filter((r) => r.service === filter) : items;

  const chip = (active: boolean) =>
    `cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active ? "bg-neutral-950 text-white" : "border border-neutral-200 text-neutral-700 hover:border-neutral-950 hover:text-neutral-950"
    }`;

  return (
    <>
      {filters.length > 1 && (
        <div role="group" aria-label="Filtrer par métier" className="mb-10 flex flex-wrap gap-2">
          <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)} className={chip(filter === null)}>
            Tous <span className="opacity-50">{items.length}</span>
          </button>
          {filters.map(([service, label]) => (
            <button
              key={service}
              type="button"
              aria-pressed={filter === service}
              onClick={() => setFilter(service)}
              className={chip(filter === service)}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      <motion.ul layout={!reduce} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((r) => (
            <motion.li
              key={r.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <RealisationCard {...r} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
