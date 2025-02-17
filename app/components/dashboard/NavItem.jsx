export default function NavItem({ icon, text, active, onClick }) {
    return (
      <button 
        onClick={onClick}
        className={`flex items-center space-x-2 w-full px-4 py-3 mb-2 rounded-lg transition-colors duration-200 ${
          active 
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        {icon}
        <span>{text}</span>
      </button>
    )
  }