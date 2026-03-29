import { useState } from 'react'
import { FileText } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

interface InputPageProps {
  onSimplify: () => Promise<void>
  isLoading: boolean
}

function InputPage({ onSimplify, isLoading }: InputPageProps) {
  const [language, setLanguage] = useState('English')

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/50 p-10 shadow-[0_20px_60px_rgba(2,6,23,0.55)]">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70">
            <FileText className="h-8 w-8 text-emerald-300" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">
              Upload the Discharge Info
            </h1>
            <p className="text-sm text-slate-300">
              Drag and drop a file or paste the discharge summary below.
            </p>
          </div>
          <div className="w-full rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-6 py-8 text-sm text-slate-400">
            Drop files here or click to upload
          </div>
          <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
            or
          </div>
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-emerald-300 focus:outline-none"
            placeholder="Paste the discharge info..."
          />
          <button
            className="rounded-full border border-emerald-300/60 bg-emerald-400/20 px-8 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onSimplify}
            disabled={isLoading}
          >
            {isLoading ? 'Simplifying...' : 'Simplify'}
          </button>
          <button className="text-xs uppercase tracking-[0.3em] text-slate-400">
            How it Works
          </button>
        </div>
      </div>

      <div className="w-full max-w-md">
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>
    </div>
  )
}

export default InputPage
