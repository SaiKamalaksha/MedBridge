import { Pill } from 'lucide-react'
import { Medication } from '../types/med'

interface MedicationScheduleProps {
  medications: Medication[]
}

function MedicationSchedule({ medications }: MedicationScheduleProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        <Pill className="h-4 w-4 text-emerald-300" /> Medication
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {medications.map((medication) => (
          <div
            key={`${medication.name}-${medication.timeOfDay}`}
            className="rounded-xl border border-slate-800 bg-slate-950/70 p-4"
          >
            <div className="text-base font-semibold text-white">
              {medication.name}
            </div>
            <div className="mt-1 text-sm text-slate-300">
              {medication.dosage}
            </div>
            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
              {medication.timeOfDay}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MedicationSchedule
