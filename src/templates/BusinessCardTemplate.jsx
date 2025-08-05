import React from 'react'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'

const BusinessCardTemplate = ({ resume }) => {
  const { basics, work, skills } = resume

  // Get the most recent job
  const currentJob = work && work.length > 0 ? work[0] : null

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full">
        {/* Card Front */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl font-bold mb-2">
              {basics.name || 'Your Name'}
            </h1>
            
            {currentJob && (
              <div className="mb-4">
                <p className="text-blue-200 text-lg font-medium">
                  {currentJob.position || 'Your Title'}
                </p>
                <p className="text-blue-300 text-sm">
                  {currentJob.company || 'Company Name'}
                </p>
              </div>
            )}
            
            <div className="space-y-2 text-sm">
              {basics.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{basics.email}</span>
                </div>
              )}
              
              {basics.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{basics.phone}</span>
                </div>
              )}
              
              {(basics.location.city || basics.location.state) && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{[basics.location.city, basics.location.state].filter(Boolean).join(', ')}</span>
                </div>
              )}
              
              {basics.profiles && basics.profiles.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="truncate">{basics.profiles[0].network}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Card Back */}
        <div className="p-8">
          {basics.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {basics.summary}
              </p>
            </div>
          )}
          
          {skills && skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.slice(0, 6).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
                {skills.length > 6 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{skills.length - 6} more
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Scan QR code for full portfolio
            </p>
            <div className="mt-2 w-16 h-16 bg-gray-200 rounded mx-auto flex items-center justify-center">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessCardTemplate