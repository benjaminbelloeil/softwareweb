'use client'
import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

const VALID_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const login = (email, password) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      setUser({ email, name: 'Benjamin!' })
      setError('')
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
      setTimeout(() => setError(''), 3000)
    }
  }

  const register = (name, email, password) => {
    setUser({ email, name })
    router.push('/dashboard')
  }

  const logout = () => {
    setUser(null)
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)