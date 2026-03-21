import { useCallback, useEffect, useState } from 'react'
import { Shield, Users } from 'lucide-react'
import { adminAdjustBalance, getAllUsersPublic } from '../lib/bankStorage'
import { formatDate, formatMoney } from '../utils/format'

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [adjust, setAdjust] = useState({})
  const [msg, setMsg] = useState(null)

  const load = useCallback(() => {
    setUsers(getAllUsersPublic())
  }, [])

  useEffect(() => {
    load()
  }, [load])

  function handleAdjust(userId, field, rawAmount) {
    const n = parseFloat(rawAmount)
    if (Number.isNaN(n) || n === 0) {
      setMsg({ type: 'err', text: 'Enter a non-zero amount.' })
      return
    }
    const r = adminAdjustBalance(userId, field, n)
    if (!r.ok) {
      setMsg({ type: 'err', text: r.error })
      return
    }
    setMsg({ type: 'ok', text: 'Balance updated.' })
    setAdjust((prev) => ({ ...prev, [`${userId}-${field}`]: '' }))
    load()
  }

  const totals = users.reduce(
    (acc, u) => {
      acc.checking += u.checking || 0
      acc.savings += u.savings || 0
      return acc
    },
    { checking: 0, savings: 0 },
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-8 h-8 text-blue-800" />
          Admin
        </h1>
        <p className="text-slate-600 mt-1">View all customers and adjust balances (demo).</p>
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

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
            <Users className="w-4 h-4" />
            Accounts
          </div>
          <div className="text-2xl font-bold text-slate-900">{users.length}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-slate-500 text-sm mb-1">Total checking</div>
          <div className="text-2xl font-bold tabular-nums">{formatMoney(totals.checking)}</div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="text-slate-500 text-sm mb-1">Total savings</div>
          <div className="text-2xl font-bold tabular-nums">{formatMoney(totals.savings)}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Role</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Checking</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Savings</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Joined</th>
              <th className="px-4 py-3 font-semibold text-slate-700">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-900">{u.fullName}</td>
                <td className="px-4 py-3 text-slate-600">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(u.checking)}</td>
                <td className="px-4 py-3 tabular-nums">{formatMoney(u.savings)}</td>
                <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                  {formatDate(u.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <div className="flex gap-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Δ checking"
                        value={adjust[`${u.id}-checking`] ?? ''}
                        onChange={(e) =>
                          setAdjust((prev) => ({
                            ...prev,
                            [`${u.id}-checking`]: e.target.value,
                          }))
                        }
                        className="w-full min-w-0 px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        className="shrink-0 px-2 py-1.5 bg-blue-900 text-white text-xs rounded-lg"
                        onClick={() => handleAdjust(u.id, 'checking', adjust[`${u.id}-checking`])}
                      >
                        Apply
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Δ savings"
                        value={adjust[`${u.id}-savings`] ?? ''}
                        onChange={(e) =>
                          setAdjust((prev) => ({
                            ...prev,
                            [`${u.id}-savings`]: e.target.value,
                          }))
                        }
                        className="w-full min-w-0 px-2 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        className="shrink-0 px-2 py-1.5 border border-slate-300 text-xs rounded-lg"
                        onClick={() => handleAdjust(u.id, 'savings', adjust[`${u.id}-savings`])}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
