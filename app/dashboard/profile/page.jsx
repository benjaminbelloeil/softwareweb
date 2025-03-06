'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import ProfileCard from '../../components/dashboard/ProfileCard'

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Software Developer',
    bio: user?.bio || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    updateProfile(formData)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {isEditing ? (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-accenture-white dark:bg-accenture-darkGray rounded-2xl shadow-lg p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-accenture-black dark:text-accenture-white mb-6">Edit Profile</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-accenture-black dark:text-accenture-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-accenture-gray focus:ring-2 focus:ring-accenture-purple focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-accenture-black dark:text-accenture-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-accenture-gray focus:ring-2 focus:ring-accenture-purple focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-accenture-black dark:text-accenture-white mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-accenture-gray focus:ring-2 focus:ring-accenture-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-accenture-black dark:text-accenture-white mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-accenture-gray focus:ring-2 focus:ring-accenture-purple focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-accenture-darkGray hover:text-accenture-black dark:hover:text-accenture-white"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-accenture-purple text-white rounded-lg hover:bg-accenture-purple-dark"
              >
                Save Changes
              </motion.button>
            </div>
          </div>
        </motion.form>
      ) : (
        <ProfileCard onEdit={() => setIsEditing(true)} />
      )}
    </motion.div>
  )
}