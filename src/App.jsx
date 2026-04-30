import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Prepare from './pages/Prepare'
import Bagages from './pages/Bagages'
import ModeJ from './pages/ModeJ'
import Info from './pages/Info'
import Calendrier from './pages/Calendrier'
import EnDirect from './pages/EnDirect'

const PAGES = {
  prepare: Prepare,
  bagages: Bagages,
  calendrier: Calendrier,
  'mode-j': ModeJ,
  info: Info,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('prepare')
  const [selectedTipId, setSelectedTipId] = useState(null)
  const [enDirectActive, setEnDirectActive] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedTipId(null)
  }

  if (enDirectActive) {
    return <EnDirect onBack={() => setEnDirectActive(false)} />
  }

  const ActivePage = PAGES[activeTab]

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <ActivePage
          selectedTipId={selectedTipId}
          onSelectTip={setSelectedTipId}
          onBack={() => setSelectedTipId(null)}
          onStartEnDirect={() => setEnDirectActive(true)}
        />
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
