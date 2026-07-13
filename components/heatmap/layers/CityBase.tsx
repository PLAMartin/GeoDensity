import { neighbourhoodBlocks, roads, river, bridges, parks } from "@/data/westbridge-geometry";

export default function CityBase({ detailed = true }: { detailed?: boolean }) {
  return (
    <g aria-hidden="true">
      <rect x={0} y={0} width={1200} height={720} fill="#F1ECE3" />

      {detailed &&
        neighbourhoodBlocks.map((block, i) => (
          <rect
            key={i}
            x={block.x}
            y={block.y}
            width={block.width}
            height={block.height}
            rx={block.rx}
            fill="#E4DCCC"
            opacity={block.opacity}
          />
        ))}

      {detailed &&
        roads.map((d, i) => (
          <path key={i} d={d} stroke="#D8CFBE" strokeWidth={6} fill="none" strokeLinecap="round" />
        ))}

      {parks.map((park, i) => (
        <ellipse
          key={i}
          cx={park.cx}
          cy={park.cy}
          rx={park.rx}
          ry={park.ry}
          fill="#CFE0C6"
          opacity={0.55}
        />
      ))}

      <path d={river.path} stroke="#B9D4DE" strokeWidth={river.width} fill="none" strokeLinecap="round" />

      {bridges.map((bridge, i) => (
        <rect
          key={i}
          x={bridge.x - bridge.length / 2}
          y={bridge.y - 4}
          width={bridge.length}
          height={8}
          rx={2}
          fill="#8C8477"
          transform={`rotate(${bridge.rotation} ${bridge.x} ${bridge.y})`}
        />
      ))}
    </g>
  );
}
