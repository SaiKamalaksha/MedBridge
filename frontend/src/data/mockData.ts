import type { DischargeSummary } from '../types/med'

export const mockDischargeData: DischargeSummary = {
  readability: {
    before: 'Grade 12',
    after: 'Grade 5',
  },
  summaryPoints: [
    'Take your blood pressure medication every morning with food.',
    'Drink plenty of water and avoid alcohol for 48 hours.',
    'Schedule a follow-up appointment within 7 days.',
  ],
  medications: [
    {
      name: 'Lisinopril',
      dosage: '10 mg',
      timeOfDay: 'Morning',
    },
    {
      name: 'Metformin',
      dosage: '500 mg',
      timeOfDay: 'Afternoon',
    },
    {
      name: 'Atorvastatin',
      dosage: '20 mg',
      timeOfDay: 'Evening',
    },
  ],
  redFlags: [
    'Chest pain or trouble breathing',
    'Fever above 101°F',
    'Severe dizziness or confusion',
  ],
}

