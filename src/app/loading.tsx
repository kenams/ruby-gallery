export default function GlobalLoading() {
  return (
    <main className="grid-shell section-space">
      <div className="animate-pulse space-y-6">
        <div className="surface h-16 w-48 rounded-full" />
        <div className="surface h-[420px] rounded-[2.6rem]" />
        <div className="grid gap-6 md:grid-cols-3">
          <div className="surface h-44 rounded-[2rem]" />
          <div className="surface h-44 rounded-[2rem]" />
          <div className="surface h-44 rounded-[2rem]" />
        </div>
      </div>
    </main>
  );
}
