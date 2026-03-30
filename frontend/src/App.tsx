import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HowItWorksPage from './pages/HowItWorksPage'
import ImpactPage from './pages/ImpactPage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
import type { DischargeSummary } from './types/med'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [analysisData, setAnalysisData] = useState<DischargeSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [inputText, setInputText] = useState('')
  const [inputFile, setInputFile] = useState<File | null>(null)
  const [language, setLanguage] = useState('English')
  const [error, setError] = useState<string | null>(null)

  const handleSimplify = async () => {
    setError(null)
    setIsLoading(true)

    try {
      let text = inputText

      if (inputFile) {
        const formData = new FormData()
        formData.append('file', inputFile)
        const pdfRes = await fetch(`${API_URL}/extract-pdf`, {
          method: 'POST',
          body: formData,
        })
        if (!pdfRes.ok) throw new Error('PDF extraction failed')
        const pdfData = await pdfRes.json()
        text = pdfData.text
      }

      if (!text.trim()) {
        setError('Please paste discharge notes or upload a PDF.')
        setIsLoading(false)
        return
      }

      console.log('Sending language:', language)
      const res = await fetch(`${API_URL}/simplify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language }),
      })

      if (!res.ok) throw new Error('Simplification failed')
      const data = await res.json()
      setAnalysisData(data)
      navigate('/results')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const pageTransition = useMemo(
    () => ({
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.35 } },
      exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
    }),
    [],
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800/70 bg-gradient-to-r from-[#0b0622] via-[#14072e] to-[#0b0622]">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-5">
          <div className="text-xl font-semibold tracking-wide">MedBridge</div>
          <nav className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-slate-300">
            <Link className="hover:text-white" to="/">Input</Link>
            <Link className="hover:text-white" to="/results">Results</Link>
            <Link className="hover:text-white" to="/impact">Impact</Link>
            <Link className="hover:text-white" to="/how-it-works">Learn More</Link>
            <select
              className="ml-2 rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-slate-200 focus:border-emerald-300 focus:outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10">
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <InputPage
                    onSimplify={handleSimplify}
                    isLoading={isLoading}
                    inputText={inputText}
                    onTextChange={setInputText}
                    onFileChange={setInputFile}
                    selectedFile={inputFile}
                  />
                </motion.div>
              }
            />
            <Route path="/how-it-works" element={<motion.div {...pageTransition}><HowItWorksPage /></motion.div>} />
            <Route path="/results" element={<motion.div {...pageTransition}><ResultsPage data={analysisData} /></motion.div>} />
            <Route path="/impact" element={<motion.div {...pageTransition}><ImpactPage /></motion.div>} />
          </Routes>
        </AnimatePresence>
      </main>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 px-8 py-6">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
            <p className="text-sm text-slate-200">Reading your documents...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App