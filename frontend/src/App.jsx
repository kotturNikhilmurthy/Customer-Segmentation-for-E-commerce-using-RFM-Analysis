import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import UploadPage from './pages/UploadPage'
import HowItWorks from './pages/HowItWorks'
import WhyRFM from './pages/WhyRFM'
import Dashboard from './pages/Dashboard'
import Documentation from './pages/Documentation'

function App() {
  const [analysisData, setAnalysisData] = useState(null)

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<UploadPage setAnalysisData={setAnalysisData} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/why-rfm" element={<WhyRFM />} />
          <Route path="/dashboard" element={<Dashboard analysisData={analysisData} />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
