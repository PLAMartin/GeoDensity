import DensityHeatmap from "@/components/heatmap/DensityHeatmap";

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          A clearer picture of people density
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-secondary md:text-lg">
          Geodensity converts building and population information into a consistent estimate for
          the area that matters to the decision. Instead of accepting a fixed statistical
          boundary, users will be able to assess a chosen point, radius or custom area.
        </p>

        <div className="mt-12">
          <DensityHeatmap variant="full" />
        </div>
      </div>
    </section>
  );
}
