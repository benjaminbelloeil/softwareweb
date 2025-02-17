'use client'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import DashboardCard from '../components/dashboard/DashboardCard'

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome back, {user?.name}!
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Projects"
            value="1,234"
            trend="+12.3%"
            positive
          />
          <DashboardCard
            title="Tasks"
            value="85%"
            trend="+5.2%"
            positive
          />
          <DashboardCard
            title="Hours Worked"
            value="42%"
            trend="-3.1%"
            positive={false}
          />
        </div>
      </motion.div>
    </>
  )
}