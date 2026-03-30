export interface Medication {
  name: string
  dosage: string
  time_of_day: string | null
  warning: string | null
}

export interface ReadabilityScore {
  before: number
  after: number
}

export interface DischargeSummary {
  simplified_text: string
  summary_points: string[]
  medications: Medication[]
  red_flags: string[]
  readability: ReadabilityScore
  citations: string[]
}