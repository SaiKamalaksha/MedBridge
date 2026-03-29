export interface Medication {
  name: string
  dosage: string
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night'
}

export interface ReadabilityScore {
  before: string
  after: string
}

export interface DischargeSummary {
  readability: ReadabilityScore
  summaryPoints: string[]
  medications: Medication[]
  redFlags: string[]
}
