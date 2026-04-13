import { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
import Accordion from './Accordion'

const ICON_MAP = { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle }

export default function TipDetail({ tip, onBack }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted active:bg-muted -ml-2 min-h-[44px] min-w-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Retour à la liste"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted">
            <Icon size={18} className="text-primary" />
          </div>
          <h1 className="text-lg font-semibold font-serif text-foreground">{tip.title}</h1>
        </div>
      </div>

      {/* Résumé */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-sm text-foreground/70 leading-relaxed">{tip.summary}</p>
      </div>

      {/* Accordéons */}
      <div className="px-4 pt-2">
        {tip.sections.map((section) => (
          <Accordion key={section.title} title={section.title} content={section.content} />
        ))}
      </div>

      {/* Conseil du gynéco */}
      {tip.gyneco_tip && (
        <div className="mx-4 mt-6 mb-8 p-4 rounded-2xl bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <Lightbulb size={18} className="text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold text-primary mb-1 uppercase tracking-wide">Le conseil du gynéco</p>
              <p className="text-sm text-foreground/75 leading-relaxed italic">{tip.gyneco_tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
