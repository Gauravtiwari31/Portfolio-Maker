import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Globe, Download, Share2, ExternalLink } from 'lucide-react'
import usePortfolioStore from '../store/portfolioStore'
import TemplatePreview from '../components/TemplatePreview'
import ExportModal from '../components/ExportModal'

const PreviewPage = ({ onNavigate, selectedTemplate }) => {
  const [showExport, setShowExport] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState(null)
  
  const { resume, selectedTemplate: storeTemplate } = usePortfolioStore()
  
  const template = selectedTemplate || storeTemplate

  const handleDeploy = async () => {
    setDeploymentStatus('deploying')
    
    try {
      // Simulate deployment process
      await new Promise(resolve => setTimeout(resolve, 3000))
      setDeploymentStatus('success')
    } catch (error) {
      setDeploymentStatus('error')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resume.basics.name}'s Portfolio`,
          text: 'Check out my portfolio website!',
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  if (!template) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <Globe className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Template Selected</h2>
          <p className="text-gray-600 mb-6">
            Please select a template from the discovery page to preview your portfolio.
          </p>
          <button
            onClick={() => onNavigate('discovery')}
            className="btn-primary"
          >
            Choose Template
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('builder')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back to Editor
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-medium text-gray-900">Live Preview</span>
            <span className="text-sm text-gray-500">• {template.title}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {deploymentStatus === 'success' && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Live at portfolio-site.netlify.app</span>
              <ExternalLink className="w-4 h-4" />
            </motion.div>
          )}
          
          <button
            onClick={handleShare}
            className="btn-secondary flex items-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <button
            onClick={() => setShowExport(true)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
          
          <button
            onClick={handleDeploy}
            disabled={deploymentStatus === 'deploying'}
            className="btn-primary flex items-center space-x-2"
          >
            {deploymentStatus === 'deploying' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                <span>Deploy Live</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Deployment Status */}
      {deploymentStatus === 'deploying' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
            />
            <div>
              <h4 className="font-medium text-blue-900">Deploying your portfolio...</h4>
              <p className="text-sm text-blue-700">This usually takes 30-60 seconds</p>
            </div>
          </div>
          
          <div className="mt-3">
            <div className="bg-blue-200 rounded-full h-2">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      {deploymentStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
        >
          <h4 className="font-medium text-red-900 mb-1">Deployment failed</h4>
          <p className="text-sm text-red-700">Please try again or download the files manually.</p>
        </motion.div>
      )}

      {/* Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
      >
        {/* Browser Chrome */}
        <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-white rounded px-3 py-1 text-sm text-gray-600 font-mono">
              {deploymentStatus === 'success' 
                ? 'https://portfolio-site.netlify.app' 
                : 'https://your-portfolio.com'
              }
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-gray-400" />
        </div>
        
        {/* Template Preview */}
        <div className="bg-white">
          <TemplatePreview 
            template={template} 
            resume={resume} 
            fullScreen
          />
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-blue-50 rounded-lg p-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            <Globe className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-blue-900 mb-2">One-Click Deploy</h3>
          <p className="text-sm text-blue-700">
            Deploy directly to Netlify with a single click. Your portfolio will be live in seconds with a custom URL.
          </p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-6">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            <Download className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-green-900 mb-2">Download Files</h3>
          <p className="text-sm text-green-700">
            Get a ZIP file with all your portfolio files to host anywhere or customize further.
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-6">
          <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            <Share2 className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-purple-900 mb-2">Easy Sharing</h3>
          <p className="text-sm text-purple-700">
            Share your portfolio link on social media, email, or add it to your resume.
          </p>
        </div>
      </motion.div>

      {/* Export Modal */}
      {showExport && (
        <ExportModal
          template={template}
          resume={resume}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  )
}

export default PreviewPage