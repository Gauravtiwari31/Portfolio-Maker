import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import { parseResume } from '../utils/resumeParser'
import usePortfolioStore from '../store/portfolioStore'

const FileUpload = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState(null)
  const [confidence, setConfidence] = useState(null)
  const [showManualForm, setShowManualForm] = useState(false)
  
  const { setResume } = usePortfolioStore()

  const handleDrop = useCallback(async (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      await processFile(files[0])
    }
  }, [])

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await processFile(file)
    }
  }

  const processFile = async (file) => {
    setIsProcessing(true)
    setError(null)
    
    try {
      // Validate file type and size
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!validTypes.includes(file.type)) {
        throw new Error('Please upload a PDF, DOCX, or TXT file')
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('File size must be less than 5MB')
      }

      // Parse the resume
      const result = await parseResume(file)
      
      if (result.confidence < 0.8) {
        setConfidence(result.confidence)
        setShowManualForm(true)
      } else {
        setResume(result.resume)
        setConfidence(result.confidence)
        setTimeout(() => {
          onUploadComplete(result.resume)
        }, 1000)
      }
      
    } catch (err) {
      setError(err.message)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  if (showManualForm) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Parsing incomplete ({Math.round(confidence * 100)}% confidence)</span>
          </div>
          <button
            onClick={() => setShowManualForm(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          We couldn't extract all information from your resume. You can either:
        </p>
        
        <div className="space-y-2">
          <button
            onClick={() => {
              onUploadComplete(null)
            }}
            className="w-full btn-primary"
          >
            Continue with manual entry
          </button>
          <button
            onClick={() => {
              setShowManualForm(false)
              setError(null)
              setConfidence(null)
            }}
            className="w-full btn-secondary"
          >
            Try another file
          </button>
        </div>
      </div>
    )
  }

  if (confidence !== null && confidence >= 0.8) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-2 text-green-600">
          <CheckCircle className="w-8 h-8" />
          <span className="text-lg font-medium">Resume parsed successfully!</span>
        </div>
        <p className="text-sm text-gray-600">
          Confidence: {Math.round(confidence * 100)}%
        </p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidence * 100}%` }}
            className="bg-green-500 h-2 rounded-full"
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        {isProcessing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            </div>
            <p className="text-gray-600">Processing your resume...</p>
          </motion.div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Drop your resume here
            </h4>
            <p className="text-gray-600 mb-4">
              Supports PDF, DOCX, and TXT files up to 5MB
            </p>
            <label className="btn-primary inline-flex items-center cursor-pointer">
              <FileText className="w-4 h-4 mr-2" />
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
              />
            </label>
          </>
        )}
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm">{error}</span>
        </motion.div>
      )}

      <div className="text-center">
        <button
          onClick={() => onUploadComplete(null)}
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Skip upload and enter manually
        </button>
      </div>
    </div>
  )
}

export default FileUpload