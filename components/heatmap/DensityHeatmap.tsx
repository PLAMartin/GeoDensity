"use client";

import { useId, useRef, useState } from "react";
import CityBase from "./layers/CityBase";
import HeatGlowLayer from "./layers/HeatGlowLayer";
import PlaceMarkers from "./layers/PlaceMarkers";
import CatchmentOverlay from "./layers/CatchmentOverlay";
import HeatmapTooltip from "./HeatmapTooltip";
import SummaryCard from "./SummaryCard";
import DensityLegend from "./DensityLegend";
import HeatmapTextSummary from "./HeatmapTextSummary";
import { densityPoints } from "@/data/westbridge-density";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { trackHeatmapHotspotViewed } from "@/lib/analytics";

export default function DensityHeatmap({
  variant = "full",
}: {
  variant?: "full" | "compact";
}) {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const firedHotspotIds = useRef<Set<string>>(new Set());
  const prefersReducedMotion = usePrefersReducedMotion();
  const titleId = useId();
  const descId = useId();

  const activePoint = densityPoints.find((p) => p.id === activeHotspotId) ?? null;
  const isCompact = variant === "compact";

  const handleActivate = (id: string) => {
    setActiveHotspotId(id);
    if (!firedHotspotIds.current.has(id)) {
      firedHotspotIds.current.add(id);
      const point = densityPoints.find((p) => p.id === id);
      if (point) trackHeatmapHotspotViewed(point.id, point.category);
    }
  };

  const handleDeactivate = (id: string) => {
    setActiveHotspotId((current) => (current === id ? null : current));
  };

  const handleToggle = (id: string) => {
    setActiveHotspotId((current) => (current === id ? null : id));
    handleActivate(id);
  };

  return (
    <div className={isCompact ? "rounded-2xl border border-surface-border bg-surface p-3 shadow-card" : undefined}>
      <div className="relative overflow-hidden rounded-xl">
        <svg
          viewBox="0 0 1200 720"
          role="graphics-document"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className="block w-full"
        >
          <title id={titleId}>Illustrative people-density heatmap of the fictional city of Westbridge</title>
          <desc id={descId}>
            A fictional demonstration city used to show how Geodensity presents people-density
            hotspots. The densest illustrative areas are Old Town, the Riverside Business
            Quarter and Central Station. A one-kilometre catchment is shown around Central
            Westbridge, between Old Town and the Riverside Business Quarter. All figures are
            fictional and do not represent real measured data.
          </desc>

          <CityBase detailed={!isCompact} />
          <HeatGlowLayer animate={!prefersReducedMotion} />
          <CatchmentOverlay />
          <PlaceMarkers
            activeHotspotId={activeHotspotId}
            showLabels={!isCompact}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
            onToggle={handleToggle}
          />
        </svg>

        <HeatmapTooltip point={activePoint} />

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-white">
          Illustrative data{!isCompact && " — fictional city"}
        </span>

        {/* Full variant on md+ screens: summary card and legend overlay the map's
            uncrowded corners, clear of the central hotspot cluster (and, for the
            summary card, clear of Westbridge Common in the south-west — hence
            bottom-right rather than bottom-left). Below md the map is too short
            for two fixed-height corner cards to fit without overlapping each
            other, so they move below the map instead (spec 8.7: keep the summary
            visible below the SVG if it would obscure the map). The compact Hero
            card is narrow at every width, so it always renders that way. */}
        {!isCompact && (
          <div className="pointer-events-none absolute inset-4 hidden md:block">
            <div className="pointer-events-auto absolute bottom-0 right-0">
              <SummaryCard />
            </div>
            <div className="pointer-events-auto absolute right-0 top-0">
              <DensityLegend />
            </div>
          </div>
        )}
      </div>

      {isCompact && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <SummaryCard compact />
          <DensityLegend />
        </div>
      )}

      {!isCompact && (
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between md:hidden">
          <SummaryCard />
          <DensityLegend />
        </div>
      )}

      {!isCompact && <HeatmapTextSummary />}
    </div>
  );
}
