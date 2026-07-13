import { getDensityBand, type DensityPoint } from "@/data/westbridge-density";

const CATEGORY_LABELS: Record<DensityPoint["category"], string> = {
  centre: "City centre",
  employment: "Employment",
  transport: "Transport",
  education: "Education",
  health: "Health",
  residential: "Residential",
  industrial: "Industrial",
  park: "Park",
};

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 720;

export default function HeatmapTooltip({ point }: { point: DensityPoint | null }) {
  if (!point) return null;

  const band = getDensityBand(point.peoplePerKm2);
  const leftPct = (point.x / VIEWBOX_WIDTH) * 100;
  const topPct = (point.y / VIEWBOX_HEIGHT) * 100;
  const anchorRight = leftPct > 65;
  const anchorBottom = topPct > 70;

  return (
    <div
      role="status"
      className="pointer-events-none absolute z-20 w-max max-w-[220px] rounded-lg border border-surface-border bg-surface px-3 py-2 text-sm shadow-card"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${anchorRight ? "-105%" : "16px"}, ${anchorBottom ? "-110%" : "-50%"})`,
      }}
    >
      <p className="font-semibold text-ink">{point.name}</p>
      <p className="text-ink-secondary">{CATEGORY_LABELS[point.category]}</p>
      <p className="numeric text-ink-secondary">
        {point.peoplePerKm2.toLocaleString("en-GB")} people/km² — {band.label}
      </p>
    </div>
  );
}
