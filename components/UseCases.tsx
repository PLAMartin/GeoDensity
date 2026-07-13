"use client";

import { useInViewOnce } from "@/hooks/useInViewOnce";
import { trackUseCaseViewed } from "@/lib/analytics";

const USE_CASES = [
  {
    id: "network-planning",
    title: "Network planning",
    body: "Estimate the daytime population around potential infrastructure sites and prioritise areas of likely demand.",
  },
  {
    id: "transport-mobility",
    title: "Transport and mobility",
    body: "Compare the population served by stops, stations, routes and proposed transport investments.",
  },
  {
    id: "retail-property",
    title: "Retail and property",
    body: "Assess the people within realistic catchment areas around candidate stores, offices or developments.",
  },
  {
    id: "public-sector-planning",
    title: "Public-sector planning",
    body: "Build a more granular view of population and employment patterns for local services and economic analysis.",
  },
];

function UseCaseCard({ id, title, body }: { id: string; title: string; body: string }) {
  const ref = useInViewOnce<HTMLDivElement>(() => trackUseCaseViewed(id));

  return (
    <div ref={ref} className="rounded-2xl border border-surface-border bg-surface p-6 shadow-card">
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{body}</p>
    </div>
  );
}

export default function UseCases() {
  return (
    <section id="use-cases" className="bg-surface/60 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Built for decisions where location matters
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USE_CASES.map((useCase) => (
            <UseCaseCard key={useCase.id} {...useCase} />
          ))}
        </div>
      </div>
    </section>
  );
}
