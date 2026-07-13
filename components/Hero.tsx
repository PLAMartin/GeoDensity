import DensityHeatmap from "@/components/heatmap/DensityHeatmap";
import WaitlistForm from "@/components/WaitlistForm";

export default function Hero() {
  return (
    <section id="hero-waitlist" className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-accent">
            Location intelligence for better decisions
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ink md:text-5xl lg:text-6xl">
            Know where people really are
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
            Geodensity estimates how many people live or work within any chosen area, helping
            planners compare locations, identify concentrations of demand and prioritise
            investment.
          </p>

          <div className="mt-8">
            <WaitlistForm source="hero" id="hero" />
          </div>

          <a
            href="#solution"
            className="mt-6 inline-block text-sm font-medium text-ink underline decoration-surface-border underline-offset-4 hover:text-accent"
          >
            See how it works
          </a>
        </div>

        <div>
          <DensityHeatmap variant="compact" />
        </div>
      </div>
    </section>
  );
}
