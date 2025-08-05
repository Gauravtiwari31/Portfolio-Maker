import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PortfolioCard from './PortfolioCard'

const TemplateSelector = ({ onSelect, selectedId = null }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load templates from JSON file
    fetch('/portfolios.json')
      .then(response => response.json())
      .then(data => {
        setTemplates(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading templates:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template, index) => (
        <motion.div
          key={template.id}
          className={`transition-all duration-200 ${
            selectedId === template.id 
              ? 'ring-2 ring-blue-500 ring-offset-2' 
              : ''
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PortfolioCard
            portfolio={template}
            onSelect={() => onSelect(template)}
            delay={index * 0.1}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default TemplateSelector