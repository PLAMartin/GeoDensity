import { selectedArea } from "@/data/westbridge-density";

export default function CatchmentOverlay() {
  return (
    <g aria-hidden="true">
      <circle
        cx={selectedArea.x}
        cy={selectedArea.y}
        r={selectedArea.radiusUnits}
        fill="rgba(12, 124, 130, 0.08)"
        stroke="#0C7C82"
        strokeWidth={2.5}
        strokeDasharray="8 6"
      />
      <circle cx={selectedArea.x} cy={selectedArea.y} r={4} fill="#0C7C82" />
    </g>
  );
}
