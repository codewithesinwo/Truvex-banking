import { hashPassword, randomSalt, verifyPassword } from './crypto'

const STORAGE_KEY = 'truvex_bank_v1'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function save(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function defaultState() {
  return {
    users: [],
    sessionUserId: null,
  }
}

export async function initBankStorage() {
  let state = load()
  if (!state) state = defaultState()

  const hasAdmin = state.users.some((u) => u.role === 'admin')
  if (!hasAdmin) {
    const salt = randomSalt()
    const passwordHash = await hashPassword('admin123', salt)
    state.users.push({
      id: crypto.randomUUID(),
      email: 'admin@truvex.bank',
      passwordHash,
      salt,
      fullName: 'System Administrator',
      role: 'admin',
      checking: 0,
      savings: 0,
      transactions: [],
      createdAt: new Date().toISOString(),
    })
    save(state)
  } else {
    save(state)
  }
  return state
}

function getState() {
  return load() || defaultState()
}

export function getSessionUserId() {
  return getState().sessionUserId
}

export function setSessionUserId(userId) {
  const state = getState()
  state.sessionUserId = userId
  save(state)
}

export function clearSession() {
  const state = getState()
  state.sessionUserId = null
  save(state)
}

export function getUserById(id) {
  const u = getState().users.find((x) => x.id === id)
  if (!u) return null
  return sanitizeUser(u)
}

function sanitizeUser(u) {
  const { passwordHash, salt, ...rest } = u
  return rest
}

export function getAllUsersPublic() {
  return getState().users.map((u) => sanitizeUser(u))
}

function findUserByEmail(email) {
  const e = email.trim().toLowerCase()
  return getState().users.find((u) => u.email.toLowerCase() === e)
}

export async function registerUser({ email, password, fullName }) {
  const state = getState()
  if (findUserByEmail(email)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }
  const salt = randomSalt()
  const passwordHash = await hashPassword(password, salt)
  const user = {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    passwordHash,
    salt,
    fullName: fullName.trim(),
    role: 'user',
    checking: 0,
    savings: 0,
    transactions: [],
    createdAt: new Date().toISOString(),
  }
  state.users.push(user)
  save(state)
  return { ok: true, user: sanitizeUser(user) }
}

export async function loginUser(email, password) {
  const u = findUserByEmail(email)
  if (!u) return { ok: false, error: 'Invalid email or password.' }
  const valid = await verifyPassword(password, u.salt, u.passwordHash)
  if (!valid) return { ok: false, error: 'Invalid email or password.' }
  setSessionUserId(u.id)
  return { ok: true, user: sanitizeUser(u) }
}

export function logoutUser() {
  clearSession()
}

function mutateUser(userId, fn) {
  const state = getState()
  const idx = state.users.findIndex((u) => u.id === userId)
  if (idx === -1) return null
  const copy = { ...state.users[idx], transactions: [...state.users[idx].transactions] }
  fn(copy)
  state.users[idx] = copy
  save(state)
  return sanitizeUser(copy)
}

function addTxn(user, { type, amount, description, balanceAfter }) {
  user.transactions.unshift({
    id: crypto.randomUUID(),
    type,
    amount,
    description,
    balanceAfter,
    account: type.startsWith('savings') ? 'savings' : 'checking',
    createdAt: new Date().toISOString(),
  })
}

export function depositChecking(userId, amount, description = 'Deposit') {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: 'Enter a valid positive amount.' }
  }
  const u = mutateUser(userId, (user) => {
    user.checking += amount
    addTxn(user, {
      type: 'deposit',
      amount,
      description,
      balanceAfter: user.checking,
    })
  })
  return u ? { ok: true, user: u } : { ok: false, error: 'User not found.' }
}

export function withdrawChecking(userId, amount, description = 'Withdrawal') {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: 'Enter a valid positive amount.' }
  }
  const state = getState()
  const raw = state.users.find((u) => u.id === userId)
  if (!raw) return { ok: false, error: 'User not found.' }
  if (raw.checking < amount) return { ok: false, error: 'Insufficient checking balance.' }
  const u = mutateUser(userId, (user) => {
    user.checking -= amount
    addTxn(user, {
      type: 'withdraw',
      amount,
      description,
      balanceAfter: user.checking,
    })
  })
  return { ok: true, user: u }
}

export function moveToSavings(userId, amount) {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: 'Enter a valid positive amount.' }
  }
  const state = getState()
  const raw = state.users.find((u) => u.id === userId)
  if (!raw) return { ok: false, error: 'User not found.' }
  if (raw.checking < amount) return { ok: false, error: 'Insufficient checking balance.' }
  const u = mutateUser(userId, (user) => {
    user.checking -= amount
    user.savings += amount
    addTxn(user, {
      type: 'savings_in',
      amount,
      description: 'Transfer to savings',
      balanceAfter: user.savings,
    })
  })
  return { ok: true, user: u }
}

export function moveFromSavings(userId, amount) {
  if (!Number.isFinite(amount) || amount <= 0) {
    return { ok: false, error: 'Enter a valid positive amount.' }
  }
  const state = getState()
  const raw = state.users.find((u) => u.id === userId)
  if (!raw) return { ok: false, error: 'User not found.' }
  if (raw.savings < amount) return { ok: false, error: 'Insufficient savings balance.' }
  const u = mutateUser(userId, (user) => {
    user.savings -= amount
    user.checking += amount
    addTxn(user, {
      type: 'savings_out',
      amount,
      description: 'Transfer from savings to checking',
      balanceAfter: user.savings,
    })
  })
  return { ok: true, user: u }
}

export function adminAdjustBalance(userId, field, amount) {
  if (!['checking', 'savings'].includes(field)) return { ok: false, error: 'Invalid field.' }
  if (!Number.isFinite(amount) || amount === 0) {
    return { ok: false, error: 'Enter a non-zero amount.' }
  }
  const u = mutateUser(userId, (user) => {
    user[field] = Math.max(0, (user[field] || 0) + amount)
    addTxn(user, {
      type: 'admin_adjust',
      amount: Math.abs(amount),
      description:
        amount >= 0 ? `Admin credit (${field})` : `Admin debit (${field})`,
      balanceAfter: user[field],
    })
  })
  return u ? { ok: true, user: u } : { ok: false, error: 'User not found.' }
}
