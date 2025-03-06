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
          ? 'bg-accenture-lightGray dark:bg-accenture-darkGray text-accenture-purple dark:text-accenture-white'
          : 'text-accenture-black dark:text-accenture-gray hover:bg-accenture-gray dark:hover:bg-accenture-lightGray'
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