function ImpactPage() {
  const stats = [
    { value: '50%', label: 'Patients who misunderstand discharge instructions', source: 'JAMA Internal Medicine' },
    { value: '$26B', label: 'Annual cost of preventable readmissions in the US', source: 'CMS Data' },
    { value: '1 in 5', label: 'Patients readmitted within 30 days of discharge', source: 'New England Journal of Medicine' },
    { value: '3.2', label: 'Average grade levels simplified by MedBridge AI', source: 'Live demo data' },
  ]

  const steps = [
    { label: 'Grade 12', value: 92, color: 'bg-red-400' },
    { label: 'Grade 10', value: 76, color: 'bg-orange-400' },
    { label: 'Grade 8', value: 55, color: 'bg-yellow-400' },
    { label: 'Grade 6 ✓', value: 35, color: 'bg-emerald-400' },
  ]

  const languages = ['English', 'Spanish', 'French', 'Arabic', 'Mandarin', 'Vietnamese']

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          Impact Dashboard
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Why MedBridge matters
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Real statistics behind the readmission crisis.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="text-3xl font-semibold text-emerald-300">{stat.value}</div>
            <div className="mt-2 text-sm text-slate-200 leading-snug">{stat.label}</div>
            <div className="mt-3 text-xs text-slate-500">{stat.source}</div>
          </div>
        ))}
      </div>

      {/* Readability chart */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 mb-6">
          Readability — before vs after MedBridge
        </div>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-4">
              <div className="w-24 text-right text-xs text-slate-400">{step.label}</div>
              <div className="flex-1 rounded-full bg-slate-800 h-4 overflow-hidden">
                <div
                  className={`h-full rounded-full ${step.color} transition-all duration-700`}
                  style={{ width: `${step.value}%` }}
                />
              </div>
              <div className="text-xs text-slate-400 w-16">
                {i === 0 ? 'Typical discharge' : i === steps.length - 1 ? 'After MedBridge' : ''}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Flesch-Kincaid Grade Level. US average reading level is Grade 8.
        </p>
      </div>

      {/* Multilingual */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 mb-4">
          Multilingual support
        </div>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <div
              key={lang}
              className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
            >
              {lang}
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          One toggle. Same AI pipeline. Instructions delivered in the patient's native language.
        </p>
      </div>

      {/* Business case */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300 mb-4">
          The business case
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-950/60 p-4">
            <div className="text-emerald-300 font-semibold text-sm mb-1">Hospitals</div>
            <div className="text-xs text-slate-400 leading-relaxed">Pay up to $15,000 per preventable readmission penalty under CMS value-based care programs.</div>
          </div>
          <div className="rounded-xl bg-slate-950/60 p-4">
            <div className="text-emerald-300 font-semibold text-sm mb-1">Patients</div>
            <div className="text-xs text-slate-400 leading-relaxed">Leave with instructions they can actually follow. No app to download. Works on any phone via WhatsApp.</div>
          </div>
          <div className="rounded-xl bg-slate-950/60 p-4">
            <div className="text-emerald-300 font-semibold text-sm mb-1">Insurers</div>
            <div className="text-xs text-slate-400 leading-relaxed">Fewer readmissions means fewer claims. MedBridge pays for itself with a single avoided readmission.</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImpactPage