interface SummaryCardProps {
  title: string
  points: string[]
}

function SummaryCard({ title, points }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-[0_10px_30px_rgba(3,7,18,0.4)]">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
        {title}
      </div>
      <ul className="mt-4 space-y-2 text-sm text-slate-200">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SummaryCard
