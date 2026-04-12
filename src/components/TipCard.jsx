import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ChevronRight } from 'lucide-react'

const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }

const ICON_COLORS = {
  Shield: 'bg-sky-100 text-sky-600',
  Package: 'bg-violet-100 text-violet-600',
  Clock: 'bg-amber-100 text-amber-600',
  Car: 'bg-emerald-100 text-emerald-600',
  Heart: 'bg-rose-100 text-rose-600',
  Activity: 'bg-cyan-100 text-cyan-600',
  AlertCircle: 'bg-red-100 text-red-600',
}

export default function TipCard({ tip, onSelect }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield
  const colorClass = ICON_COLORS[tip.icon] ?? 'bg-muted text-primary'

  return (
    <button
      onClick={() => onSelect(tip.id)}
      className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl shadow-sm border border-border text-left min-h-[72px] active:scale-[0.98] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 hover:shadow-md hover:border-sky-100"
    >
      <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${colorClass}`}>
        <Icon size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground font-serif">{tip.title}</p>
        <p className="text-sm text-foreground/55 mt-0.5 line-clamp-2 leading-snug">{tip.summary}</p>
      </div>
      <ChevronRight size={16} className="text-foreground/25 shrink-0" />
    </button>
  )
}
