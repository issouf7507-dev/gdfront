import Image from "next/image";

// Bandeau d'en-tête des pages publiques : même carte arrondie que le hero de l'accueil
export function PageHero({
  title,
  subtitle,
  eyebrow = "GD Couverture",
  image = "/img/hear.webp",
}: {
  title: React.ReactNode;
  subtitle?: string;
  eyebrow?: string;
  image?: string;
}) {
  return (
    <section className="bg-white px-3 pt-24 md:px-6 md:pt-28">
      <div className="relative mx-auto flex h-[min(56svh,500px)] min-h-[360px] max-w-[1400px] items-end overflow-hidden rounded-[28px] bg-neutral-900 md:rounded-[36px]">
        <Image src={image} alt="" fill sizes="(max-width: 1400px) 100vw, 1400px" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

        <div className="relative px-6 pb-10 md:px-14 md:pb-14">
          <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-[clamp(2.3rem,5.4vw,4.5rem)] font-medium leading-[1.04] tracking-tight text-white">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">{subtitle}</p>}
        </div>
      </div>
    </section>
  );
}
