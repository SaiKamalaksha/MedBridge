import type { ReadabilityScore } from '../types/med'

interface ReadabilityBarProps {
  score: ReadabilityScore
}

function ReadabilityBar({ score }: ReadabilityBarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        Readability Score
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Before
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            {score.before}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4">
          <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">
            After
          </div>
          <div className="mt-2 text-2xl font-semibold text-white">
            {score.after}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReadabilityBar

