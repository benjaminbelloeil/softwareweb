'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { initializeUsers, verifyCredentials, addUser } from './users'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Initialize users database
    initializeUsers()
    
    // Keep user logged in if they refresh the page
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    const userData = verifyCredentials(email, password)
    
    if (userData) {
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
    try {
      const newUser = addUser({ name, email, password })
      
      // Remove password before storing in state
      const { password: _, ...safeUserData } = newUser
      
      setUser(safeUserData)
      localStorage.setItem('user', JSON.stringify(safeUserData))
      setError('')
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    router.push('/')
  }

  const updateProfile = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  } 

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, error, updateProfile}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)