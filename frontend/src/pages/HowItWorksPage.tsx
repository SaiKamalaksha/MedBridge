function HowItWorksPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="rounded-full border border-slate-800 bg-slate-900/60 px-8 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          How it Works
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {['Upload', 'AI Analysis', 'Get SMS'].map((title) => (
          <div
            key={title}
            className="h-56 rounded-2xl border border-slate-800 bg-gradient-to-b from-[#120827] to-[#09051a] p-6 text-slate-200"
          >
            <div className="text-lg font-semibold">{title}</div>
            <p className="mt-3 text-sm text-slate-400">
              Placeholder details for {title.toLowerCase()}.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HowItWorksPage