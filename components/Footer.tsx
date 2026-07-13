export default function Footer() {
  return (
    <footer className="border-t border-surface-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-ink-secondary sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} Geodensity. Illustrative product in development.</p>
        <nav className="flex gap-6">
          <a href="/privacy" className="hover:text-ink">
            Privacy Notice
          </a>
          <a href="/terms" className="hover:text-ink">
            Terms of Use
          </a>
          <a href="#hero-waitlist" className="hover:text-ink">
            Join the waitlist
          </a>
        </nav>
      </div>
    </footer>
  );
}
