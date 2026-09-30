"use client";
import { LazyMotion } from "motion/react";

const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

// Les composants animés du site utilisent `m.*` (léger) au lieu de `motion.*` :
// le moteur d'animation arrive après le premier affichage.
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
