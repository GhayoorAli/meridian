export function PageLoader() {
  return (
    <main className="flex min-h-screen items-end px-5 pt-32 pb-16 md:px-8">
      <div>
        <div className="h-2 w-20 bg-signal/70" />
        <div className="mt-6 h-14 w-56 bg-paper/10 md:w-80" />
        <p className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-mist">
          Loading sheet
        </p>
      </div>
    </main>
  );
}
