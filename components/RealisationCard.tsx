import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

type Props = {
  slug: string;
  title: string;
  serviceLabel: string;
  location: string | null;
  image: { src: string; alt: string } | null;
};

// Même tuile que la mosaïque « Réalisations » de l'accueil
export function RealisationCard({ slug, title, serviceLabel, location, image }: Props) {
  return (
    <Link href={`/realisations/${slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-3xl bg-neutral-900">
      {image && (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-neutral-950 backdrop-blur">
        {serviceLabel}
      </span>
      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
        <ArrowUpRight className="h-5 w-5" />
      </span>
      <div className="absolute inset-x-5 bottom-5 text-white">
        <h3 className="text-lg font-medium leading-snug">{title}</h3>
        {location && (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-white/70">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </p>
        )}
      </div>
    </Link>
  );
}
