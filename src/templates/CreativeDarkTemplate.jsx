import React from 'react'
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react'

const CreativeDarkTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
          {basics.name || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-gray-300 mb-6">
          {basics.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{basics.email}</span>
            </div>
          )}
          {basics.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{basics.phone}</span>
            </div>
          )}
          {(basics.location.city || basics.location.state) && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>
                {[basics.location.city, basics.location.state].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>

        {basics.summary && (
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {basics.summary}
          </p>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Work Experience */}
          {work && work.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-purple-400 mb-6">
                Experience
              </h2>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {job.position || 'Position Title'}
                    </h3>
                    <p className="text-purple-400 font-medium mb-2">
                      {job.company || 'Company Name'}
                    </p>
                    <p className="text-gray-400 text-sm mb-3">
                      {job.startDate} - {job.endDate || 'Present'}
                    </p>
                    {job.summary && (
                      <p className="text-gray-300 leading-relaxed">
                        {job.summary}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-purple-400 mb-4">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-900 text-purple-300 text-sm rounded-full border border-purple-700"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default CreativeDarkTemplate