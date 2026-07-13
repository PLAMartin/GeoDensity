import { getPrimaryPoints, type DensityPoint } from "@/data/westbridge-density";

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

export default function PlaceMarkers({
  activeHotspotId,
  showLabels,
  onActivate,
  onDeactivate,
  onToggle,
}: {
  activeHotspotId: string | null;
  showLabels: boolean;
  onActivate: (id: string) => void;
  onDeactivate: (id: string) => void;
  onToggle: (id: string) => void;
}) {
  const points = getPrimaryPoints();

  return (
    <g>
      {points.map((point) => {
        const isActive = activeHotspotId === point.id;
        return (
          <g
            key={point.id}
            role="button"
            tabIndex={0}
            aria-label={`${point.name}, ${CATEGORY_LABELS[point.category]}, ${point.peoplePerKm2.toLocaleString(
              "en-GB"
            )} people per square kilometre`}
            onMouseEnter={() => onActivate(point.id)}
            onMouseLeave={() => onDeactivate(point.id)}
            onFocus={() => onActivate(point.id)}
            onBlur={() => onDeactivate(point.id)}
            onClick={() => onToggle(point.id)}
            style={{ cursor: "pointer" }}
          >
            {/* Larger invisible circle so the tap target is bigger than the visual dot,
                which stays small to avoid crowding the map at this density. */}
            <circle cx={point.x} cy={point.y} r={20} fill="transparent" />
            <circle
              cx={point.x}
              cy={point.y}
              r={isActive ? 10 : 7}
              fill="#0F1B33"
              stroke="#FCFBF9"
              strokeWidth={2}
              style={{ transition: "r 150ms ease-out" }}
            />
            {showLabels && (
              <text
                x={point.x}
                y={point.y - 14}
                textAnchor="middle"
                fontSize={13}
                fontWeight={600}
                fill="#0F1B33"
                stroke="#FCFBF9"
                strokeWidth={3}
                paintOrder="stroke"
                className="hidden md:block"
              >
                {point.name}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}
