import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import ImpactPage from './pages/ImpactPage'
import InputPage from './pages/InputPage'
import ResultsPage from './pages/ResultsPage'
import { mockDischargeData } from './data/mockData'
import { DischargeSummary } from './types/med'

function App() {
  const location = useLocation()
  const [analysisData, setAnalysisData] = useState<DischargeSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSimplify = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1400))
    setAnalysisData(mockDischargeData)
    setIsLoading(false)
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
            <Link className="hover:text-white" to="/">
              Input
            </Link>
            <Link className="hover:text-white" to="/results">
              Results
            </Link>
            <Link className="hover:text-white" to="/impact">
              Impact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div {...pageTransition}>
                  <InputPage onSimplify={handleSimplify} isLoading={isLoading} />
                </motion.div>
              }
            />
            <Route
              path="/results"
              element={
                <motion.div {...pageTransition}>
                  <ResultsPage data={analysisData} />
                </motion.div>
              }
            />
            <Route
              path="/impact"
              element={
                <motion.div {...pageTransition}>
                  <ImpactPage />
                </motion.div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 px-8 py-6">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
            <p className="text-sm text-slate-200">Reading your documents...</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
