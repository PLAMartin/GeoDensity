const CARDS = [
  {
    title: "The wrong boundaries",
    body: "Administrative areas do not reflect the catchment around a real location.",
  },
  {
    title: "Fragmented evidence",
    body: "Building, employment and population information is spread across different sources and formats.",
  },
  {
    title: "Difficult comparisons",
    body: "Analysts spend time assembling data before they can compare candidate locations consistently.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Broad averages hide local demand
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg">
        Location decisions are frequently based on postcodes, wards, census zones or regional
        averages. These boundaries are useful for reporting, but they rarely match the area
        around a site, transport stop, mast or development opportunity. Two locations only a
        short distance apart can serve very different populations.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-surface-border bg-surface p-6 shadow-card"
          >
            <h3 className="text-xl font-semibold text-ink">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
