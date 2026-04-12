import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
import Accordion from './Accordion'

const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }

const ICON_COLORS = {
  Shield: 'bg-sky-500/25 text-sky-200',
  Package: 'bg-violet-500/25 text-violet-200',
  Clock: 'bg-amber-500/25 text-amber-200',
  Car: 'bg-emerald-500/25 text-emerald-200',
  Heart: 'bg-rose-500/25 text-rose-200',
  Activity: 'bg-cyan-500/25 text-cyan-200',
  AlertCircle: 'bg-red-500/25 text-red-300',
}

const GYNECO_COLORS = {
  Shield: 'bg-sky-50 border-sky-200',
  Package: 'bg-violet-50 border-violet-200',
  Clock: 'bg-amber-50 border-amber-200',
  Car: 'bg-emerald-50 border-emerald-200',
  Heart: 'bg-rose-50 border-rose-200',
  Activity: 'bg-cyan-50 border-cyan-200',
  AlertCircle: 'bg-red-50 border-red-200',
}

const GYNECO_TEXT = {
  Shield: 'text-sky-600',
  Package: 'text-violet-600',
  Clock: 'text-amber-600',
  Car: 'text-emerald-600',
  Heart: 'text-rose-600',
  Activity: 'text-cyan-600',
  AlertCircle: 'text-red-600',
}

export default function TipDetail({ tip, onBack }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield
  const iconClass = ICON_COLORS[tip.icon] ?? 'bg-white/15 text-white'
  const gynecoCard = GYNECO_COLORS[tip.icon] ?? 'bg-sky-50 border-sky-200'
  const gynecoText = GYNECO_TEXT[tip.icon] ?? 'text-sky-600'

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="hero-gradient px-4 pt-10 pb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors mb-6 py-1 -ml-1 min-h-[44px]"
          aria-label="Retour à la liste"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Préparer</span>
        </button>
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 ${iconClass}`}>
            <Icon size={22} />
          </div>
          <h1 className="text-xl font-bold font-serif text-white leading-snug">{tip.title}</h1>
        </div>
      </div>

      {/* Content card */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-10 relative z-10">
        {/* Résumé */}
        <p className="text-sm text-foreground/65 leading-relaxed mb-5">{tip.summary}</p>

        {/* Accordéons */}
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden mb-4">
          {tip.sections.map((section) => (
            <div key={section.title} className="px-4">
              <Accordion title={section.title} content={section.content} />
            </div>
          ))}
        </div>

        {/* Conseil du gynéco */}
        {tip.gyneco_tip && (
          <div className={`p-4 rounded-2xl border ${gynecoCard}`}>
            <div className="flex items-start gap-3">
              <Lightbulb size={18} className={`${gynecoText} mt-0.5 shrink-0`} />
              <div>
                <p className={`text-xs font-semibold mb-1 uppercase tracking-wide ${gynecoText}`}>
                  Le conseil du gynéco
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed italic">{tip.gyneco_tip}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
