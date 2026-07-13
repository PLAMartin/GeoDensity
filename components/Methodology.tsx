const PRINCIPLES = [
  "Aggregated, privacy-conscious data",
  "Visible assumptions",
  "Confidence ranges where appropriate",
  "Comparable methods across locations",
];

export default function Methodology() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
        Transparent estimates, not false precision
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg">
        Geodensity is intended to make complex location evidence easier to use, while remaining
        clear about uncertainty. Estimates should show their source date, assumptions,
        confidence level and the geographical resolution of the underlying data. Users should be
        able to understand why a result was produced rather than receiving an unexplained number.
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRINCIPLES.map((principle) => (
          <li
            key={principle}
            className="rounded-xl border border-surface-border bg-surface p-4 text-sm font-medium text-ink"
          >
            {principle}
          </li>
        ))}
      </ul>
    </section>
  );
}
