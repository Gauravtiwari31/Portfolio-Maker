import React, { useState } from 'react'
import Header from './components/Header'
import DiscoveryPage from './pages/DiscoveryPage'
import BuilderPage from './pages/BuilderPage'
import PreviewPage from './pages/PreviewPage'

function App() {
  const [currentPage, setCurrentPage] = useState('discovery')
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'discovery':
        return <DiscoveryPage onNavigate={setCurrentPage} onSelectTemplate={setSelectedTemplate} />
      case 'builder':
        return <BuilderPage onNavigate={setCurrentPage} selectedTemplate={selectedTemplate} />
      case 'preview':
        return <PreviewPage onNavigate={setCurrentPage} selectedTemplate={selectedTemplate} />
      default:
        return <DiscoveryPage onNavigate={setCurrentPage} onSelectTemplate={setSelectedTemplate} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  )
}

export default App