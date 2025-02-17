'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NavItem({ icon, text, href, active, onClick }) {
  const Component = onClick ? 'button' : Link
  const props = onClick ? { onClick } : { href }

  return (
    <Component
      {...props}
      className={`flex items-center space-x-2 w-full px-4 py-3 mb-2 rounded-lg transition-colors ${
        active
          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
      }`}
    >
      <motion.div
        initial={false}
        animate={{ scale: active ? 1.1 : 1 }}
        className="flex items-center space-x-2"
      >
        {icon}
        <span>{text}</span>
      </motion.div>
    </Component>
  )
}