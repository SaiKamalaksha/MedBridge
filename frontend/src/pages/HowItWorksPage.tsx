function HowItWorksPage() {
  const steps = [
    {
      number: '01',
      title: 'Upload or paste',
      description: 'Nurse or doctor uploads a discharge PDF or pastes notes directly. MedBridge extracts the text automatically — even from scanned documents.',
      detail: 'Supports PDF upload + plain text',
    },
    {
      number: '02',
      title: 'AI simplification',
      description: 'Claude AI rewrites the clinical notes at a 6th grade reading level. Medications, red flag symptoms, and follow-up steps are extracted into structured cards.',
      detail: 'Powered by Claude on AWS Bedrock',
    },
    {
      number: '03',
      title: 'Deliver to patient',
      description: 'The plain-language summary is sent directly to the patient\'s phone via WhatsApp — in their language. No app download required.',
      detail: 'WhatsApp delivery via Twilio',
    },
  ]

  const metrics = [
    { label: 'Processing time', value: '< 10 seconds' },
    { label: 'Reading level target', value: 'Grade 6' },
    { label: 'Languages supported', value: '6+' },
    { label: 'App required', value: 'None' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div className="rounded-full border border-slate-800 bg-slate-900/60 px-8 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">
          How it Works
        </div>
      </div>

      {/* Steps */}
      <div className="grid gap-6 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-2xl border border-slate-800 bg-gradient-to-b from-[#120827] to-[#09051a] p-6"
          >
            <div className="text-4xl font-semibold text-emerald-300/30">{step.number}</div>
            <div className="mt-3 text-lg font-semibold text-white">{step.title}</div>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">{step.description}</p>
            <div className="mt-4 rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-400 inline-block">
              {step.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <div className="text-lg font-semibold text-emerald-300">{metric.value}</div>
            <div className="mt-1 text-xs text-slate-400">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Mrs Rodriguez story */}
      <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-6">
        <div className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-3">
          The problem we're solving
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          Mrs. Rodriguez is 72, just had heart surgery, and speaks English as a second language.
          She leaves the hospital with 4 pages of instructions written at a 12th grade reading level
          that she cannot understand. Three days later she's back in the ER.
          <span className="text-emerald-300 font-semibold"> MedBridge fixes the moment she walks out the door.</span>
        </p>
      </div>
    </div>
  )
}

export default HowItWorksPage