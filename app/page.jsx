'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import Head from 'next/head'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)

  const pageVariants = {
    enter: {
      opacity: 0,
      y: 10,
    },
    center: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  }

  return (
    <>
    <Head>
      <title>{isLogin ? 'Login - SoftwareWeb' : 'Register - SoftwareWeb'}</title>
      <meta name="description" content="Welcome to SoftwareWeb. Please login or create an account." />
    </Head>
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-accenture-gray to-accenture-lightGray dark:from-accenture-darkGray dark:to-accenture-black transition-colors duration-500">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-lg bg-accenture-white/80 dark:bg-accenture-darkGray/80 rounded-2xl shadow-2xl p-8 border border-accenture-white/20 dark:border-accenture-gray/50 overflow-hidden">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-accenture-purple to-accenture-black dark:from-accenture-purple dark:to-accenture-black bg-clip-text text-transparent">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isLogin ? 'login' : 'register'}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative"
              >
                {isLogin ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 px-4 border-2 border-accenture-purple dark:border-accenture-lightGray text-accenture-purple dark:text-accenture-lightGray font-medium rounded-xl hover:bg-accenture-lightGray dark:hover:bg-accenture-darkGray transition-all duration-200"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </motion.button>
        </div>
      </div>
    </main>
    </>
  )
}