import React from 'react'
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink } from 'lucide-react'

const ModernMinimalTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  const getProfileIcon = (network) => {
    switch (network.toLowerCase()) {
      case 'github':
        return <Github className="w-4 h-4" />
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
      default:
        return <Globe className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      {/* Header */}
      <header className="mb-12 text-center border-b border-gray-200 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {basics.name || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-4 text-gray-600 mb-4">
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

        {basics.profiles && basics.profiles.length > 0 && (
          <div className="flex justify-center space-x-4">
            {basics.profiles.map((profile, index) => (
              <a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
              >
                {getProfileIcon(profile.network)}
                <span className="text-sm">{profile.network}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        )}
        
        {basics.summary && (
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-2 w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="absolute left-1 top-4 w-0.5 h-full bg-gray-200"></div>
                    
                    <div className="bg-white">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.position || 'Position Title'}
                      </h3>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-blue-600 font-medium">
                          {job.company || 'Company Name'}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {job.startDate} - {job.endDate || 'Present'}
                        </p>
                      </div>
                      {job.summary && (
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          {job.summary}
                        </p>
                      )}
                      {job.highlights && job.highlights.length > 0 && (
                        <ul className="space-y-1">
                          {job.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className="text-gray-600 text-sm flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2">
                Projects
              </h2>
              <div className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {project.name || 'Project Name'}
                      </h3>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    {project.description && (
                      <p className="text-gray-700 mb-3 leading-relaxed">
                        {project.description}
                      </p>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-1">
                        {project.highlights.map((highlight, hIndex) => (
                          <li key={hIndex} className="text-gray-600 text-sm flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
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
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-gray-900">
                      {edu.studyType} {edu.area && `in ${edu.area}`}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {edu.institution}
                    </p>
                    {edu.endDate && (
                      <p className="text-gray-500 text-sm">{edu.endDate}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Portfolio created with Portfolio Maker</p>
      </footer>
    </div>
  )
}

export default ModernMinimalTemplate