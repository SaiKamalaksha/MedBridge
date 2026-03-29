function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-wide">MedBridge</div>
        <button className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium transition hover:border-slate-500">
          Get started
        </button>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-16 pt-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              React + Vite + Tailwind
            </p>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Frontend environment is ready.
            </h1>
            <p className="text-base text-slate-300 md:text-lg">
              Start building your MedBridge UI with TypeScript, fast HMR, and a
              clean Tailwind setup.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm">
                `npm run dev`
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm">
                `src/App.tsx`
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-6">
            <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="text-sm font-semibold text-emerald-200">
                Status
              </div>
              <div className="text-2xl font-semibold">Configured</div>
              <div className="text-sm text-slate-300">
                Tailwind v4 + Vite plugin enabled
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
