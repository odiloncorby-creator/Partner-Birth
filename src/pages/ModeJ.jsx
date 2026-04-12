import { Moon } from 'lucide-react'
import { REFLEX_CARDS } from '../data/reflexCards'
import ReflexCard from '../components/ReflexCard'

export default function ModeJ() {
  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-1">
        <Moon size={22} className="text-blue-400" />
        <h1 className="text-2xl font-bold font-serif text-white">Mode J</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6 ml-9">Salle de naissance — cartes réflexes</p>
      <div className="flex flex-col gap-4">
        {REFLEX_CARDS.map((card) => (
          <ReflexCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
