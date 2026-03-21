import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  PiggyBank,
  LogOut,
  Shield,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import TruvexLogo from '/truvexlogo.png'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
    isActive ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
  }`

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col transform transition-transform duration-200 md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between gap-2 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <img src={TruvexLogo} alt="" className="w-9 shrink-0" />
            <div className="min-w-0">
              <div className="font-bold text-slate-900 truncate">Truvex Bank</div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
            </div>
          </Link>
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/dashboard" end className={linkClass} onClick={() => setOpen(false)}>
            <LayoutDashboard className="w-5 h-5 shrink-0" />
            Overview
          </NavLink>
          <NavLink to="/dashboard/savings" className={linkClass} onClick={() => setOpen(false)}>
            <PiggyBank className="w-5 h-5 shrink-0" />
            Savings
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin" className={linkClass} onClick={() => setOpen(false)}>
              <Shield className="w-5 h-5 shrink-0" />
              Admin
            </NavLink>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-700 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-semibold text-slate-800">Truvex</span>
          <span className="w-10" />
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-5xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
