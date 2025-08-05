import React from 'react'
import { motion } from 'framer-motion'
import { Eye, ArrowRight } from 'lucide-react'

const PortfolioCard = ({ portfolio, onSelect, delay = 0 }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    gray: 'bg-gray-500',
    orange: 'bg-orange-500'
  }

  const complexityLabels = {
    simple: 'Simple',
    medium: 'Medium',
    complex: 'Advanced'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      layout
      className="card group hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onSelect}
    >
      {/* Preview Image Placeholder */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
        <div className={`w-16 h-16 ${colorClasses[portfolio.color]} rounded-lg opacity-20`}></div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-full p-2 shadow-lg"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {portfolio.title}
          </h3>
          <span className={`w-3 h-3 ${colorClasses[portfolio.color]} rounded-full flex-shrink-0 mt-1`}></span>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2">
          {portfolio.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {portfolio.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {portfolio.tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              +{portfolio.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <span className="capitalize">{portfolio.category}</span>
            <span>•</span>
            <span>{complexityLabels[portfolio.complexity]}</span>
          </div>
          
          <motion.div
            whileHover={{ x: 2 }}
            className="flex items-center text-blue-600 text-sm font-medium"
          >
            <span>Use Template</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default PortfolioCard