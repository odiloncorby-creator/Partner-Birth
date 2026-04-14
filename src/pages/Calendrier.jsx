import { useState } from 'react'
import { CalendarDays, Pencil, CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { MILESTONES, getMilestone } from '../data/milestones'

function getDaysUntilTerm(dateStr) {
  if (!dateStr) return null
  const term = new Date(dateStr)
  const today = new Date()
  term.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return Math.round((term - today) / (1000 * 60 * 60 * 24))
}

function formatTermDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function CountdownDisplay({ days }) {
  if (days === null) return null

  if (days > 0) {
    return (
      <div className="text-center py-2">
        <div className="text-gradient font-serif font-bold leading-none" style={{ fontSize: '5rem' }}>
          J&nbsp;-&nbsp;{days}
        </div>
        <p className="text-slate-400 text-sm mt-3 font-medium">
          {days === 1 ? 'Encore 1 jour' : `Encore ${days} jours`} avant le terme
        </p>
      </div>
    )
  }

  if (days === 0) {
    return (
      <div className="text-center py-2">
        <div className="font-serif font-bold leading-none text-cyan-400" style={{ fontSize: '3rem' }}>
          J • Le grand jour&nbsp;!
        </div>
        <p className="text-slate-400 text-sm mt-3">C'est aujourd'hui — vous êtes prêts.</p>
      </div>
    )
  }

  return (
    <div className="text-center py-2">
      <div className="text-gradient font-serif font-bold leading-none" style={{ fontSize: '5rem' }}>
        J&nbsp;+&nbsp;{Math.abs(days)}
      </div>
      <p className="text-slate-400 text-sm mt-3 font-medium">
        {Math.abs(days) === 1 ? '1 jour après' : `${Math.abs(days)} jours après`} le terme
      </p>
    </div>
  )
}

function MilestoneRow({ milestone, isActive, isPast }) {
  return (
    <div className={`flex items-start gap-3 py-3 ${isActive ? 'opacity-100' : isPast ? 'opacity-60' : 'opacity-35'}`}>
      <div className={`mt-0.5 shrink-0 ${isPast || isActive ? 'text-primary' : 'text-foreground/25'}`}>
        {isPast ? <CheckCircle2 size={18} /> : isActive ? <ChevronRight size={18} /> : <Circle size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${isActive ? 'text-foreground' : isPast ? 'text-foreground/70' : 'text-foreground/40'}`}>
          {milestone.label}
        </span>
        {isActive && (
          <p className="text-xs text-foreground/50 mt-0.5 leading-snug">{milestone.title}</p>
        )}
      </div>
      {isActive && (
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${milestone.badgeColor}`}>
          En cours
        </span>
      )}
    </div>
  )
}

export default function Calendrier() {
  const [termeDate, setTermeDate] = useLocalStorage('pb-terme', '')
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(termeDate)

  const days = getDaysUntilTerm(termeDate)
  const currentMilestone = days !== null ? getMilestone(days) : null

  const handleSave = () => {
    if (!inputValue) return
    setTermeDate(inputValue)
    setEditing(false)
  }

  const handleEdit = () => {
    setInputValue(termeDate)
    setEditing(true)
  }

  const orderedMilestones = [
    MILESTONES.find((m) => m.id === 'anticipation'),
    MILESTONES.find((m) => m.id === 'prep-active'),
    MILESTONES.find((m) => m.id === 'bags'),
    MILESTONES.find((m) => m.id === 'final-checks'),
    MILESTONES.find((m) => m.id === 'last-week'),
    MILESTONES.find((m) => m.id === 'countdown'),
    MILESTONES.find((m) => m.id === 'birth-day'),
    MILESTONES.find((m) => m.id === 'postpartum'),
  ]

  const currentIndex = orderedMilestones.findIndex((m) => m?.id === currentMilestone?.id)

  /* ── Formulaire de saisie de date ── */
  if (!termeDate || editing) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <div className="hero-gradient px-4 pt-12 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 mb-4">
            <CalendarDays size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mb-1">Votre terme</h1>
          <p className="text-sm text-sky-100/70">Pour personnaliser votre compte à rebours</p>
        </div>

        {/* Card formulaire */}
        <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-6 pb-10 relative z-10">
          <div className="bg-white rounded-2xl border border-border shadow-sm p-5">
            <label className="block text-sm font-medium text-foreground/70 mb-2">
              Date du terme
            </label>
            <input
              type="date"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all"
            />
            <button
              onClick={handleSave}
              disabled={!inputValue}
              className="w-full mt-4 py-3.5 rounded-xl bg-primary hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-base transition-all active:scale-[0.98] shadow-sm"
            >
              {editing ? 'Enregistrer' : 'Commencer le compte à rebours'}
            </button>
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="w-full mt-2 py-3 rounded-xl text-foreground/50 hover:text-foreground/70 text-sm transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
          <p className="text-center text-xs text-foreground/35 mt-4">
            Cette date reste uniquement sur votre appareil.
          </p>
        </div>
      </div>
    )
  }

  /* ── Vue principale : compte à rebours actif ── */
  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
              <CalendarDays size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-serif text-white">Calendrier</h1>
              <p className="text-sm text-sky-100/70">Terme : {formatTermDate(termeDate)}</p>
            </div>
          </div>
          <button
            onClick={handleEdit}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Modifier la date"
          >
            <Pencil size={15} className="text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-8 relative z-10">

        {/* Card compte à rebours — fond sombre dramatique */}
        <div
          className="rounded-3xl overflow-hidden mb-4"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a3a 100%)' }}
        >
          <div className="p-6">
            <CountdownDisplay days={days} />
            {currentMilestone && (
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-2 flex-wrap">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${currentMilestone.badgeColor}`}>
                  {currentMilestone.label}
                </span>
                <span className="text-sm text-slate-300 text-center">{currentMilestone.title}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions prioritaires */}
        {currentMilestone && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-2 px-1">
              À faire maintenant
            </p>
            <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden divide-y divide-border">
              {currentMilestone.actions.map((action, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                  <ChevronRight size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground leading-snug">{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timeline des phases */}
        <div>
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-2 px-1">
            Les phases
          </p>
          <div className="bg-white rounded-2xl border border-border shadow-sm px-4 divide-y divide-border">
            {orderedMilestones.map((milestone, i) => (
              <MilestoneRow
                key={milestone.id}
                milestone={milestone}
                isActive={milestone.id === currentMilestone?.id}
                isPast={i < currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
