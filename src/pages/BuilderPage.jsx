import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Edit3, Eye, Download, Globe, ChevronLeft, Save } from 'lucide-react'
import usePortfolioStore from '../store/portfolioStore'
import ResumeEditor from '../components/ResumeEditor'
import TemplatePreview from '../components/TemplatePreview'
import TemplateSelector from '../components/TemplateSelector'
import ExportModal from '../components/ExportModal'

const BuilderPage = ({ onNavigate, selectedTemplate }) => {
  const [viewMode, setViewMode] = useState('edit') // 'edit', 'preview', 'split'
  const [showExport, setShowExport] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved')
  
  const { 
    resume, 
    selectedTemplate: storeTemplate, 
    setSelectedTemplate,
    isEditing,
    setIsEditing
  } = usePortfolioStore()

  useEffect(() => {
    if (selectedTemplate && !storeTemplate) {
      setSelectedTemplate(selectedTemplate)
    }
  }, [selectedTemplate, storeTemplate, setSelectedTemplate])

  useEffect(() => {
    // Auto-save functionality
    const timer = setTimeout(() => {
      setAutoSaveStatus('saved')
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [resume])

  const handleResumeChange = () => {
    setAutoSaveStatus('saving')
  }

  const handleTemplateChange = (template) => {
    setSelectedTemplate(template)
  }

  const renderModeSelector = () => (
    <div className="flex items-center bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => setViewMode('edit')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'edit'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Edit3 className="w-4 h-4 mr-2 inline" />
        Edit
      </button>
      <button
        onClick={() => setViewMode('preview')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'preview'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Eye className="w-4 h-4 mr-2 inline" />
        Preview
      </button>
      <button
        onClick={() => setViewMode('split')}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          viewMode === 'split'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Split View
      </button>
    </div>
  )

  const renderAutoSaveStatus = () => (
    <div className="flex items-center space-x-2 text-sm">
      {autoSaveStatus === 'saving' && (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
          />
          <span className="text-gray-600">Saving...</span>
        </>
      )}
      {autoSaveStatus === 'saved' && (
        <>
          <Save className="w-4 h-4 text-green-500" />
          <span className="text-gray-600">Saved</span>
        </>
      )}
    </div>
  )

  const renderContent = () => {
    switch (viewMode) {
      case 'edit':
        return (
          <div className="space-y-6">
            {!storeTemplate && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">Choose a Template</h3>
                <p className="text-sm text-yellow-700 mb-4">
                  Select a template to see how your portfolio will look.
                </p>
                <TemplateSelector onSelect={handleTemplateChange} />
              </div>
            )}
            <ResumeEditor onChange={handleResumeChange} />
          </div>
        )
      
      case 'preview':
        return (
          <div className="space-y-6">
            {storeTemplate ? (
              <TemplatePreview template={storeTemplate} resume={resume} />
            ) : (
              <div className="text-center py-12">
                <Eye className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Template Selected</h3>
                <p className="text-gray-600 mb-4">Choose a template to preview your portfolio</p>
                <button
                  onClick={() => setViewMode('edit')}
                  className="btn-primary"
                >
                  Select Template
                </button>
              </div>
            )}
          </div>
        )
      
      case 'split':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Edit Content</h3>
              <ResumeEditor onChange={handleResumeChange} compact />
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              {storeTemplate ? (
                <TemplatePreview template={storeTemplate} resume={resume} compact />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">Select a template to see preview</p>
                </div>
              )}
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('discovery')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Templates
          </button>
          
          {storeTemplate && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-900">{storeTemplate.title}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {renderAutoSaveStatus()}
          {renderModeSelector()}
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowExport(true)}
              className="btn-secondary flex items-center space-x-2"
              disabled={!storeTemplate}
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => onNavigate('preview')}
              className="btn-primary flex items-center space-x-2"
              disabled={!storeTemplate}
            >
              <Globe className="w-4 h-4" />
              <span>Deploy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {renderContent()}
      </motion.div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          template={storeTemplate}
          resume={resume}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}

export default BuilderPage