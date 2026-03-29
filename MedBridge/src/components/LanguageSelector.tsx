interface LanguageSelectorProps {
  value: string
  onChange: (value: string) => void
}

const options = ['English', 'Spanish', 'French']

function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        Choose Language
      </div>
      <select
        className="mt-4 w-full rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-white focus:border-emerald-300 focus:outline-none"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
