import { AlertTriangle } from 'lucide-react'

interface RedFlagAlertsProps {
  alerts: string[]
}

function RedFlagAlerts({ alerts }: RedFlagAlertsProps) {
  return (
    <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-rose-200">
        <AlertTriangle className="h-4 w-4" /> Red Flags
      </div>
      <ul className="mt-4 space-y-2 text-sm text-rose-100">
        {alerts.map((alert) => (
          <li key={alert} className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" />
            <span>{alert}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RedFlagAlerts
