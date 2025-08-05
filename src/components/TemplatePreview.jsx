import React from 'react'
import { motion } from 'framer-motion'
import ModernMinimalTemplate from '../templates/ModernMinimalTemplate'
import CreativeDarkTemplate from '../templates/CreativeDarkTemplate'
import TechFocusedTemplate from '../templates/TechFocusedTemplate'
import ElegantClassicTemplate from '../templates/ElegantClassicTemplate'
import PortfolioShowcaseTemplate from '../templates/PortfolioShowcaseTemplate'
import BusinessCardTemplate from '../templates/BusinessCardTemplate'

const TemplatePreview = ({ template, resume, compact = false, fullScreen = false }) => {
  const templateComponents = {
    'modern-minimal': ModernMinimalTemplate,
    'creative-dark': CreativeDarkTemplate,
    'tech-focused': TechFocusedTemplate,
    'elegant-classic': ElegantClassicTemplate,
    'portfolio-showcase': PortfolioShowcaseTemplate,
    'business-card': BusinessCardTemplate
  }

  const TemplateComponent = templateComponents[template?.id]

  if (!TemplateComponent) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Template not found</p>
      </div>
    )
  }

  const containerClasses = compact 
    ? "max-h-96 overflow-y-auto" 
    : fullScreen 
      ? "min-h-screen"
      : "min-h-[600px]"

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`bg-white rounded-lg border border-gray-200 ${containerClasses}`}
    >
      <TemplateComponent resume={resume} />
    </motion.div>
  )
}

export default TemplatePreview