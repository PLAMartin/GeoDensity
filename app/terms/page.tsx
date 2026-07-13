import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | Geodensity",
  description: "The terms that govern your use of the Geodensity website.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto max-w-3xl flex-1 px-6 py-16 md:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-ink-secondary">
          These terms govern your use of this website. Geodensity is currently an early-stage
          product validation site, and the product described here is not yet generally available.
          By using this site, you agree to these terms.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-secondary">
          <section>
            <h2 className="text-lg font-semibold text-ink">Illustrative product</h2>
            <p className="mt-2">
              Geodensity is in development. Content on this site, including the sample heatmap of
              the fictional city Westbridge, feature descriptions, and methodology explanations,
              is illustrative and provided for evaluation purposes only. It does not represent a
              finished product, real data, or a binding commitment about future features.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Acceptable use</h2>
            <p className="mt-2">
              You agree not to misuse this site, including attempting to interfere with its normal
              operation, accessing it through unauthorized automated means, or using it to submit
              false or malicious information through the waitlist form.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Waitlist</h2>
            <p className="mt-2">
              Joining the waitlist does not guarantee access to Geodensity or any future product.
              See our{" "}
              <a href="/privacy" className="text-ink underline underline-offset-2 hover:no-underline">
                Privacy Notice
              </a>{" "}
              for details on how we handle information you provide.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Intellectual property</h2>
            <p className="mt-2">
              The Geodensity name, logo, and site content are owned by Geodensity or its licensors.
              You may not reproduce, distribute, or create derivative works from this site without
              our permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">No warranty</h2>
            <p className="mt-2">
              This site and its content are provided &ldquo;as is&rdquo; without warranties of any
              kind. As an early-stage validation site, features, availability, and content may
              change or be discontinued at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Changes to these terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the site after changes
              are posted constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              If you have questions about these terms, please contact us using the details provided
              in any Geodensity email you have received.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
