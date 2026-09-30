"use client";
import { animate, m, useInView, useReducedMotion, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { openQuoteModal } from "@/lib/quote-modal";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Conteneur qui déclenche l'apparition en cascade de ses <RevealItem> à l'entrée dans le viewport
export function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      variants={containerVariants}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </m.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <m.div className={className} variants={itemVariants}>
      {children}
    </m.div>
  );
}

// Compteur animé de 0 à `to` quand il devient visible
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.6, ease: EASE, onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

export function QuoteButton({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button type="button" onClick={openQuoteModal} className={className}>
      {children}
    </button>
  );
}
