import { useState } from 'react'
import { Smartphone } from 'lucide-react'

interface SMSSenderProps {
  onSend: (phoneNumber: string) => Promise<void>
}

function SMSSender({ onSend }: SMSSenderProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    if (!phoneNumber.trim()) return
    setIsSending(true)
    try {
      await onSend(phoneNumber.trim())
      setPhoneNumber('')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">
        <Smartphone className="h-4 w-4 text-emerald-300" /> SMS Module
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          className="w-full rounded-full border border-slate-700 bg-slate-950/70 px-4 py-2 text-sm text-white focus:border-emerald-300 focus:outline-none"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />
        <button
          className="rounded-full border border-emerald-300/60 bg-emerald-400/20 px-5 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/30 disabled:cursor-not-allowed disabled:opacity-50"
          onClick={handleSend}
          disabled={isSending}
        >
          {isSending ? 'Sending...' : 'Send SMS'}
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">
        This will trigger a POST request to /send-sms.
      </p>
    </div>
  )
}

export default SMSSender
