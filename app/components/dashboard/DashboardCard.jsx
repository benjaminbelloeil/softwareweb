import { motion } from 'framer-motion'

export default function DashboardCard({ title, value, trend, positive }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
        {title}
      </h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        <span className={`ml-2 text-sm font-medium ${
          positive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trend}
        </span>
      </div>
    </motion.div>
  )
}