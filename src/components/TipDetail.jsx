import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
import Accordion from './Accordion'

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

export default function TipDetail({ tip, onBack }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield
  const colorClass = ICON_COLORS[tip.icon] ?? 'bg-muted text-primary'

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 glass-light border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted active:bg-muted -ml-2 min-h-[44px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-colors"
          aria-label="Retour à la liste"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className={`flex items-center justify-center w-9 h-9 rounded-xl shrink-0 ${colorClass}`}>
          <Icon size={18} />
        </div>
        <h1 className="text-base font-semibold font-serif text-foreground leading-snug">{tip.title}</h1>
      </div>

      {/* Résumé */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-sm text-foreground/65 leading-relaxed">{tip.summary}</p>
      </div>

      {/* Accordéons */}
      <div className="px-4 pt-2">
        {tip.sections.map((section) => (
          <Accordion key={section.title} title={section.title} content={section.content} />
        ))}
      </div>

      {/* Conseil du gynéco */}
      {tip.gyneco_tip && (
        <div className="mx-4 mt-6 mb-8 p-4 rounded-2xl bg-sky-50 border border-sky-200">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-sky-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-sky-600 mb-1 uppercase tracking-wide">Le conseil du gynéco</p>
              <p className="text-sm text-foreground/70 leading-relaxed italic">{tip.gyneco_tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
