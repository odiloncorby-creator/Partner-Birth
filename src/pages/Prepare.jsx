import { TIPS } from '../data/tips'
import TipCard from '../components/TipCard'
import TipDetail from '../components/TipDetail'

export default function Prepare({ selectedTipId, onSelectTip, onBack }) {
  const selectedTip = TIPS.find((t) => t.id === selectedTipId)

  if (selectedTip) {
    return <TipDetail tip={selectedTip} onBack={onBack} />
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Préparer</h1>
      <p className="text-sm text-foreground/55 mb-6">9 fiches pour l'accompagnant</p>
      <div className="flex flex-col gap-3">
        {TIPS.map((tip) => (
          <TipCard key={tip.id} tip={tip} onSelect={onSelectTip} />
        ))}
      </div>
    </div>
  )
}
