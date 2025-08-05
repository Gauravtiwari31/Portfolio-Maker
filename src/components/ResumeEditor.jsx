import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, Mail, Phone, MapPin, FileText, Briefcase, 
  GraduationCap, Code, FolderOpen, Plus, Trash2, 
  ChevronDown, ChevronRight, Globe, Github, Linkedin 
} from 'lucide-react'
import usePortfolioStore from '../store/portfolioStore'

const ResumeEditor = ({ onChange, compact = false }) => {
  const [expandedSections, setExpandedSections] = useState({
    basics: true,
    work: true,
    education: false,
    skills: false,
    projects: false
  })

  const { 
    resume, 
    updateResumeField, 
    updateResumeArrayItem, 
    addResumeArrayItem, 
    removeResumeArrayItem 
  } = usePortfolioStore()

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleBasicChange = (field, value) => {
    updateResumeField('basics', field, value)
    onChange?.()
  }

  const handleLocationChange = (field, value) => {
    const newLocation = { ...resume.basics.location, [field]: value }
    updateResumeField('basics', 'location', newLocation)
    onChange?.()
  }

  const handleProfileChange = (index, field, value) => {
    const newProfiles = [...resume.basics.profiles]
    newProfiles[index] = { ...newProfiles[index], [field]: value }
    updateResumeField('basics', 'profiles', newProfiles)
    onChange?.()
  }

  const addProfile = () => {
    const newProfile = { network: '', url: '', username: '' }
    const newProfiles = [...resume.basics.profiles, newProfile]
    updateResumeField('basics', 'profiles', newProfiles)
    onChange?.()
  }

  const removeProfile = (index) => {
    const newProfiles = resume.basics.profiles.filter((_, i) => i !== index)
    updateResumeField('basics', 'profiles', newProfiles)
    onChange?.()
  }

  const handleArrayItemChange = (section, index, field, value) => {
    const currentItem = resume[section][index]
    const updatedItem = { ...currentItem, [field]: value }
    updateResumeArrayItem(section, index, updatedItem)
    onChange?.()
  }

  const addArrayItem = (section, defaultItem) => {
    addResumeArrayItem(section, defaultItem)
    onChange?.()
  }

  const removeArrayItem = (section, index) => {
    removeResumeArrayItem(section, index)
    onChange?.()
  }

  const SectionHeader = ({ icon: Icon, title, section, count }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg"
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {count > 0 && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {count}
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronDown className="w-5 h-5 text-gray-400" />
      ) : (
        <ChevronRight className="w-5 h-5 text-gray-400" />
      )}
    </button>
  )

  const TextInput = ({ label, value, onChange, placeholder, type = "text", required = false }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field"
        required={required}
      />
    </div>
  )

  const TextArea = ({ label, value, onChange, placeholder, rows = 3 }) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="input-field resize-vertical"
      />
    </div>
  )

  return (
    <div className={`space-y-6 ${compact ? 'max-h-96 overflow-y-auto' : ''}`}>
      {/* Basic Information */}
      <div className="space-y-4">
        <SectionHeader 
          icon={User} 
          title="Basic Information" 
          section="basics"
          count={0}
        />
        
        <AnimatePresence>
          {expandedSections.basics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Full Name"
                  value={resume.basics.name}
                  onChange={(value) => handleBasicChange('name', value)}
                  placeholder="John Doe"
                  required
                />
                <TextInput
                  label="Email"
                  value={resume.basics.email}
                  onChange={(value) => handleBasicChange('email', value)}
                  placeholder="john@example.com"
                  type="email"
                  required
                />
                <TextInput
                  label="Phone"
                  value={resume.basics.phone}
                  onChange={(value) => handleBasicChange('phone', value)}
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                />
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={resume.basics.location.city}
                      onChange={(e) => handleLocationChange('city', e.target.value)}
                      placeholder="City"
                      className="input-field"
                    />
                    <input
                      type="text"
                      value={resume.basics.location.state}
                      onChange={(e) => handleLocationChange('state', e.target.value)}
                      placeholder="State"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
              
              <TextArea
                label="Professional Summary"
                value={resume.basics.summary}
                onChange={(value) => handleBasicChange('summary', value)}
                placeholder="A brief description of your professional background and goals..."
                rows={4}
              />

              {/* Social Profiles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">Social Profiles</label>
                  <button
                    onClick={addProfile}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Profile</span>
                  </button>
                </div>
                
                {resume.basics.profiles.map((profile, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                    <select
                      value={profile.network}
                      onChange={(e) => handleProfileChange(index, 'network', e.target.value)}
                      className="input-field flex-none w-32"
                    >
                      <option value="">Select</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="GitHub">GitHub</option>
                      <option value="Website">Website</option>
                      <option value="Twitter">Twitter</option>
                    </select>
                    <input
                      type="url"
                      value={profile.url}
                      onChange={(e) => handleProfileChange(index, 'url', e.target.value)}
                      placeholder="https://..."
                      className="input-field flex-1"
                    />
                    <button
                      onClick={() => removeProfile(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Work Experience */}
      <div className="space-y-4">
        <SectionHeader 
          icon={Briefcase} 
          title="Work Experience" 
          section="work"
          count={resume.work.length}
        />
        
        <AnimatePresence>
          {expandedSections.work && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4"
            >
              {resume.work.map((job, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Position {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('work', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Job Title"
                      value={job.position}
                      onChange={(value) => handleArrayItemChange('work', index, 'position', value)}
                      placeholder="Software Engineer"
                    />
                    <TextInput
                      label="Company"
                      value={job.company}
                      onChange={(value) => handleArrayItemChange('work', index, 'company', value)}
                      placeholder="Tech Corp"
                    />
                    <TextInput
                      label="Start Date"
                      value={job.startDate}
                      onChange={(value) => handleArrayItemChange('work', index, 'startDate', value)}
                      placeholder="Jan 2020"
                    />
                    <TextInput
                      label="End Date"
                      value={job.endDate}
                      onChange={(value) => handleArrayItemChange('work', index, 'endDate', value)}
                      placeholder="Present"
                    />
                  </div>
                  
                  <TextArea
                    label="Job Description"
                    value={job.summary}
                    onChange={(value) => handleArrayItemChange('work', index, 'summary', value)}
                    placeholder="Describe your role and responsibilities..."
                  />
                </div>
              ))}
              
              <button
                onClick={() => addArrayItem('work', {
                  position: '',
                  company: '',
                  startDate: '',
                  endDate: '',
                  summary: '',
                  highlights: []
                })}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Work Experience</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <SectionHeader 
          icon={GraduationCap} 
          title="Education" 
          section="education"
          count={resume.education.length}
        />
        
        <AnimatePresence>
          {expandedSections.education && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4"
            >
              {resume.education.map((edu, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('education', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Institution"
                      value={edu.institution}
                      onChange={(value) => handleArrayItemChange('education', index, 'institution', value)}
                      placeholder="University Name"
                    />
                    <TextInput
                      label="Degree"
                      value={edu.studyType}
                      onChange={(value) => handleArrayItemChange('education', index, 'studyType', value)}
                      placeholder="Bachelor's Degree"
                    />
                    <TextInput
                      label="Field of Study"
                      value={edu.area}
                      onChange={(value) => handleArrayItemChange('education', index, 'area', value)}
                      placeholder="Computer Science"
                    />
                    <TextInput
                      label="Graduation Year"
                      value={edu.endDate}
                      onChange={(value) => handleArrayItemChange('education', index, 'endDate', value)}
                      placeholder="2020"
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => addArrayItem('education', {
                  institution: '',
                  area: '',
                  studyType: '',
                  startDate: '',
                  endDate: '',
                  gpa: '',
                  courses: []
                })}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Education</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        <SectionHeader 
          icon={Code} 
          title="Skills" 
          section="skills"
          count={resume.skills.length}
        />
        
        <AnimatePresence>
          {expandedSections.skills && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Skills (comma-separated)</label>
                <textarea
                  value={resume.skills.map(skill => skill.name).join(', ')}
                  onChange={(e) => {
                    const skillNames = e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    const skillObjects = skillNames.map(name => ({ name, level: '', keywords: [] }))
                    updateResumeField('skills', '', skillObjects)
                    onChange?.()
                  }}
                  placeholder="JavaScript, React, Node.js, Python, SQL..."
                  rows={3}
                  className="input-field"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <SectionHeader 
          icon={FolderOpen} 
          title="Projects" 
          section="projects"
          count={resume.projects.length}
        />
        
        <AnimatePresence>
          {expandedSections.projects && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4"
            >
              {resume.projects.map((project, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Project {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem('projects', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Project Name"
                      value={project.name}
                      onChange={(value) => handleArrayItemChange('projects', index, 'name', value)}
                      placeholder="My Awesome Project"
                    />
                    <TextInput
                      label="Project URL"
                      value={project.url}
                      onChange={(value) => handleArrayItemChange('projects', index, 'url', value)}
                      placeholder="https://github.com/user/project"
                    />
                  </div>
                  
                  <TextArea
                    label="Description"
                    value={project.description}
                    onChange={(value) => handleArrayItemChange('projects', index, 'description', value)}
                    placeholder="Describe what this project does and what technologies you used..."
                  />
                </div>
              ))}
              
              <button
                onClick={() => addArrayItem('projects', {
                  name: '',
                  description: '',
                  highlights: [],
                  keywords: [],
                  startDate: '',
                  endDate: '',
                  url: '',
                  roles: []
                })}
                className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Project</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ResumeEditor