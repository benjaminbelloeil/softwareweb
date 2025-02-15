'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import { useTheme } from './components/theme/ThemeProvider'
import { FiMoon, FiSun } from 'react-icons/fi'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const { darkMode, toggleDarkMode } = useTheme()

  const pageVariants = {
    enter: {
      opacity: 0,
      y: 10,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-3 rounded-full bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-lg transition-colors duration-200"
        aria-label="Toggle theme"
      >
        {darkMode ? <FiSun className="w-6 h-6 text-yellow-400" /> : <FiMoon className="w-6 h-6 text-blue-600" />}
      </motion.button>
      
      <div className="w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl p-8 border border-white/20 dark:border-gray-700/50 overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isLogin ? 'login' : 'register'}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                {isLogin ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 px-4 border-2 border-blue-500 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-200"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </motion.button>
        </div>
      </div>
    </main>
  )
}