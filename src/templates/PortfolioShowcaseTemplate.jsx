import React from 'react'
import { ExternalLink, Github } from 'lucide-react'

const PortfolioShowcaseTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            {basics.name || 'Your Name'}
          </h1>
          
          {basics.summary && (
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              {basics.summary}
            </p>
          )}
          
          <div className="flex justify-center space-x-6 text-gray-600">
            {basics.email && <span>{basics.email}</span>}
            {(basics.location.city || basics.location.state) && (
              <span>{[basics.location.city, basics.location.state].filter(Boolean).join(', ')}</span>
            )}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      {projects && projects.length > 0 && (
        <section className="py-16 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Featured Work
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center">
                    <div className="text-orange-600 text-6xl font-bold opacity-20">
                      {(project.name || 'Project').charAt(0)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {project.name || 'Project Name'}
                    </h3>
                    
                    {project.description && (
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    )}
                    
                    {project.url && (
                      <div className="flex justify-between items-center">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700 flex items-center space-x-1"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Project</span>
                        </a>
                        
                        {project.url.includes('github') && (
                          <Github className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Timeline */}
      {work && work.length > 0 && (
        <section className="py-16 px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Experience
            </h2>
            
            <div className="space-y-8">
              {work.map((job, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {(job.company || 'C').charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900">
                      {job.position || 'Position Title'}
                    </h3>
                    <p className="text-orange-600 font-medium mb-2">
                      {job.company || 'Company Name'}
                    </p>
                    <p className="text-gray-500 text-sm mb-3">
                      {job.startDate} - {job.endDate || 'Present'}
                    </p>
                    {job.summary && (
                      <p className="text-gray-700">{job.summary}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills & Education */}
      <section className="py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full font-medium"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.studyType} {edu.area && `in ${edu.area}`}
                    </h3>
                    <p className="text-orange-600 font-medium">
                      {edu.institution}
                    </p>
                    {edu.endDate && (
                      <p className="text-gray-500 text-sm">{edu.endDate}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default PortfolioShowcaseTemplate