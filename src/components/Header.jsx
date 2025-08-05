import React from 'react'
import { FileText, Palette, Eye } from 'lucide-react'

const Header = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'discovery', label: 'Discover', icon: Palette },
    { id: 'builder', label: 'Build', icon: FileText },
    { id: 'preview', label: 'Preview', icon: Eye }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Portfolio Maker</h1>
            <span className="ml-2 text-sm text-gray-500">Transform your resume into a portfolio</span>
          </div>
          
          <nav className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header