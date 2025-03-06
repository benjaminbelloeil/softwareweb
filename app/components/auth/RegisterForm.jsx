import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const { register, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    register(formData.name, formData.email, formData.password)
  }

  return (
    <motion.form 
      className="space-y-6"
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

      {['name', 'email', 'password', 'confirmPassword'].map((field, index) => (
        <motion.div
          key={field}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
          </label>
          <input
            type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'}
            value={formData[field]}
            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accenture-purple focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 transition-all duration-200"
            placeholder={`${field.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^\w/, c => c.toUpperCase())}`}
            required
          />
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 px-4 bg-accenture-purple hover:bg-accenture-purple text-white font-medium rounded-xl shadow-lg shadow-accenture-purple/30 transition-all duration-200"
      >
        Create Account
      </motion.button>
    </motion.form>
  )
}