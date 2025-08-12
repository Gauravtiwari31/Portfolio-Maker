// DOM Patching Utilities for Portfolio Templates
(function(){
  function get(obj, path) {
    return path.split('.').reduce((o, k) => {
      if (k.match(/^\d+$/)) return o?.[parseInt(k)];
      return o?.[k];
    }, obj);
  }

  function fillDataAttributes(dom, data) {
    // Fill text content for elements with data-field
    dom.querySelectorAll('[data-field]').forEach(el => {
      const path = el.getAttribute('data-field');
      const value = get(data, path);
      if (value != null) el.textContent = value;
    });
    
    // Fill attributes (href, src, etc.) for elements with data-attr
    dom.querySelectorAll('[data-attr]').forEach(el => {
      const path = el.getAttribute('data-field');
      const attr = el.getAttribute('data-attr');
      const value = get(data, path);
      if (value != null && attr) el.setAttribute(attr, value);
    });
    
    // Handle repeating sections with data-repeat
    dom.querySelectorAll('[data-repeat]').forEach(container => {
      const key = container.getAttribute('data-repeat');
      const template = container.querySelector('template');
      const array = get(data, key) || [];
      
      if (template && array.length > 0) {
        // Clear container and rebuild with data
        container.innerHTML = '';
        array.forEach(item => {
          const clone = template.content.cloneNode(true);
          
          // Fill data fields in cloned template
          clone.querySelectorAll('[data-field]').forEach(el => {
            const fieldPath = el.getAttribute('data-field');
            const value = fieldPath === '.' ? item : get(item, fieldPath);
            if (value != null) el.textContent = value;
          });
          
          // Fill attributes in cloned template
          clone.querySelectorAll('[data-attr]').forEach(el => {
            const fieldPath = el.getAttribute('data-field');
            const attr = el.getAttribute('data-attr');
            const value = fieldPath === '.' ? item : get(item, fieldPath);
            if (value != null && attr) el.setAttribute(attr, value);
          });
          
          container.appendChild(clone);
        });
      }
    });
  }

  // Default resume data structure (JSON Resume standard)
  const defaultResumeData = {
    basics: {
      name: "John Doe",
      label: "Software Engineer",
      email: "john.doe@example.com",
      phone: "+1-555-0123",
      summary: "Passionate software engineer with experience building applications.",
      profiles: [
        { network: "GitHub", url: "https://github.com/johndoe" },
        { network: "LinkedIn", url: "https://linkedin.com/in/johndoe" }
      ]
    },
    work: [{
      name: "Tech Corp",
      position: "Software Engineer",
      duration: "2022 - Present",
      summary: "Led development of scalable applications.",
      highlights: ["Improved performance by 40%", "Mentored junior developers"]
    }],
    education: [{ 
      institution: "University of Technology", 
      studyType: "Bachelor of Science", 
      area: "Computer Science", 
      year: "2020" 
    }],
    skills: [
      { name: "JavaScript" }, 
      { name: "React" }, 
      { name: "Node.js" }
    ],
    projects: [{ 
      name: "E-commerce Platform", 
      description: "Full-stack solution", 
      url: "https://github.com/johndoe/ecommerce" 
    }],
    interests: [
      { name: "Artificial Intelligence" }, 
      { name: "Machine Learning" }
    ],
    awards: [{ 
      title: "Developer Award", 
      date: "2021", 
      summary: "Recognized for contributions" 
    }],
    extracurricular: [{ 
      name: "Tech Blog Writer", 
      description: "Regular tech articles" 
    }]
  };

  // Convert form data to JSON Resume format
  function convertFormDataToResume(formData) {
    return {
      basics: {
        name: formData.name || defaultResumeData.basics.name,
        label: formData.jobTitle || defaultResumeData.basics.label,
        email: formData.email || defaultResumeData.basics.email,
        phone: formData.contactNo || defaultResumeData.basics.phone,
        summary: formData.summary || defaultResumeData.basics.summary,
        profiles: [
          { network: "GitHub", url: formData.github || defaultResumeData.basics.profiles[0].url },
          { network: "LinkedIn", url: formData.linkedin || defaultResumeData.basics.profiles[1].url }
        ]
      },
      work: (formData.experience || []).length ? formData.experience.map(exp => ({
        name: exp.company, 
        position: exp.position, 
        duration: exp.duration, 
        summary: exp.description, 
        highlights: []
      })) : defaultResumeData.work,
      education: (formData.education || []).length ? formData.education.map(edu => ({
        institution: edu.institution, 
        studyType: edu.degree, 
        area: edu.degree, 
        year: edu.year
      })) : defaultResumeData.education,
      skills: (formData.technicalSkills || []).length ? 
        formData.technicalSkills.filter(s => s.trim()).map(s => ({ name: s })) : 
        defaultResumeData.skills,
      projects: (formData.projects || []).length ? formData.projects.map(proj => ({
        name: proj.title || proj.name, 
        description: proj.description, 
        url: proj.link || proj.url
      })) : defaultResumeData.projects,
      interests: (formData.areaOfInterest || []).length ? 
        formData.areaOfInterest.filter(i => i.trim()).map(n => ({ name: n })) : 
        defaultResumeData.interests,
      awards: (formData.honors || []).length ? 
        formData.honors.filter(h => h.trim()).map(h => ({ 
          title: h, 
          date: "2023", 
          summary: `Recognized for ${h}` 
        })) : defaultResumeData.awards,
      extracurricular: (formData.extracurriculars || []).length ? 
        formData.extracurriculars.filter(e => e.trim()).map(n => ({ 
          name: n, 
          description: `Active in ${n}` 
        })) : defaultResumeData.extracurricular
    };
  }

  // Main DOM patching function
  async function patchTemplate(filePath, formData) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Template not found: ${filePath}`);
      
      const html = await response.text();
      const parser = new DOMParser();
      const dom = parser.parseFromString(html, 'text/html');
      
      // Add base tag for relative assets
      const base = dom.createElement('base');
      base.href = new URL(filePath, window.location.href).href;
      dom.head.insertBefore(base, dom.head.firstChild);
      
      // Convert form data to resume format and patch template
      const resumeData = convertFormDataToResume(formData);
      fillDataAttributes(dom, resumeData);
      
      // Serialize back to HTML
      const serializer = new XMLSerializer();
      return serializer.serializeToString(dom);
    } catch (error) {
      console.error('DOM Patching Error:', error);
      throw error;
    }
  }

  // Expose utilities globally
  window.DomPatcher = { 
    get, 
    fillDataAttributes, 
    convertFormDataToResume, 
    patchTemplate 
  };
})();
