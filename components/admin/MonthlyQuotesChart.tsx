// Histogramme empilé des demandes par mois : Google Ads / autres provenances.
// Rendu serveur (HTML + CSS) : infobulle au survol et au focus clavier,
// total écrit au-dessus de chaque colonne, tableau équivalent pour les lecteurs d'écran.

export type MonthPoint = { label: string; fullLabel: string; ads: number; other: number };

// Palette validée (dataviz) : bleu / orange foncé, séparation CVD ΔE 28
const SERIES = [
  { key: "ads", label: "Google Ads", color: "#2a78d6" },
  { key: "other", label: "Autres provenances", color: "#d68910" },
] as const;

const PLOT_HEIGHT = 200; // px

export function MonthlyQuotesChart({ data }: { data: MonthPoint[] }) {
  const max = Math.max(...data.map((d) => d.ads + d.other), 0);
  // Graduation « ronde » au-dessus du maximum
  const step = max <= 5 ? 1 : max <= 20 ? 5 : max <= 50 ? 10 : Math.ceil(max / 50) * 10;
  const top = Math.max(step, Math.ceil(max / step) * step);
  const ticks = Array.from({ length: Math.floor(top / step) + 1 }, (_, i) => i * step).filter(
    (_, i, all) => all.length <= 6 || i % 2 === 0 || i === all.length - 1,
  );
  const px = (n: number) => (n / top) * PLOT_HEIGHT;

  return (
    <figure>
      {/* Légende */}
      <ul className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutral-500">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ backgroundColor: s.color }} />
            {s.label}
          </li>
        ))}
      </ul>

      <div className="relative pl-8" aria-hidden="true">
        {/* Grille (traits fins) et graduations */}
        <div className="absolute inset-x-0 top-0" style={{ height: PLOT_HEIGHT }}>
          {ticks.map((t) => (
            <div key={t} className="absolute inset-x-0 flex items-center" style={{ bottom: px(t) }}>
              <span className="w-8 -translate-y-px pr-2 text-right text-[11px] tabular-nums text-neutral-400">{t}</span>
              <span className={`h-px flex-1 ${t === 0 ? "bg-neutral-300" : "bg-neutral-100"}`} />
            </div>
          ))}
        </div>

        {/* Colonnes */}
        <div className="relative flex items-end justify-around gap-2" style={{ height: PLOT_HEIGHT }}>
          {data.map((d) => {
            const total = d.ads + d.other;
            return (
              <div key={d.label} tabIndex={0} className="group relative flex h-full flex-1 cursor-default flex-col items-center justify-end outline-none">
                {/* Zone de survol plus large que la colonne */}
                <span className="absolute inset-y-0 -inset-x-1 rounded-xl transition-colors group-hover:bg-neutral-50 group-focus-visible:bg-neutral-50 group-focus-visible:ring-2 group-focus-visible:ring-neutral-950" />
                {total > 0 && <span className="relative mb-1.5 text-xs font-medium tabular-nums text-neutral-700">{total}</span>}
                <div className="relative flex w-full max-w-6 flex-col-reverse gap-[2px]">
                  {d.ads > 0 && (
                    <span
                      className={`block w-full ${d.other > 0 ? "" : "rounded-t-[4px]"}`}
                      style={{ height: Math.max(px(d.ads) - (d.other > 0 ? 1 : 0), 2), backgroundColor: SERIES[0].color }}
                    />
                  )}
                  {d.other > 0 && (
                    <span
                      className="block w-full rounded-t-[4px]"
                      style={{ height: Math.max(px(d.other) - (d.ads > 0 ? 1 : 0), 2), backgroundColor: SERIES[1].color }}
                    />
                  )}
                </div>

                {/* Infobulle */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-44 -translate-x-1/2 rounded-2xl bg-neutral-950 p-3 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <p className="mb-2 font-medium capitalize">{d.fullLabel}</p>
                  {SERIES.map((s) => (
                    <p key={s.key} className="flex items-center justify-between gap-3 text-white/70">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-[2px]" style={{ backgroundColor: s.color }} />
                        {s.label}
                      </span>
                      <span className="font-medium tabular-nums text-white">{d[s.key]}</span>
                    </p>
                  ))}
                  <p className="mt-2 flex justify-between border-t border-white/10 pt-2 text-white/70">
                    Total <span className="font-medium tabular-nums text-white">{total}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mois */}
        <div className="mt-2 flex justify-around gap-2">
          {data.map((d) => (
            <span key={d.label} className="flex-1 text-center text-xs capitalize text-neutral-500">{d.label}</span>
          ))}
        </div>
      </div>

      {/* Données équivalentes pour les lecteurs d'écran */}
      <table className="sr-only">
        <caption>Demandes de devis par mois et par provenance</caption>
        <thead>
          <tr><th>Mois</th><th>Google Ads</th><th>Autres provenances</th><th>Total</th></tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}><td>{d.fullLabel}</td><td>{d.ads}</td><td>{d.other}</td><td>{d.ads + d.other}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
