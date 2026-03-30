import { CheckCircle } from 'lucide-react'
import MedicationSchedule from '../components/MedicationSchedule'
import ReadabilityBar from '../components/ReadabilityBar'
import RedFlagAlerts from '../components/RedFlagAlerts'
import SMSSender from '../components/SMSSender'
import SummaryCard from '../components/SummaryCard'
import { sendSms } from '../services/api'
import type { DischargeSummary } from '../types/med'

interface ResultsPageProps {
  data: DischargeSummary | null
}

function ResultsPage({ data }: ResultsPageProps) {
  if (!data) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 text-center">
        <h1 className="text-2xl font-semibold">No results yet</h1>
        <p className="mt-2 text-sm text-slate-300">
          Run the simplification to see the dashboard.
        </p>
      </div>
    )
  }

const handleSendSms = async (phoneNumber: string) => {
  await sendSms({
    phone: phoneNumber,
    message: data.summary_points.join('\n'),
  })
}

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10">
        <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
          <CheckCircle className="h-5 w-5" /> Results
        </div>
        <h1 className="mt-3 text-3xl font-semibold text-white">
          Discharge Simplified
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Clear, actionable steps for patients and caregivers.
        </p>
      </div>

      <ReadabilityBar score={data.readability} />
      <SummaryCard title="Summary" points={data.summary_points} />
      <MedicationSchedule medications={data.medications} />
      <RedFlagAlerts alerts={data.red_flags} />
      <SMSSender onSend={handleSendSms} />
    </div>
  )
}

export default ResultsPage