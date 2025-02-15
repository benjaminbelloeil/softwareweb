import { motion } from 'framer-motion'

export default function LoginForm() {
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  }

  return (
    <form className="space-y-6">
      <motion.div
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={1}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Email"
          required
        />
      </motion.div>
      
      <motion.div
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={2}
        className="space-y-2"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white transition-all duration-200"
          placeholder="Password"
          required
        />
      </motion.div>

      <motion.button
        variants={inputVariants}
        initial="hidden"
        animate="visible"
        custom={3}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/30 dark:shadow-blue-800/30 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-200"
      >
        Sign In
      </motion.button>
    </form>
  )
}