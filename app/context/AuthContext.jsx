'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const AuthContext = createContext({})

const VALID_CREDENTIALS = {
  email: 'test@example.com',
  password: 'password123'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Keep user logged in if they refresh the page
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
      const userData = { email, name: 'Benjamin' }
      setUser(userData)
      localStorage.setItem('user', JSON.stringify(userData))
      setError('')
      router.push('/dashboard')
    } else {
      setError('Invalid credentials')
      setTimeout(() => setError(''), 3000)
    }
  }

  const register = (name, email, password) => {
    const userData = { name, email }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    router.push('/dashboard')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)