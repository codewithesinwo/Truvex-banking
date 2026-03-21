import { useState } from 'react'
import { PiggyBank } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { formatMoney } from '../utils/format'

export default function Savings() {
  const { user, moveToSavings, moveFromSavings } = useAuth()
  const [toSave, setToSave] = useState('')
  const [fromSave, setFromSave] = useState('')
  const [msg, setMsg] = useState(null)

  function flash(r) {
    if (r.ok) {
      setMsg({ type: 'ok', text: 'Balances updated.' })
      setToSave('')
      setFromSave('')
    } else {
      setMsg({ type: 'err', text: r.error || 'Could not complete transfer.' })
    }
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <PiggyBank className="w-8 h-8 text-blue-700" />
          Savings
        </h1>
        <p className="text-slate-600 mt-1">
          Move money between checking and your savings balance. All data stays in this browser.
        </p>
      </div>

      {msg && (
        <div
          className={`p-4 rounded-xl border text-sm ${
            msg.type === 'ok'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {msg.text}
        </div>
      )}

      <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-8 text-white shadow-lg">
        <div className="text-blue-200 text-sm font-medium mb-2">Total saved</div>
        <div className="text-4xl font-bold tabular-nums">{formatMoney(user.savings)}</div>
        <p className="text-blue-200/80 text-sm mt-4 max-w-md">
          Your savings balance earns our demo rate. Build the habit by moving funds from checking whenever you can.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-2">Move to savings</h2>
          <p className="text-sm text-slate-600 mb-4">
            Transfers from checking: <span className="font-medium">{formatMoney(user.checking)}</span>{' '}
            available.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              value={toSave}
              onChange={(e) => setToSave(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button
              type="button"
              onClick={() => flash(moveToSavings(parseFloat(toSave)))}
              className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition"
            >
              Save
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-2">Move to checking</h2>
          <p className="text-sm text-slate-600 mb-4">
            Withdraw from savings back to your checking account when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              value={fromSave}
              onChange={(e) => setFromSave(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button
              type="button"
              onClick={() => flash(moveFromSavings(parseFloat(fromSave)))}
              className="px-6 py-3 border border-slate-300 text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition"
            >
              Move out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
