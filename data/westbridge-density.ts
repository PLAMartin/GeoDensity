// Fictional sample data for the Westbridge demo heatmap. All figures are
// illustrative and do not represent a real place or measured population.

export type DensityCategory =
  | "centre"
  | "employment"
  | "transport"
  | "education"
  | "health"
  | "residential"
  | "industrial"
  | "park";

export type DensityBand = {
  band: 1 | 2 | 3 | 4 | 5;
  label: "Low" | "Moderate" | "High" | "Very high" | "Exceptional";
  min: number;
  max: number | null;
  colorVar: string;
};

export const DENSITY_BANDS: DensityBand[] = [
  { band: 1, label: "Low", min: 0, max: 1000, colorVar: "var(--density-1)" },
  { band: 2, label: "Moderate", min: 1001, max: 3000, colorVar: "var(--density-2)" },
  { band: 3, label: "High", min: 3001, max: 6000, colorVar: "var(--density-3)" },
  { band: 4, label: "Very high", min: 6001, max: 10000, colorVar: "var(--density-4)" },
  { band: 5, label: "Exceptional", min: 10001, max: null, colorVar: "var(--density-5)" },
];

export function getDensityBand(peoplePerKm2: number): DensityBand {
  return (
    DENSITY_BANDS.find(
      (b) => peoplePerKm2 >= b.min && (b.max === null || peoplePerKm2 <= b.max)
    ) ?? DENSITY_BANDS[0]
  );
}

export type DensityPoint = {
  id: string;
  name: string;
  x: number;
  y: number;
  peoplePerKm2: number;
  radius: number;
  category: DensityCategory;
  /** Primary points are labelled, focusable hotspots. Secondary points only
   * contribute to the glow layer, smoothing the transition between hubs. */
  tier: "primary" | "secondary";
};

export const densityPoints: DensityPoint[] = [
  // Primary named hotspots
  { id: "old-town", name: "Old Town", x: 600, y: 380, peoplePerKm2: 12800, radius: 95, category: "centre", tier: "primary" },
  { id: "riverside-business-quarter", name: "Riverside Business Quarter", x: 740, y: 390, peoplePerKm2: 10900, radius: 90, category: "employment", tier: "primary" },
  { id: "central-station", name: "Central Station", x: 630, y: 470, peoplePerKm2: 8700, radius: 70, category: "transport", tier: "primary" },
  { id: "westbridge-university", name: "Westbridge University", x: 830, y: 250, peoplePerKm2: 7900, radius: 75, category: "education", tier: "primary" },
  { id: "st-annes-hospital", name: "St Anne's Hospital", x: 400, y: 260, peoplePerKm2: 6800, radius: 65, category: "health", tier: "primary" },
  { id: "southbank", name: "Southbank", x: 780, y: 540, peoplePerKm2: 5100, radius: 70, category: "residential", tier: "primary" },
  { id: "millfield", name: "Millfield", x: 320, y: 400, peoplePerKm2: 4400, radius: 70, category: "residential", tier: "primary" },
  { id: "dockside-works", name: "Dockside Works", x: 940, y: 420, peoplePerKm2: 3900, radius: 70, category: "industrial", tier: "primary" },
  { id: "hillview", name: "Hillview", x: 610, y: 150, peoplePerKm2: 3300, radius: 65, category: "residential", tier: "primary" },
  { id: "westbridge-common", name: "Westbridge Common", x: 380, y: 560, peoplePerKm2: 1700, radius: 65, category: "residential", tier: "primary" },
  { id: "riverside-park", name: "Riverside Park", x: 470, y: 350, peoplePerKm2: 350, radius: 60, category: "park", tier: "primary" },
  { id: "northern-fringe", name: "Northern Fringe", x: 610, y: 70, peoplePerKm2: 900, radius: 60, category: "residential", tier: "primary" },

  // Secondary points: unlabelled, glow-only, smoothing transitions around major hubs
  { id: "old-town-fringe-n", name: "Old Town (north fringe)", x: 570, y: 320, peoplePerKm2: 9200, radius: 55, category: "centre", tier: "secondary" },
  { id: "old-town-fringe-s", name: "Old Town (south fringe)", x: 610, y: 430, peoplePerKm2: 8600, radius: 55, category: "centre", tier: "secondary" },
  { id: "rbq-fringe-w", name: "Riverside Business Quarter (west fringe)", x: 690, y: 400, peoplePerKm2: 8900, radius: 50, category: "employment", tier: "secondary" },
  { id: "rbq-fringe-e", name: "Riverside Business Quarter (east fringe)", x: 800, y: 380, peoplePerKm2: 7200, radius: 55, category: "employment", tier: "secondary" },
  { id: "station-approach", name: "Station approach", x: 600, y: 430, peoplePerKm2: 7100, radius: 45, category: "transport", tier: "secondary" },
  { id: "university-fringe", name: "University fringe", x: 780, y: 280, peoplePerKm2: 5600, radius: 50, category: "education", tier: "secondary" },
  { id: "hospital-fringe", name: "Hospital fringe", x: 440, y: 300, peoplePerKm2: 4900, radius: 45, category: "health", tier: "secondary" },
  { id: "southbank-fringe", name: "Southbank fringe", x: 730, y: 500, peoplePerKm2: 3800, radius: 50, category: "residential", tier: "secondary" },
  { id: "dockside-fringe", name: "Dockside fringe", x: 880, y: 440, peoplePerKm2: 2900, radius: 50, category: "industrial", tier: "secondary" },
];

export function getPrimaryPoints(): DensityPoint[] {
  return densityPoints.filter((p) => p.tier === "primary");
}

export function getTopDensityPoints(count = 5): DensityPoint[] {
  return getPrimaryPoints()
    .slice()
    .sort((a, b) => b.peoplePerKm2 - a.peoplePerKm2)
    .slice(0, count);
}

export type SelectedArea = {
  name: string;
  x: number;
  y: number;
  radiusUnits: number;
  radiusLabel: string;
  estimatedPopulation: number;
  averageDensityPerKm2: number;
  densityScoreLabel: string;
};

export const selectedArea: SelectedArea = {
  name: "Central Westbridge",
  x: 670,
  y: 385,
  radiusUnits: 150,
  radiusLabel: "1 km radius",
  estimatedPopulation: 18400,
  averageDensityPerKm2: 8950,
  densityScoreLabel: "Very high",
};
