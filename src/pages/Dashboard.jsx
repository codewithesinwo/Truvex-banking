import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightLeft, PiggyBank, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { formatDate, formatMoney } from '../utils/format'

export default function Dashboard() {
  const { user, depositChecking, withdrawChecking } = useAuth()
  const [depositAmt, setDepositAmt] = useState('')
  const [withdrawAmt, setWithdrawAmt] = useState('')
  const [msg, setMsg] = useState(null)

  function showResult(r) {
    if (r.ok) {
      setMsg({ type: 'ok', text: 'Updated successfully.' })
      setDepositAmt('')
      setWithdrawAmt('')
    } else {
      setMsg({ type: 'err', text: r.error || 'Something went wrong.' })
    }
  }

  if (!user) return null

  const recent = (user.transactions || []).slice(0, 8)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          Hello, {user.fullName?.split(' ')[0] || 'there'}
        </h1>
        <p className="text-slate-600 mt-1">Here’s your account overview.</p>
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

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-2">
            <TrendingUp className="w-4 h-4" />
            Checking
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {formatMoney(user.checking)}
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-6 shadow-sm text-white">
          <div className="flex items-center gap-2 text-blue-200 text-sm font-medium mb-2">
            <PiggyBank className="w-4 h-4" />
            Savings
          </div>
          <div className="text-3xl font-bold tabular-nums">{formatMoney(user.savings)}</div>
          <Link
            to="/dashboard/savings"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-blue-100 hover:text-white"
          >
            Manage savings
            <ArrowRightLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Add funds (demo deposit)</h2>
          <p className="text-sm text-slate-600 mb-4">
            Simulates money arriving in your checking account. Data is stored in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={depositAmt}
              onChange={(e) => setDepositAmt(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                const n = parseFloat(depositAmt)
                showResult(depositChecking(n, 'Deposit'))
              }}
              className="px-6 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition"
            >
              Deposit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-semibold text-slate-900 mb-4">Withdraw from checking</h2>
          <p className="text-sm text-slate-600 mb-4">Move funds out of checking (demo withdrawal).</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={withdrawAmt}
              onChange={(e) => setWithdrawAmt(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none"
            />
            <button
              type="button"
              onClick={() => {
                const n = parseFloat(withdrawAmt)
                showResult(withdrawChecking(n, 'Withdrawal'))
              }}
              className="px-6 py-3 border border-slate-300 text-slate-800 font-semibold rounded-xl hover:bg-slate-50 transition"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900">Recent activity</h2>
        </div>
        {recent.length === 0 ? (
          <p className="p-6 text-slate-500 text-sm">No transactions yet. Make a deposit to get started.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recent.map((t) => (
              <li key={t.id} className="px-6 py-3 flex flex-wrap items-center justify-between gap-2 text-sm">
                <div>
                  <div className="font-medium text-slate-900">{t.description}</div>
                  <div className="text-slate-500 text-xs">{formatDate(t.createdAt)}</div>
                </div>
                <div className="text-slate-700 tabular-nums font-medium">{formatMoney(t.amount)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
