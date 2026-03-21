import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import TruvexLogo from '/truvexlogo.png'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, isAuthenticated } = useAuth()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'About Us', href: '/#about' },
    { name: 'Help', href: '/#help' },
  ]

  return (
    <header className="w-full bg-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={TruvexLogo} alt="Truvex Logo" className="w-8" />
          <h1 className="text-xl font-semibold text-gray-800">
            <span className="font-bold text-gray-900">Truvex</span> Bank
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          {navLinks.map((link, index) => (
            <a key={index} href={link.href} className="transition hover:text-blue-600">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <Search className="w-5 h-5 text-gray-600 cursor-pointer" aria-hidden />

          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                Dashboard
              </Link>
              <span className="text-sm text-gray-500 max-w-[140px] truncate hidden sm:inline">
                {user?.email}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 font-medium hover:text-blue-600">
                Login
              </Link>

              <div className="w-px h-6 bg-gray-300" />

              <Link
                to="/register"
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg shadow-md transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
