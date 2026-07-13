import { selectedArea } from "@/data/westbridge-density";

export default function SummaryCard({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-surface-border bg-surface/95 shadow-card backdrop-blur-sm ${
        compact ? "px-4 py-3" : "px-5 py-4"
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-ink-secondary/80">Selected area</p>
      <p className="font-semibold text-ink">{selectedArea.name}</p>
      <dl className="mt-2 space-y-1 text-sm text-ink-secondary">
        <div className="flex justify-between gap-4">
          <dt>Radius</dt>
          <dd className="numeric">{selectedArea.radiusLabel}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Estimated daytime population</dt>
          <dd className="numeric">{selectedArea.estimatedPopulation.toLocaleString("en-GB")}</dd>
        </div>
        {!compact && (
          <div className="flex justify-between gap-4">
            <dt>Average density</dt>
            <dd className="numeric">{selectedArea.averageDensityPerKm2.toLocaleString("en-GB")}/km²</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt>Density score</dt>
          <dd className="font-medium text-ink">{selectedArea.densityScoreLabel}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs italic text-ink-secondary/70">Illustrative estimate</p>
    </div>
  );
}
