'use client'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { FiMail, FiBriefcase, FiEdit2 } from 'react-icons/fi'

export default function ProfileCard({ onEdit }) {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-accenture-white dark:bg-accenture-darkGray rounded-2xl shadow-lg p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-accenture-purple to-accenture-black flex items-center justify-center">
            <span className="text-2xl font-bold text-accenture-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-accenture-black dark:text-accenture-white">{user?.name}</h2>
            <p className="text-accenture-darkGray">{user?.role || 'Software Developer'}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="p-2 text-accenture-darkGray hover:text-accenture-purple"
        >
          <FiEdit2 size={20} />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-accenture-darkGray">
          <FiMail />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-accenture-darkGray">
          <FiBriefcase />
          <span>{user?.role || 'Software Developer'}</span>
        </div>
      </div>

      {user?.bio && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-accenture-black dark:text-accenture-white mb-2">About</h3>
          <p className="text-accenture-darkGray">{user.bio}</p>
        </div>
      )}
    </motion.div>
  )
}