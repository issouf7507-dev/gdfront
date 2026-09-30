// Répartition horizontale (une seule série, valeurs écrites en texte)
export function BarList({ items, emptyText = "Aucune donnée pour cette période." }: {
  items: { label: string; value: number }[];
  emptyText?: string;
}) {
  const max = Math.max(...items.map((i) => i.value), 0);
  const total = items.reduce((sum, i) => sum + i.value, 0);
  if (max === 0) return <p className="py-10 text-center text-sm text-neutral-400">{emptyText}</p>;

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.label} title={`${item.label} : ${item.value}`}>
          <div className="mb-2 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-neutral-700">{item.label}</span>
            <span className="shrink-0 tabular-nums">
              <span className="font-medium text-neutral-950">{item.value}</span>
              <span className="ml-1.5 text-xs text-neutral-400">{Math.round((item.value / total) * 100)} %</span>
            </span>
          </div>
          <div className="h-2 rounded-full bg-neutral-100">
            <div
              className="h-2 rounded-full bg-brand"
              style={{ width: `${Math.max((item.value / max) * 100, item.value > 0 ? 2 : 0)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
