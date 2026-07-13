// Static decorative geometry for the fictional city of Westbridge. This is
// fixed shape data (not sample statistics) — it exists purely to suggest a
// believable city layout behind the density heatmap and carries no meaning
// of its own. Not a real map outline or street network.

export type BlockShape = {
  x: number;
  y: number;
  width: number;
  height: number;
  rx: number;
  opacity: number;
};

export const neighbourhoodBlocks: BlockShape[] = [
  { x: 520, y: 320, width: 160, height: 120, rx: 6, opacity: 0.5 },
  { x: 660, y: 330, width: 150, height: 110, rx: 6, opacity: 0.45 },
  { x: 560, y: 420, width: 130, height: 90, rx: 6, opacity: 0.4 },
  { x: 760, y: 260, width: 150, height: 120, rx: 10, opacity: 0.35 },
  { x: 340, y: 210, width: 150, height: 120, rx: 10, opacity: 0.35 },
  { x: 700, y: 470, width: 170, height: 130, rx: 10, opacity: 0.3 },
  { x: 250, y: 340, width: 150, height: 130, rx: 10, opacity: 0.3 },
  { x: 850, y: 360, width: 180, height: 140, rx: 8, opacity: 0.28 },
  { x: 540, y: 100, width: 160, height: 110, rx: 12, opacity: 0.25 },
  { x: 300, y: 500, width: 160, height: 130, rx: 12, opacity: 0.25 },
  { x: 540, y: 30, width: 160, height: 90, rx: 12, opacity: 0.2 },
  { x: 400, y: 280, width: 110, height: 90, rx: 10, opacity: 0.3 },
];

export const roads: string[] = [
  "M 150 400 C 350 390, 500 380, 600 380 S 850 380, 1080 400",
  "M 600 60 C 605 200, 610 300, 610 380 S 620 550, 630 650",
  "M 400 200 C 480 260, 550 320, 600 380",
  "M 830 250 C 780 300, 750 350, 740 390",
  "M 630 470 C 700 500, 750 520, 780 540",
  "M 320 400 C 420 400, 500 390, 600 380",
  "M 940 420 C 850 410, 780 400, 740 390",
  "M 610 150 C 610 250, 610 320, 610 380",
  "M 380 560 C 480 520, 560 480, 630 470",
];

export const river = {
  path: "M 80 430 C 250 410, 380 460, 520 430 C 650 405, 760 420, 900 400 C 1000 388, 1080 395, 1140 410",
  width: 34,
};

export type Bridge = {
  x: number;
  y: number;
  rotation: number;
  length: number;
};

export const bridges: Bridge[] = [
  { x: 600, y: 400, rotation: 8, length: 60 },
  { x: 740, y: 405, rotation: -6, length: 60 },
];

export type ParkShape = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
};

export const parks: ParkShape[] = [
  { cx: 470, cy: 350, rx: 70, ry: 55 },
  { cx: 380, cy: 560, rx: 90, ry: 65 },
  { cx: 610, cy: 70, rx: 85, ry: 55 },
  { cx: 950, cy: 250, rx: 60, ry: 45 },
];
