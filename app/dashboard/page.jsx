'use client'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import DashboardCard from '../components/dashboard/DashboardCard'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Dashboard() {
  const { user } = useAuth()
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      }
    },
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2
      }
    }
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Call our internal API route instead of external API directly
        const response = await axios.get('/api/news', {
          params: {
            category: 'technology',
            language: 'en',
            pageSize: 8,
          }
        })
        
        setNews(response.data.articles);
        console.log("News API returned", response.data.articles.length, "articles");
      } catch (error) {
        console.error('Error fetching news:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-3xl font-bold text-accenture-black dark:text-accenture-white">
          Welcome back, {user?.name}!
        </h1>
        
        {/* Dashboard Cards */}
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

        {/* News Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-accenture-black dark:text-accenture-white mb-6">
            Latest Tech News
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading ? (
              [...Array(8)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-accenture-gray dark:bg-accenture-darkGray h-48 rounded-lg animate-pulse"
                />
              ))
            ) : (
              news.map((article, index) => (
                // Only render if article has all required data
                article && article.title && (
                  <motion.a
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accenture-white dark:bg-accenture-darkGray rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="h-48 overflow-hidden"
                    >
                      {article.urlToImage && (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-48 object-cover transform transition-transform duration-300"
                        />
                      )}
                    </motion.div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-accenture-black dark:text-accenture-white mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-accenture-darkGray dark:text-accenture-gray text-sm line-clamp-3">
                        {article.description}
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-accenture-darkGray dark:text-accenture-gray">
                          {new Date(article.publishedAt).toLocaleDateString()}
                        </span>
                        <motion.span 
                          className="text-accenture-purple text-sm"
                          whileHover={{ scale: 1.05 }}
                        >
                          Read more →
                        </motion.span>
                      </div>
                    </div>
                  </motion.a>
                )
              ))
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}