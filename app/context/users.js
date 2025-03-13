// Simple user management system using localStorage as database

// Initialize users storage if it doesn't exist
export const initializeUsers = () => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('users')
    if (!users) {
      // Create with default admin user
      const initialUsers = [
        {
          name: 'Benjamin',
          email: 'benjaminbelloeil03@gmail.com',
          password: 'benjamin'
        }
      ]
      localStorage.setItem('users', JSON.stringify(initialUsers))
    }
  }
}

// Get all users
export const getUsers = () => {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('users')
    return users ? JSON.parse(users) : []
  }
  return []
}

// Find user by email
export const findUserByEmail = (email) => {
  const users = getUsers()
  return users.find(user => user.email === email)
}

// Add a new user
export const addUser = (userData) => {
  const users = getUsers()
  
  // Check if user already exists
  if (findUserByEmail(userData.email)) {
    throw new Error('User with this email already exists')
  }
  
  // Add new user
  users.push(userData)
  localStorage.setItem('users', JSON.stringify(users))
  return userData
}

// Verify credentials
export const verifyCredentials = (email, password) => {
  const user = findUserByEmail(email)
  if (user && user.password === password) {
    // Return user without password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}
