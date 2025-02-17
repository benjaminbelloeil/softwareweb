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
      className="bg-white rounded-2xl shadow-lg p-8"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-600">{user?.role || 'Software Developer'}</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEdit}
          className="p-2 text-gray-600 hover:text-blue-500"
        >
          <FiEdit2 size={20} />
        </motion.button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 text-gray-600">
          <FiMail />
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <FiBriefcase />
          <span>{user?.role || 'Software Developer'}</span>
        </div>
      </div>

      {user?.bio && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
          <p className="text-gray-600">{user.bio}</p>
        </div>
      )}
    </motion.div>
  )
}