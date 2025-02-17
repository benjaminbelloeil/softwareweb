'use client'
import { motion } from 'framer-motion'
import { FiHome, FiSettings, FiUser, FiLogOut } from 'react-icons/fi'
import NavItem from './NavItem'
import { useAuth } from '@/app/context/AuthContext'

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <motion.nav 
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
          Dashboard
        </h2>
      </div>
      <div className="px-4">
        <NavItem icon={<FiHome />} text="Home" active />
        <NavItem icon={<FiUser />} text="Profile" />
        <NavItem icon={<FiSettings />} text="Settings" />
        <NavItem 
          icon={<FiLogOut />} 
          text="Logout" 
          onClick={logout}
        />
      </div>
    </motion.nav>
  )
}