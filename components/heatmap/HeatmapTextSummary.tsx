import { getTopDensityPoints } from "@/data/westbridge-density";

export default function HeatmapTextSummary() {
  const topPoints = getTopDensityPoints(5);

  return (
    <details className="mt-4 rounded-lg border border-surface-border bg-surface px-4 py-3 text-sm">
      <summary className="cursor-pointer font-medium text-ink">
        Highest-density locations in this illustrative map
      </summary>
      <ol className="mt-2 space-y-1 text-ink-secondary">
        {topPoints.map((point) => (
          <li key={point.id} className="flex justify-between gap-4">
            <span>{point.name}</span>
            <span className="numeric">{point.peoplePerKm2.toLocaleString("en-GB")} people/km²</span>
          </li>
        ))}
      </ol>
    </details>
  );
}
