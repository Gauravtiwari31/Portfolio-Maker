const { useState, useEffect } = React;

function ResumeBuilder({ onClose, darkMode }) {
  const [formData, setFormData] = useState({
    name: '', contactNo: '', email:'', github: '', linkedin: '',
    education: [{ institution: '', degree: '', year: '' }],
    experience: [{ company: '', position: '', duration: '', description: '' }],
    projects: [{ title: '', description: '', link: '' }],
    technicalSkills: [''], areaOfInterest: [''], honors: [''], extracurriculars: ['']
  });
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewHTML, setPreviewHTML] = useState('');
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Load/save form to localStorage
  useEffect(()=>{ try{ const raw = localStorage.getItem('pxf:form'); if(raw) setFormData(JSON.parse(raw)); }catch{} }, []);
  useEffect(()=>{ localStorage.setItem('pxf:form', JSON.stringify(formData)); }, [formData]);

	// Use all 45 templates from global portfolio data
	const templates = (window.PORTFOLIO_DATA || []).map(p => ({
		id: p.id,
		name: p.title,
		file: p.link,
		image: p.image
	}));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, e) => {
    const { name, value } = e.target;
    const arr = [...formData[field]];
    arr[index] = { ...arr[index], [name]: value };
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], (['technicalSkills','areaOfInterest','honors','extracurriculars'].includes(field) ? '' : {})]
    }));
  };

  const removeArrayItem = (field, index) => {
    const arr = [...formData[field]];
    arr.splice(index,1);
    setFormData(prev => ({ ...prev, [field]: arr }));
  };

  const updatePreview = async () => {
    if(!selectedTemplate) return;
    setIsLoadingPreview(true);
    try {
      const html = await window.DomPatcher.patchTemplate(selectedTemplate.file, formData);
      if (html) setPreviewHTML(html);
    } catch (e) { console.error(e); }
    finally { setIsLoadingPreview(false); }
  };
  useEffect(()=>{ if(selectedTemplate && showPreview) updatePreview(); }, [selectedTemplate, formData, showPreview]);

  const handleDeploy = async () => {
    if(!selectedTemplate) return alert('Please select a template first!');
    try {
      const html = await window.DomPatcher.patchTemplate(selectedTemplate.file, formData);
      if (!html) return;
      const blob = new Blob([html], { type:'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(()=>URL.revokeObjectURL(url), 10000);
    } catch(e){ console.error('Deploy error', e); alert('Error deploying portfolio.'); }
  };

  function slug(s){ return (s||'portfolio').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
  const handleDownloadHTML = async () => {
    if(!selectedTemplate) return alert('Choose a template first');
    const html = await window.DomPatcher.patchTemplate(selectedTemplate.file, formData);
    if(!html) return;
    const blob = new Blob([html], { type:'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${slug(formData.name)}-portfolio${selectedTemplate.id}.html`; a.click();
    setTimeout(()=>URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className={`relative rounded-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Close">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center heading-font">Build Your Portfolio</h2>

        <div className="space-y-8">
          <form onSubmit={(e)=>{e.preventDefault(); setShowPreview(true);}} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500" required/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Number</label>
                <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">GitHub</label>
                <input type="url" name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/yourusername" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/yourprofile" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
              </div>
            </div>

            {/* Education */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">Education</label>
                <button type="button" onClick={()=>addArrayItem('education')} className="text-sm text-pink-500 hover:underline">+ Add Education</button>
              </div>
              {formData.education.map((edu, index)=>(
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <input type="text" name="institution" value={edu.institution} onChange={(e)=>handleArrayChange('education', index, e)} placeholder="Institution" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                  <input type="text" name="degree" value={edu.degree} onChange={(e)=>handleArrayChange('education', index, e)} placeholder="Degree" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                  <div className="flex">
                    <input type="text" name="year" value={edu.year} onChange={(e)=>handleArrayChange('education', index, e)} placeholder="Year" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    {formData.education.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('education', index)} className="ml-2 text-red-500" aria-label="Remove education">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Experience */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">Work Experience</label>
                <button type="button" onClick={()=>addArrayItem('experience')} className="text-sm text-pink-500 hover:underline">+ Add Experience</button>
              </div>
              {formData.experience.map((exp, index)=>(
                <div key={index} className="mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <input type="text" name="company" value={exp.company} onChange={(e)=>handleArrayChange('experience', index, e)} placeholder="Company" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    <input type="text" name="position" value={exp.position} onChange={(e)=>handleArrayChange('experience', index, e)} placeholder="Position" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                  </div>
                  <input type="text" name="duration" value={exp.duration} onChange={(e)=>handleArrayChange('experience', index, e)} placeholder="Duration (e.g., Jan 2023 - Present)" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"/>
                  <div className="flex">
                    <textarea name="description" value={exp.description} onChange={(e)=>handleArrayChange('experience', index, e)} placeholder="Description of your role and achievements" rows="2" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
                    {formData.experience.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('experience', index)} className="ml-2 text-red-500" aria-label="Remove experience">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Projects */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">{formData.projects.length > 1 ? 'Projects' : 'Project'}</label>
                <button type="button" onClick={()=>addArrayItem('projects')} className="text-sm text-pink-500 hover:underline">+ Add {formData.projects.length ? 'Another' : 'Project'}</button>
              </div>
              {formData.projects.map((project, index)=>(
                <div key={index} className="mb-4">
                  <input type="text" name="title" value={project.title} onChange={(e)=>handleArrayChange('projects', index, e)} placeholder="Project Title" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"/>
                  <textarea name="description" value={project.description} onChange={(e)=>handleArrayChange('projects', index, e)} placeholder="Project Description" rows="2" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-2"></textarea>
                  <div className="flex">
                    <input type="url" name="link" value={project.link} onChange={(e)=>handleArrayChange('projects', index, e)} placeholder="Project Link (URL)" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    {formData.projects.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('projects', index)} className="ml-2 text-red-500" aria-label="Remove project">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills/Interests/Honors */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">Technical Skills</label>
                <button type="button" onClick={()=>addArrayItem('technicalSkills')} className="text-sm text-pink-500 hover:underline">+ Add Skill</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technicalSkills.map((skill, index)=>(
                  <div key={index} className="flex items-center">
                    <input type="text" value={skill} onChange={(e)=>{
                      const arr=[...formData.technicalSkills]; arr[index]=e.target.value;
                      setFormData(prev=>({...prev, technicalSkills:arr}));
                    }} placeholder="Skill" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    {formData.technicalSkills.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('technicalSkills', index)} className="ml-1 text-red-500" aria-label="Remove skill">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">Area of Interest</label>
                <button type="button" onClick={()=>addArrayItem('areaOfInterest')} className="text-sm text-pink-500 hover:underline">+ Add Interest</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.areaOfInterest.map((interest, index)=>(
                  <div key={index} className="flex items-center">
                    <input type="text" value={interest} onChange={(e)=>{
                      const arr=[...formData.areaOfInterest]; arr[index]=e.target.value;
                      setFormData(prev=>({...prev, areaOfInterest:arr}));
                    }} placeholder="Interest" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    {formData.areaOfInterest.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('areaOfInterest', index)} className="ml-1 text-red-500" aria-label="Remove interest">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium heading-font">Honors & Awards</label>
                <button type="button" onClick={()=>addArrayItem('honors')} className="text-sm text-pink-500 hover:underline">+ Add Honor</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.honors.map((honor, index)=>(
                  <div key={index} className="flex items-center">
                    <input type="text" value={honor} onChange={(e)=>{
                      const arr=[...formData.honors]; arr[index]=e.target.value;
                      setFormData(prev=>({...prev, honors:arr}));
                    }} placeholder="Honor/Award" className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                    {formData.honors.length>1 && (
                      <button type="button" onClick={()=>removeArrayItem('honors', index)} className="ml-1 text-red-500" aria-label="Remove honor">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Template + Preview */}
            <div className="preview-container my-6">
              <div>
				<h3 className="font-semibold mb-3">Choose a template</h3>
				<div className="max-h-[50vh] overflow-y-auto pr-2">
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {templates.map(t => (
                    <button key={t.id} type="button" onClick={()=>{ setSelectedTemplate(t); setShowPreview(true); }} className={`template-option rounded-lg overflow-hidden border ${selectedTemplate?.id===t.id ? 'selected' : ''}`} title={t.name}>
                      <img src={t.image} alt={t.name} className="w-full h-36 object-cover" loading="lazy" decoding="async" />
                      <div className="p-2 text-left text-sm">{t.name}</div>
                    </button>
                  ))}
					</div>
				</div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Live preview</h3>
                <div className="preview-frame rounded-lg">
                  {isLoadingPreview ? (
                    <div className="w-full h-full flex items-center justify-center">Generating preview…</div>
                  ) : (
                    <iframe title="Template preview" srcDoc={previewHTML || '<html><body style="font-family:sans-serif;padding:1rem;color:#555">Select a template to preview.</body></html>'} />
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={handleDeploy} type="button" className="deploy-btn text-white px-4 py-2 rounded-lg">Deploy as Website</button>
                  <button onClick={handleDownloadHTML} type="button" className="px-4 py-2 rounded-lg bg-gray-200">Download .html</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

window.ResumeBuilder = ResumeBuilder;
