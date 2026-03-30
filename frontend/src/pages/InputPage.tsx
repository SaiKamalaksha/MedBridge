import { useRef } from 'react'
import { FileText, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'

interface InputPageProps {
  onSimplify: () => Promise<void>
  isLoading: boolean
  inputText: string
  onTextChange: (text: string) => void
  onFileChange: (file: File | null) => void
  selectedFile: File | null
}

function InputPage({
  onSimplify,
  isLoading,
  inputText,
  onTextChange,
  onFileChange,
  selectedFile,
}: InputPageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'application/pdf') {
      onFileChange(file)
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/50 p-10 shadow-[0_20px_60px_rgba(2,6,23,0.55)]">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70">
            <FileText className="h-8 w-8 text-emerald-300" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Upload the Discharge Info</h1>
            <p className="text-sm text-slate-300">
              Drag and drop a PDF or paste the discharge summary below.
            </p>
          </div>

          {/* PDF upload zone */}
          <div
            className="w-full cursor-pointer rounded-2xl border border-dashed border-slate-700 bg-slate-950/60 px-6 py-8 text-sm text-slate-400 transition hover:border-emerald-300/50 hover:text-slate-300"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-5 w-5" />
              {selectedFile
                ? <span className="text-emerald-300">{selectedFile.name}</span>
                : <span>Drop PDF here or click to upload</span>
              }
            </div>
          </div>

          <div className="text-xs uppercase tracking-[0.4em] text-slate-400">or</div>

          {/* Text input */}
          <textarea
            className="min-h-[120px] w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 focus:border-emerald-300 focus:outline-none"
            placeholder="Paste the discharge info..."
            value={inputText}
            onChange={(e) => onTextChange(e.target.value)}
          />

          <button
            className="rounded-full border border-emerald-300/60 bg-emerald-400/20 px-8 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onSimplify}
            disabled={isLoading || (!inputText.trim() && !selectedFile)}
          >
            {isLoading ? 'Simplifying...' : 'Simplify'}
          </button>

          <Link
            className="text-xs uppercase tracking-[0.3em] text-slate-400 hover:text-white"
            to="/how-it-works"
          >
            How it Works
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InputPage
