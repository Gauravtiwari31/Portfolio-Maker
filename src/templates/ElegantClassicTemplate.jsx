import React from 'react'

const ElegantClassicTemplate = ({ resume }) => {
  const { basics, work, education, skills, projects } = resume

  return (
    <div className="max-w-4xl mx-auto p-12 bg-white min-h-screen" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <header className="text-center mb-16 border-b-2 border-gray-800 pb-8">
        <h1 className="text-5xl font-light text-gray-900 mb-4 tracking-wide">
          {basics.name || 'Your Name'}
        </h1>
        
        <div className="text-gray-600 space-y-1">
          {basics.email && <div>{basics.email}</div>}
          {basics.phone && <div>{basics.phone}</div>}
          {(basics.location.city || basics.location.state) && (
            <div>{[basics.location.city, basics.location.state].filter(Boolean).join(', ')}</div>
          )}
        </div>

        {basics.summary && (
          <p className="mt-8 text-lg text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
            "{basics.summary}"
          </p>
        )}
      </header>

      {/* Work Experience */}
      {work && work.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-widest uppercase">
            Professional Experience
          </h2>
          
          <div className="space-y-8">
            {work.map((job, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.position || 'Position Title'}
                </h3>
                <p className="text-gray-600 italic mb-2">
                  {job.company || 'Company Name'}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {job.startDate} – {job.endDate || 'Present'}
                </p>
                {job.summary && (
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {job.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-widest uppercase">
            Education
          </h2>
          
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {edu.studyType} {edu.area && `in ${edu.area}`}
                </h3>
                <p className="text-gray-600 italic mb-1">
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

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-widest uppercase">
            Expertise
          </h2>
          
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {skills.map(skill => skill.name).join(' • ')}
            </p>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-light text-gray-900 mb-8 text-center tracking-widest uppercase">
            Notable Work
          </h2>
          
          <div className="space-y-8">
            {projects.map((project, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name || 'Project Name'}
                </h3>
                {project.description && (
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-gray-300 text-center">
        <p className="text-gray-500 text-sm italic">
          Portfolio created with distinguished elegance
        </p>
      </footer>
    </div>
  )
}

export default ElegantClassicTemplate