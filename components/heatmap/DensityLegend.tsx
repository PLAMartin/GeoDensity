import { DENSITY_BANDS } from "@/data/westbridge-density";

export default function DensityLegend() {
  return (
    <div className="rounded-xl border border-surface-border bg-surface/95 px-4 py-3 shadow-card backdrop-blur-sm">
      <p className="mb-2 text-xs uppercase tracking-wide text-ink-secondary/80">
        Density (people/km²)
      </p>
      <ul className="space-y-1">
        {DENSITY_BANDS.map((band) => (
          <li key={band.band} className="flex items-center gap-2 text-xs text-ink-secondary">
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: band.colorVar }}
            />
            <span className="numeric">
              {band.min.toLocaleString("en-GB")}
              {band.max ? `–${band.max.toLocaleString("en-GB")}` : "+"}
            </span>
            <span>{band.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
