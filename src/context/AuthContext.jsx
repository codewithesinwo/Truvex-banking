import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  depositChecking as bankDepositChecking,
  getSessionUserId,
  getUserById,
  initBankStorage,
  loginUser,
  logoutUser,
  moveFromSavings as bankMoveFromSavings,
  moveToSavings as bankMoveToSavings,
  registerUser,
  withdrawChecking as bankWithdrawChecking,
} from '../lib/bankStorage'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  const refreshUser = useCallback(() => {
    const id = getSessionUserId()
    if (!id) {
      setUser(null)
      return
    }
    setUser(getUserById(id))
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await initBankStorage()
      if (cancelled) return
      refreshUser()
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
  }, [refreshUser])

  const login = useCallback(async (email, password) => {
    const res = await loginUser(email, password)
    if (res.ok) setUser(res.user)
    return res
  }, [])

  const register = useCallback(async (payload) => {
    const res = await registerUser(payload)
    if (res.ok) {
      const loginRes = await loginUser(payload.email, payload.password)
      if (loginRes.ok) setUser(loginRes.user)
    }
    return res
  }, [])

  const logout = useCallback(() => {
    logoutUser()
    setUser(null)
  }, [])

  const patchUser = useCallback((next) => {
    setUser(next)
  }, [])

  const value = useMemo(
    () => ({
      user,
      ready,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      refreshUser,
      depositChecking: (amount, description) => {
        if (!user) return { ok: false, error: 'Not signed in.' }
        const r = bankDepositChecking(user.id, amount, description)
        if (r.ok) patchUser(r.user)
        return r
      },
      withdrawChecking: (amount, description) => {
        if (!user) return { ok: false, error: 'Not signed in.' }
        const r = bankWithdrawChecking(user.id, amount, description)
        if (r.ok) patchUser(r.user)
        return r
      },
      moveToSavings: (amount) => {
        if (!user) return { ok: false, error: 'Not signed in.' }
        const r = bankMoveToSavings(user.id, amount)
        if (r.ok) patchUser(r.user)
        return r
      },
      moveFromSavings: (amount) => {
        if (!user) return { ok: false, error: 'Not signed in.' }
        const r = bankMoveFromSavings(user.id, amount)
        if (r.ok) patchUser(r.user)
        return r
      },
    }),
    [user, ready, login, register, logout, refreshUser, patchUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
