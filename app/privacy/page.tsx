import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Notice | Geodensity",
  description: "How Geodensity collects and uses waitlist and analytics data.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="mx-auto max-w-3xl flex-1 px-6 py-16 md:py-24">
        <h1 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          Privacy Notice
        </h1>
        <p className="mt-4 text-sm text-ink-secondary">
          This notice explains what information Geodensity collects on this website and how it is
          used. Geodensity is currently an early-stage product validation site.
        </p>

        <div className="mt-10 space-y-8 text-sm leading-relaxed text-ink-secondary">
          <section>
            <h2 className="text-lg font-semibold text-ink">Waitlist emails</h2>
            <p className="mt-2">
              If you join the waitlist, we store your email address, the page you signed up from,
              your consent statement and version, and any campaign parameters (such as UTM tags)
              present in your visit. We use this only to send occasional product updates and an
              invitation to test early versions of Geodensity. You can unsubscribe at any time by
              following the link in any email we send you, or by contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Analytics</h2>
            <p className="mt-2">
              We use privacy-friendly analytics to understand how visitors use this page, such as
              page views, scroll and interaction with the sample heatmap, and waitlist conversion.
              We do not send your email address to any analytics platform, and analytics events
              do not identify you personally.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">The sample heatmap</h2>
            <p className="mt-2">
              The heatmap on this page shows a fictional city, Westbridge, with illustrative
              sample data. It does not contain, and is not derived from, any real geospatial,
              population or movement data.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Data storage and security</h2>
            <p className="mt-2">
              Waitlist submissions are stored securely and are only accessible to the Geodensity
              team. We do not sell or share your email address with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">Contact</h2>
            <p className="mt-2">
              If you have questions about this notice or want your data removed, please contact
              us using the details provided in any Geodensity email you have received.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
