'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    login(formData.email, formData.password)
  }

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.form 
      className="space-y-6"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-red-50 text-red-600 text-sm"
        >
          {error}
        </motion.div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accenture-purple focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 transition-all duration-200"
          placeholder="Email"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accenture-purple focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 transition-all duration-200"
          placeholder="Password"
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 px-4 bg-accenture-purple hover:bg-accenture-purple text-white font-medium rounded-xl shadow-lg shadow-accenture-purple/30 transition-all duration-200"
      >
        Sign In
      </motion.button>
    </motion.form>
  )
}