import { densityPoints, getDensityBand } from "@/data/westbridge-density";

export default function HeatGlowLayer({ animate }: { animate: boolean }) {
  return (
    <g aria-hidden="true" pointerEvents="none" className={animate ? "heatmap-glow-enter" : undefined}>
      <defs>
        <filter id="heat-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {densityPoints.map((point) => {
          const band = getDensityBand(point.peoplePerKm2);
          return (
            <radialGradient key={point.id} id={`glow-${point.id}`}>
              <stop offset="0%" stopColor={band.colorVar} stopOpacity={0.85} />
              <stop offset="100%" stopColor={band.colorVar} stopOpacity={0} />
            </radialGradient>
          );
        })}
      </defs>
      <g filter="url(#heat-blur)" style={{ mixBlendMode: "multiply" }}>
        {densityPoints.map((point) => (
          <circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r={point.radius}
            fill={`url(#glow-${point.id})`}
          />
        ))}
      </g>
    </g>
  );
}
