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
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  
  const articlesPerPage = 5

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

  // Reduce search query to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to first page on new search
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Call internal API route with search parameter
        const response = await axios.get('/api/news', {
          params: {
            category: 'technology',
            language: 'en',
            pageSize: 30,
            q: debouncedSearchQuery,
          }
        })
        
        setNews(response.data.articles || []);
        console.log("News API returned", response.data.articles?.length, "articles");
      } catch (error) {
        console.error('Error fetching news:', error)
        setNews([]);
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [debouncedSearchQuery])
  
  // Get current articles for page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(news.length / articlesPerPage);

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
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-2xl font-bold text-accenture-black dark:text-accenture-white">
              Latest Tech News
            </h2>
            
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-accenture-gray dark:border-accenture-darkGray bg-white dark:bg-accenture-black text-accenture-black dark:text-accenture-white focus:outline-none focus:ring-2 focus:ring-accenture-purple"
              />
              {loading && (
                <motion.div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <svg className="w-5 h-5 text-accenture-purple" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          </div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6"
          >
            {loading ? (
              [...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="bg-accenture-gray dark:bg-accenture-darkGray h-48 rounded-lg animate-pulse"
                />
              ))
            ) : news.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-accenture-black dark:text-accenture-white">No news articles found.</p>
              </div>
            ) : (
              currentArticles.map((article, index) => (
                // Only render if article has all required data
                article && article.title && (
                  <motion.a
                    key={index}
                    variants={cardVariants}
                    whileHover="hover"
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accenture-white dark:bg-accenture-darkGray rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col md:flex-row"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className="h-48 md:w-1/3 overflow-hidden"
                    >
                      {article.urlToImage ? (
                        <img
                          src={article.urlToImage}
                          alt={article.title}
                          className="w-full h-full object-cover transform transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">No image</span>
                        </div>
                      )}
                    </motion.div>
                    <div className="p-6 md:w-2/3">
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
          
          {/* Pagination */}
          {!loading && news.length > 0 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 rounded-md border transition-colors ${
                    currentPage === 1
                    ? 'text-gray-400 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                    : 'text-accenture-purple border-accenture-purple hover:bg-accenture-purple/10'
                  }`}
                >
                  Prev
                </button>
                
                <div className="flex items-center">
                  {/* Generate page buttons */}
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    
                    // Always show first page, last page, current page and pages +/- 1 from current
                    const showPage = pageNum === 1 || 
                                    pageNum === totalPages || 
                                    Math.abs(pageNum - currentPage) <= 1;
                                    
                    // Show ellipsis after first page if needed
                    if (pageNum === 2 && currentPage > 3) {
                      return <span key="ellipsis-1" className="mx-1">...</span>;
                    }
                    
                    // Show ellipsis before last page if needed
                    if (pageNum === totalPages - 1 && currentPage < totalPages - 2) {
                      return <span key="ellipsis-2" className="mx-1">...</span>;
                    }
                    
                    if (showPage) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 ${
                            currentPage === pageNum
                              ? 'bg-accenture-purple text-white'
                              : 'text-accenture-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    
                    return null;
                  })}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className={`px-3 py-1.5 rounded-md border transition-colors ${
                    currentPage === totalPages || totalPages === 0
                    ? 'text-gray-400 border-gray-300 dark:border-gray-700 cursor-not-allowed'
                    : 'text-accenture-purple border-accenture-purple hover:bg-accenture-purple/10'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}