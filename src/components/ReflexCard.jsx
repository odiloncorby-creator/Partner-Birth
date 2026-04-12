import { Wind, Hand, Brain, MessageCircle, AlertTriangle } from 'lucide-react'

const ICON_MAP = { Wind, Hand, Brain, MessageCircle, AlertTriangle }

const ICON_COLORS = {
  Wind: 'bg-sky-500/20 text-sky-300',
  Hand: 'bg-violet-500/20 text-violet-300',
  Brain: 'bg-indigo-500/20 text-indigo-300',
  MessageCircle: 'bg-cyan-500/20 text-cyan-300',
  AlertTriangle: 'bg-red-500/20 text-red-400',
}

export default function ReflexCard({ card }) {
  const Icon = ICON_MAP[card.icon] ?? AlertTriangle
  const colorClass = ICON_COLORS[card.icon] ?? 'bg-white/10 text-white'

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-xl shrink-0 ${colorClass}`}>
          <Icon size={20} />
        </div>
        <h2 className="text-base font-semibold text-white font-serif">{card.title}</h2>
      </div>
      <p className="text-sm font-medium text-slate-200 leading-snug mb-2">{card.instruction}</p>
      <p className="text-xs text-slate-400 leading-relaxed">{card.detail}</p>
    </div>
  )
}
