const STEPS = [
  {
    title: "Choose an area",
    body: "Search for a location and select a radius or boundary relevant to the decision.",
  },
  {
    title: "Estimate the population",
    body: "Geodensity combines building, land-use, employment and population evidence into a granular estimate.",
  },
  {
    title: "Compare locations",
    body: "Review density, catchment population and supporting assumptions across possible sites.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        From buildings to better location decisions
      </h2>

      <ol className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
              {i + 1}
            </span>
            <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-ink-secondary">{step.body}</p>
          </li>
        ))}
      </ol>

      <p className="mt-12 max-w-2xl rounded-xl border border-surface-border bg-surface p-5 text-sm leading-relaxed text-ink-secondary">
        Geodensity will provide modelled estimates rather than counts of identifiable individuals.
        The product will use aggregated data and will not track personal movements.
      </p>
    </section>
  );
}
