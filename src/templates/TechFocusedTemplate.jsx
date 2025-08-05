import React from 'react'
import { Mail, Phone, MapPin, Code, Terminal, Database } from 'lucide-react'

const TechFocusedTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen font-mono">
      {/* Header */}
      <header className="mb-12 bg-green-900 text-green-100 p-8 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <Terminal className="w-6 h-6" />
          <span className="text-green-400">user@portfolio:~$</span>
          <span className="text-white">whoami</span>
        </div>
        
        <h1 className="text-4xl font-bold text-green-400 mb-4">
          {basics.name || 'developer'}
        </h1>
        
        <div className="space-y-2 text-green-200">
          {basics.email && <div>email: {basics.email}</div>}
          {basics.phone && <div>phone: {basics.phone}</div>}
          {(basics.location.city || basics.location.state) && (
            <div>location: {[basics.location.city, basics.location.state].filter(Boolean).join(', ')}</div>
          )}
        </div>

        {basics.summary && (
          <div className="mt-6 p-4 bg-green-800 rounded border-l-4 border-green-400">
            <div className="text-green-400 mb-2">// About</div>
            <p className="text-green-100 leading-relaxed">
              {basics.summary}
            </p>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Work Experience */}
          {work && work.length > 0 && (
            <section className="bg-white rounded-lg p-6 border-2 border-green-200">
              <div className="flex items-center space-x-2 mb-6">
                <Code className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">experience.js</h2>
              </div>
              
              <div className="space-y-6">
                {work.map((job, index) => (
                  <div key={index} className="bg-gray-50 rounded p-4 border-l-4 border-green-500">
                    <div className="text-green-600 text-sm mb-1">const job{index + 1} = {`{`}</div>
                    <div className="ml-4 space-y-1 text-gray-800">
                      <div>position: "{job.position || 'Position Title'}",</div>
                      <div>company: "{job.company || 'Company Name'}",</div>
                      <div>duration: "{job.startDate} - {job.endDate || 'Present'}",</div>
                      {job.summary && (
                        <div>description: "{job.summary}"</div>
                      )}
                    </div>
                    <div className="text-green-600 text-sm">{`}`}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="bg-white rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-center space-x-2 mb-6">
                <Database className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">projects.json</h2>
              </div>
              
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="bg-blue-50 rounded p-4 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                      {project.name || 'Project Name'}
                    </h3>
                    {project.description && (
                      <p className="text-blue-800 mb-2">
                        {project.description}
                      </p>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-mono"
                      >
                        {project.url}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Skills */}
          {skills && skills.length > 0 && (
            <section className="bg-white rounded-lg p-6 border-2 border-purple-200">
              <h2 className="text-xl font-bold text-purple-900 mb-4">skills.config</h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="text-sm font-mono text-purple-800">
                    <span className="text-purple-600">import</span> {skill.name.replace(/\s+/g, '')} <span className="text-purple-600">from</span> 'skills';
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="bg-white rounded-lg p-6 border-2 border-orange-200">
              <h2 className="text-xl font-bold text-orange-900 mb-4">education.log</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <div className="text-orange-600 font-mono">
                      [{edu.endDate || 'ongoing'}]
                    </div>
                    <div className="text-orange-800 font-semibold">
                      {edu.studyType} {edu.area && `in ${edu.area}`}
                    </div>
                    <div className="text-orange-700">
                      {edu.institution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default TechFocusedTemplate