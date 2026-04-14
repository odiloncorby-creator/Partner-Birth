import { TIPS } from '../data/tips'
import TipCard from '../components/TipCard'
import TipDetail from '../components/TipDetail'
import { BookOpen } from 'lucide-react'

export default function Prepare({ selectedTipId, onSelectTip, onBack }) {
  const selectedTip = TIPS.find((t) => t.id === selectedTipId)

  if (selectedTip) {
    return <TipDetail tip={selectedTip} onBack={onBack} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
            <BookOpen size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">Préparer</h1>
        </div>
        <p className="text-sm text-sky-100/70 ml-13">9 fiches essentielles pour l'accompagnant</p>
      </div>

      {/* Content card */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-4 relative z-10">
        <div className="flex flex-col gap-3">
          {TIPS.map((tip) => (
            <TipCard key={tip.id} tip={tip} onSelect={onSelectTip} />
          ))}
        </div>
      </div>
    </div>
  )
}
