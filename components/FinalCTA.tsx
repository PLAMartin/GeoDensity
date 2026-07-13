import WaitlistForm from "@/components/WaitlistForm";

export default function FinalCTA() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Help shape the first version of Geodensity
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-secondary md:text-lg">
          Join the waitlist to receive product updates and opportunities to test early
          location-density tools.
        </p>

        <div className="mt-8 flex justify-center">
          <WaitlistForm source="final_cta" id="final-cta" />
        </div>
      </div>
    </section>
  );
}
