import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Walkthrough from './components/Walkthrough'
import DownloadFAQ from './components/DownloadFAQ'
import Footer from './components/Footer'
import LegalModal from './components/LegalModal'

export default function App() {
  const [legalOpen, setLegalOpen] = useState(false)
  const [legalTab, setLegalTab] = useState('privacy')

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalTab(tab)
    setLegalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#090B10] text-white selection:bg-sky-500/30 selection:text-sky-200">
      <Navbar onOpenLegal={handleOpenLegal} />
      <main>
        <Hero />
        <Features />
        <Walkthrough />
        <DownloadFAQ />
      </main>
      <Footer onOpenLegal={handleOpenLegal} />
      <LegalModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        initialTab={legalTab}
      />
    </div>
  )
}
