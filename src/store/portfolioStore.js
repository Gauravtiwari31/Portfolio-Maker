import { create } from 'zustand'

const usePortfolioStore = create(
    (set, get) => ({
      // Resume data (JSON Resume format)
      resume: {
        basics: {
          name: '',
          email: '',
          phone: '',
          location: { city: '', state: '', country: '' },
          summary: '',
          profiles: []
        },
        work: [],
        education: [],
        skills: [],
        projects: [],
        languages: [],
        interests: []
      },
      
      // Selected template
      selectedTemplate: null,
      
      // UI state
      isEditing: false,
      selectedSection: null,
      
      // Actions
      setResume: (resume) => set({ resume }),
      updateResumeField: (section, field, value) => set((state) => ({
        resume: {
          ...state.resume,
          [section]: {
            ...state.resume[section],
            [field]: value
          }
        }
      })),
      
      updateResumeArrayItem: (section, index, item) => set((state) => {
        const newArray = [...state.resume[section]]
        newArray[index] = item
        return {
          resume: {
            ...state.resume,
            [section]: newArray
          }
        }
      }),
      
      addResumeArrayItem: (section, item) => set((state) => ({
        resume: {
          ...state.resume,
          [section]: [...state.resume[section], item]
        }
      })),
      
      removeResumeArrayItem: (section, index) => set((state) => {
        const newArray = state.resume[section].filter((_, i) => i !== index)
        return {
          resume: {
            ...state.resume,
            [section]: newArray
          }
        }
      }),
      
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setIsEditing: (isEditing) => set({ isEditing }),
      setSelectedSection: (section) => set({ selectedSection: section }),
      
      // Clear all data
      clearData: () => set({
        resume: {
          basics: {
            name: '',
            email: '',
            phone: '',
            location: { city: '', state: '', country: '' },
            summary: '',
            profiles: []
          },
          work: [],
          education: [],
          skills: [],
          projects: [],
          languages: [],
          interests: []
        },
        selectedTemplate: null,
        isEditing: false,
        selectedSection: null
      })
    })
)

export default usePortfolioStore