import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Globe, Copy, CheckCircle, ExternalLink } from 'lucide-react'
import { exportToZip, deployToNetlify } from '../utils/exportUtils'

const ExportModal = ({ template, resume, onClose }) => {
  const [exportType, setExportType] = useState('zip')
  const [isExporting, setIsExporting] = useState(false)
  const [deploymentUrl, setDeploymentUrl] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      if (exportType === 'zip') {
        await exportToZip(template, resume)
      } else if (exportType === 'netlify') {
        const url = await deployToNetlify(template, resume)
        setDeploymentUrl(url)
      }
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleCopyUrl = async () => {
    if (deploymentUrl) {
      await navigator.clipboard.writeText(deploymentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Export Portfolio</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {deploymentUrl ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Portfolio Deployed Successfully!
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Your portfolio is now live and accessible to anyone with the link.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-sm font-mono text-gray-700 truncate">
                    {deploymentUrl}
                  </span>
                  <button
                    onClick={handleCopyUrl}
                    className="ml-2 text-blue-600 hover:text-blue-700"
                  >
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <a
                  href={deploymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Portfolio</span>
                </a>
                
                <button
                  onClick={onClose}
                  className="w-full btn-secondary"
                >
                  Close
                </button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Choose export option:
                  </label>
                  
                  <div className="space-y-3">
                    <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="exportType"
                        value="zip"
                        checked={exportType === 'zip'}
                        onChange={(e) => setExportType(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Download className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">Download ZIP</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Get all files to host anywhere or customize further
                        </p>
                      </div>
                    </label>
                    
                    <label className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="exportType"
                        value="netlify"
                        checked={exportType === 'netlify'}
                        onChange={(e) => setExportType(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Globe className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-gray-900">Deploy to Netlify</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          One-click deploy with instant live URL
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {isExporting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>
                        {exportType === 'zip' ? 'Creating ZIP...' : 'Deploying...'}
                      </span>
                    </>
                  ) : (
                    <>
                      {exportType === 'zip' ? (
                        <Download className="w-4 h-4" />
                      ) : (
                        <Globe className="w-4 h-4" />
                      )}
                      <span>
                        {exportType === 'zip' ? 'Download ZIP' : 'Deploy Live'}
                      </span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={onClose}
                  className="w-full btn-secondary"
                  disabled={isExporting}
                >
                  Cancel
                </button>
              </div>

              {exportType === 'netlify' && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Note:</strong> Deploying to Netlify will create a public website with a random URL. 
                    You can claim and customize the URL by signing up for a free Netlify account.
                  </p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ExportModal