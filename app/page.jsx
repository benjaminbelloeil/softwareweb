'use client'
import { useState } from 'react'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { useTheme } from './components/theme/ThemeProvider'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-dark-bg transition-colors duration-200">
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
      </button>
      
      <div className="w-full max-w-md bg-white dark:bg-dark-card rounded-lg shadow-lg p-8 transition-colors duration-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <button 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm hover:underline transition-colors duration-200"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account?' : 'Already have an account?'}
          </button>
        </div>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </div>
    </main>
  )
}