import { Wind, Hand, Brain, MessageCircle, AlertTriangle, Target, Building2, Home } from 'lucide-react'

const ICON_MAP = { Wind, Hand, Brain, MessageCircle, AlertTriangle, Target, Building2, Home }

export default function ReflexCard({ card }) {
  const Icon = ICON_MAP[card.icon] ?? AlertTriangle

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 shrink-0">
          <Icon size={20} className="text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-white font-serif">{card.title}</h2>
      </div>
      <p className="text-base font-medium text-gray-100 leading-snug mb-3">{card.instruction}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{card.detail}</p>
    </div>
  )
}
