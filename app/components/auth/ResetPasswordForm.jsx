'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa'

export default function ResetPasswordForm({ onBack }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call for password reset
    setTimeout(() => {
      setStatus({
        type: 'success',
        message: 'Password reset instructions sent to your email!'
      })
      setIsSubmitting(false)
    }, 1000)
    
    // In a real application, we would call the auth service:
    // try {
    //   await authService.resetPassword(email);
    //   setStatus({ type: 'success', message: 'Password reset instructions sent!' });
    // } catch (error) {
    //   setStatus({ type: 'error', message: error.message });
    // } finally {
    //   setIsSubmitting(false);
    // }
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
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  }

  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6"
    >
      <motion.div 
        className="flex items-center justify-between mb-4"
        variants={formVariants}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="text-accenture-purple p-2 rounded-full hover:bg-accenture-lightGray/30 transition-all duration-200"
        >
          <FaArrowLeft />
        </motion.button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-accenture-purple to-accenture-black bg-clip-text text-transparent">
          Reset Password
        </h2>
        <div className="w-6"></div>
      </motion.div>

      <motion.div
        variants={iconVariants}
        initial="initial"
        animate="animate"
        className="mx-auto w-20 h-20 bg-accenture-purple/10 dark:bg-accenture-purple/20 rounded-full flex items-center justify-center mb-6"
      >
        <FaEnvelope className="text-accenture-purple text-3xl" />
      </motion.div>

      <motion.p 
        variants={formVariants}
        className="text-gray-600 dark:text-gray-300 text-center mb-6"
      >
        Enter your email address and we'll send you instructions to reset your password.
      </motion.p>

      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg text-center text-sm ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-700' 
              : 'bg-red-50 text-red-600'
          }`}
        >
          {status.message}
        </motion.div>
      )}

      <motion.form 
        variants={formVariants}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <motion.div 
          variants={formVariants}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accenture-purple focus:border-transparent bg-white/50 backdrop-blur-sm text-gray-900 transition-all duration-200"
            placeholder="Your email"
            required
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3 px-4 bg-accenture-purple text-white font-medium rounded-xl shadow-lg shadow-accenture-purple/30 transition-all duration-200 
            ${isSubmitting ? 'opacity-80 cursor-not-allowed' : 'hover:opacity-90'}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            "Send Reset Instructions"
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
