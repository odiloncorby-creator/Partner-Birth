import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ChevronRight } from 'lucide-react'

const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }

export default function TipCard({ tip, onSelect }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield

  return (
    <button
      onClick={() => onSelect(tip.id)}
      className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl shadow-sm border border-border text-left min-h-[72px] active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted shrink-0">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground font-serif">{tip.title}</p>
        <p className="text-sm text-foreground/55 mt-0.5 truncate">{tip.summary}</p>
      </div>
      <ChevronRight size={18} className="text-foreground/30 shrink-0" />
    </button>
  )
}
