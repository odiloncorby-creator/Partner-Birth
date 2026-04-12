import { Moon } from 'lucide-react'
import { REFLEX_CARDS } from '../data/reflexCards'
import ReflexCard from '../components/ReflexCard'

export default function ModeJ() {
  return (
    <div className="min-h-screen hero-gradient-dark">
      {/* Header */}
      <div className="px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl glass">
            <Moon size={20} className="text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-serif text-white">Mode J</h1>
          </div>
        </div>
        <p className="text-sm text-slate-500 ml-13">Salle de naissance — cartes réflexes</p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-cyan-400">Actif</span>
        </div>
      </div>

      {/* Cards */}
      <div className="px-4 pb-4 flex flex-col gap-3">
        {REFLEX_CARDS.map((card) => (
          <ReflexCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
