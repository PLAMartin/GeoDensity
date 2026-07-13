export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-surface-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-lg font-semibold tracking-tight text-ink">
          Geodensity
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#problem" className="text-sm text-ink-secondary hover:text-ink">
            The problem
          </a>
          <a href="#how-it-works" className="text-sm text-ink-secondary hover:text-ink">
            How it works
          </a>
          <a href="#use-cases" className="text-sm text-ink-secondary hover:text-ink">
            Use cases
          </a>
          <a
            href="#hero-waitlist"
            className="flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Join the waitlist
          </a>
        </nav>

        <a
          href="#hero-waitlist"
          className="flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-hover md:hidden"
        >
          Join the waitlist
        </a>
      </div>
    </header>
  );
}
