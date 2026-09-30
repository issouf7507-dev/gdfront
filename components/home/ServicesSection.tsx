"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { serviceLandings } from "@/lib/services";
import { Reveal, RevealItem } from "./motion";

// Carrousel horizontal (scroll-snap natif) piloté par les flèches
export function ServicesSection() {
  const track = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const frame = requestAnimationFrame(updateEdges);
    window.addEventListener("resize", updateEdges);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateEdges);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.clientWidth + 16), behavior: "smooth" });
  };

  const arrow =
    "flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30";

  return (
    <section id="services" className="scroll-mt-20 bg-white py-20 md:py-28">
      <Reveal className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-6 md:mb-12 md:px-8">
        <RevealItem>
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Nos métiers
          </p>
          <h2 className="text-3xl font-medium tracking-tight text-neutral-950 md:text-4xl">Les services que nous proposons</h2>
        </RevealItem>
        <RevealItem className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={edges.start}
            aria-label="Services précédents"
            className={`${arrow} border-neutral-300 text-neutral-950 hover:border-neutral-950`}
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={edges.end}
            aria-label="Services suivants"
            className={`${arrow} border-neutral-950 bg-neutral-950 text-white hover:bg-brand hover:border-brand`}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </RevealItem>
      </Reveal>

      <div
        ref={track}
        onScroll={updateEdges}
        className="snap-x snap-mandatory scroll-pl-6 overflow-x-auto scroll-smooth md:scroll-pl-8 xl:scroll-pl-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Marges alignées sur le conteneur max-w-7xl */}
        <ul className="flex w-max gap-4 px-6 md:px-8 xl:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]">
          {serviceLandings.map((s, i) => (
            <li key={s.slug} className="w-[78vw] max-w-[300px] shrink-0 snap-start sm:w-[300px]">
              <Link href={`/services/${s.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-100">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="300px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-950 backdrop-blur">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-medium text-neutral-950 transition-colors group-hover:text-brand">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{s.subtitle}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
