import * as pdfjsLib from 'pdfjs-dist'
import mammoth from 'mammoth'
import nlp from 'compromise'

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`

// Common patterns for parsing
const patterns = {
  email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/gi,
  phone: /(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
  linkedin: /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9-]+)/gi,
  github: /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)/gi,
  website: /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.(?:com|org|net|edu|io|co|dev))/gi
}

// Section keywords
const sectionKeywords = {
  experience: ['experience', 'work history', 'employment', 'professional experience', 'work experience'],
  education: ['education', 'academic background', 'qualifications', 'degrees'],
  skills: ['skills', 'technical skills', 'competencies', 'expertise', 'technologies'],
  projects: ['projects', 'portfolio', 'work samples', 'personal projects'],
  summary: ['summary', 'objective', 'profile', 'about', 'overview']
}

export async function parseResume(file) {
  try {
    let text = ''
    
    // Extract text based on file type
    if (file.type === 'application/pdf') {
      text = await extractPdfText(file)
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      text = await extractDocxText(file)
    } else if (file.type === 'text/plain') {
      text = await extractPlainText(file)
    } else {
      throw new Error('Unsupported file type')
    }

    // Parse the extracted text
    const resume = parseTextToResume(text)
    const confidence = calculateConfidence(resume, text)

    return {
      resume,
      confidence,
      rawText: text
    }
  } catch (error) {
    throw new Error(`Failed to parse resume: ${error.message}`)
  }
}

async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  let text = ''

  for (let i = 1; i <= Math.min(pdf.numPages, 3); i++) { // Limit to first 3 pages
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map(item => item.str).join(' ')
    text += pageText + '\n'
  }

  return text
}

async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer()
  const result = await mammoth.extractRawText({ arrayBuffer })
  return result.value
}

async function extractPlainText(file) {
  return await file.text()
}

function parseTextToResume(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  const resume = {
    basics: {
      name: extractName(text),
      email: extractEmail(text),
      phone: extractPhone(text),
      location: extractLocation(text),
      summary: extractSummary(text, lines),
      profiles: extractProfiles(text)
    },
    work: extractWorkExperience(text, lines),
    education: extractEducation(text, lines),
    skills: extractSkills(text, lines),
    projects: extractProjects(text, lines),
    languages: [],
    interests: []
  }

  return resume
}

function extractName(text) {
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0)
  
  // Usually the first line or first few lines contain the name
  for (const line of lines.slice(0, 3)) {
    // Skip lines that look like contact info
    if (patterns.email.test(line) || patterns.phone.test(line) || line.includes('@')) {
      continue
    }
    
    // Look for lines that look like names (2-4 words, proper case)
    const words = line.split(/\s+/)
    if (words.length >= 2 && words.length <= 4) {
      const hasProperCase = words.every(word => 
        word.length > 0 && word[0] === word[0].toUpperCase()
      )
      if (hasProperCase && !line.includes('RESUME') && !line.includes('CV')) {
        return line
      }
    }
  }
  
  return ''
}

function extractEmail(text) {
  const matches = text.match(patterns.email)
  return matches ? matches[0] : ''
}

function extractPhone(text) {
  const matches = text.match(patterns.phone)
  return matches ? matches[0] : ''
}

function extractLocation(text) {
  // Simple location extraction - look for city, state patterns
  const locationPatterns = [
    /([A-Z][a-z]+),\s*([A-Z]{2})/g,
    /([A-Z][a-z]+),\s*([A-Z][a-z]+)/g
  ]
  
  for (const pattern of locationPatterns) {
    const matches = text.match(pattern)
    if (matches) {
      const parts = matches[0].split(',').map(part => part.trim())
      return {
        city: parts[0] || '',
        state: parts[1] || '',
        country: 'United States'
      }
    }
  }
  
  return { city: '', state: '', country: '' }
}

function extractProfiles(text) {
  const profiles = []
  
  const linkedinMatch = text.match(patterns.linkedin)
  if (linkedinMatch) {
    profiles.push({
      network: 'LinkedIn',
      url: linkedinMatch[0].startsWith('http') ? linkedinMatch[0] : `https://${linkedinMatch[0]}`
    })
  }
  
  const githubMatch = text.match(patterns.github)
  if (githubMatch) {
    profiles.push({
      network: 'GitHub',
      url: githubMatch[0].startsWith('http') ? githubMatch[0] : `https://${githubMatch[0]}`
    })
  }
  
  return profiles
}

function extractSummary(text, lines) {
  const summaryKeywords = sectionKeywords.summary
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].toLowerCase()
    
    if (summaryKeywords.some(keyword => line.includes(keyword))) {
      // Found summary section, extract the next few lines
      const summaryLines = []
      for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
        const nextLine = lines[j]
        
        // Stop if we hit another section
        if (isNewSection(nextLine)) break
        
        if (nextLine.length > 20) { // Meaningful content
          summaryLines.push(nextLine)
        }
      }
      
      return summaryLines.join(' ')
    }
  }
  
  return ''
}

function extractWorkExperience(text, lines) {
  const work = []
  const experienceKeywords = sectionKeywords.experience
  
  let inExperienceSection = false
  let currentJob = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()
    
    // Check if we're entering experience section
    if (experienceKeywords.some(keyword => lowerLine.includes(keyword))) {
      inExperienceSection = true
      continue
    }
    
    // Check if we're leaving experience section
    if (inExperienceSection && isNewSection(line)) {
      if (currentJob) {
        work.push(currentJob)
        currentJob = null
      }
      inExperienceSection = false
      continue
    }
    
    if (inExperienceSection) {
      // Look for job titles, companies, dates
      if (line.length > 10 && !line.includes('•') && !line.includes('-')) {
        // Potential job title or company
        if (currentJob) {
          work.push(currentJob)
        }
        
        currentJob = {
          position: line,
          company: '',
          startDate: '',
          endDate: '',
          summary: '',
          highlights: []
        }
      } else if (currentJob && (line.includes('•') || line.includes('-'))) {
        // Bullet point - add to highlights
        const highlight = line.replace(/^[•\-\*]\s*/, '').trim()
        if (highlight.length > 10) {
          currentJob.highlights.push(highlight)
        }
      }
    }
  }
  
  if (currentJob) {
    work.push(currentJob)
  }
  
  return work
}

function extractEducation(text, lines) {
  const education = []
  const educationKeywords = sectionKeywords.education
  
  let inEducationSection = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()
    
    if (educationKeywords.some(keyword => lowerLine.includes(keyword))) {
      inEducationSection = true
      continue
    }
    
    if (inEducationSection && isNewSection(line)) {
      inEducationSection = false
      continue
    }
    
    if (inEducationSection && line.length > 10) {
      // Look for degree patterns
      const degreePatterns = [
        /bachelor|b\.?s\.?|b\.?a\.?/i,
        /master|m\.?s\.?|m\.?a\.?|mba/i,
        /phd|ph\.?d\.?|doctorate/i
      ]
      
      if (degreePatterns.some(pattern => pattern.test(line))) {
        education.push({
          institution: '',
          area: line,
          studyType: '',
          startDate: '',
          endDate: '',
          gpa: '',
          courses: []
        })
      }
    }
  }
  
  return education
}

function extractSkills(text, lines) {
  const skills = []
  const skillsKeywords = sectionKeywords.skills
  
  let inSkillsSection = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()
    
    if (skillsKeywords.some(keyword => lowerLine.includes(keyword))) {
      inSkillsSection = true
      continue
    }
    
    if (inSkillsSection && isNewSection(line)) {
      inSkillsSection = false
      continue
    }
    
    if (inSkillsSection) {
      // Split by common separators
      const skillList = line.split(/[,•\-\|]/).map(s => s.trim()).filter(s => s.length > 1)
      
      for (const skill of skillList) {
        if (skill.length > 1 && skill.length < 30) {
          skills.push({
            name: skill,
            level: '',
            keywords: []
          })
        }
      }
    }
  }
  
  return skills
}

function extractProjects(text, lines) {
  const projects = []
  const projectKeywords = sectionKeywords.projects
  
  let inProjectsSection = false
  let currentProject = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lowerLine = line.toLowerCase()
    
    if (projectKeywords.some(keyword => lowerLine.includes(keyword))) {
      inProjectsSection = true
      continue
    }
    
    if (inProjectsSection && isNewSection(line)) {
      if (currentProject) {
        projects.push(currentProject)
      }
      inProjectsSection = false
      continue
    }
    
    if (inProjectsSection && line.length > 5) {
      if (!line.includes('•') && !line.includes('-') && line.length > 10) {
        if (currentProject) {
          projects.push(currentProject)
        }
        
        currentProject = {
          name: line,
          description: '',
          highlights: [],
          keywords: [],
          startDate: '',
          endDate: '',
          url: '',
          roles: []
        }
      } else if (currentProject && (line.includes('•') || line.includes('-'))) {
        const highlight = line.replace(/^[•\-\*]\s*/, '').trim()
        if (highlight.length > 10) {
          currentProject.highlights.push(highlight)
        }
      }
    }
  }
  
  if (currentProject) {
    projects.push(currentProject)
  }
  
  return projects
}

function isNewSection(line) {
  const allSectionKeywords = Object.values(sectionKeywords).flat()
  const lowerLine = line.toLowerCase()
  
  return allSectionKeywords.some(keyword => 
    lowerLine.includes(keyword) && line.length < 50
  )
}

function calculateConfidence(resume, text) {
  let score = 0
  let maxScore = 0
  
  // Basic info scoring
  maxScore += 20
  if (resume.basics.name) score += 5
  if (resume.basics.email) score += 5
  if (resume.basics.phone) score += 3
  if (resume.basics.location.city) score += 2
  if (resume.basics.summary) score += 5
  
  // Experience scoring
  maxScore += 30
  if (resume.work.length > 0) score += 15
  if (resume.work.some(job => job.highlights.length > 0)) score += 15
  
  // Education scoring
  maxScore += 20
  if (resume.education.length > 0) score += 20
  
  // Skills scoring
  maxScore += 20
  if (resume.skills.length > 0) score += 10
  if (resume.skills.length > 5) score += 10
  
  // Projects scoring
  maxScore += 10
  if (resume.projects.length > 0) score += 10
  
  return Math.min(score / maxScore, 1)
}