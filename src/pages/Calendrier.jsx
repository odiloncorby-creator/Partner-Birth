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
      <div className="text-center">
        <div className="text-gradient font-serif font-bold leading-none" style={{ fontSize: '5rem' }}>
          J&nbsp;-&nbsp;{days}
        </div>
        <p className="text-slate-400 text-sm mt-2 font-medium">
          {days === 1 ? 'Encore 1 jour' : `Encore ${days} jours`} avant le terme
        </p>
      </div>
    )
  }

  if (days === 0) {
    return (
      <div className="text-center">
        <div className="font-serif font-bold leading-none text-cyan-400" style={{ fontSize: '3.5rem' }}>
          J • Le grand jour !
        </div>
        <p className="text-slate-400 text-sm mt-2">C'est aujourd'hui — vous êtes prêts.</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="text-gradient font-serif font-bold leading-none" style={{ fontSize: '5rem' }}>
        J&nbsp;+&nbsp;{Math.abs(days)}
      </div>
      <p className="text-slate-400 text-sm mt-2 font-medium">
        {Math.abs(days) === 1 ? '1 jour après' : `${Math.abs(days)} jours après`} le terme
      </p>
    </div>
  )
}

function MilestoneRow({ milestone, isActive, isPast }) {
  return (
    <div className={`flex items-start gap-3 py-2.5 ${isActive ? 'opacity-100' : isPast ? 'opacity-60' : 'opacity-35'}`}>
      <div className={`mt-0.5 shrink-0 ${isPast ? 'text-cyan-400' : isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
        {isPast ? <CheckCircle2 size={18} /> : isActive ? <ChevronRight size={18} /> : <Circle size={18} />}
      </div>
      <div className="flex-1 min-w-0">
        <span className={`text-sm font-medium ${isActive ? 'text-white' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>
          {milestone.label}
        </span>
        {isActive && (
          <p className="text-xs text-slate-400 mt-0.5 leading-snug">{milestone.title}</p>
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

  if (!termeDate || editing) {
    return (
      <div className="min-h-screen hero-gradient-dark">
        {/* Hero */}
        <div className="px-4 pt-12 pb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl glass mb-4">
            <CalendarDays size={28} className="text-cyan-400" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white mb-2">Votre terme</h1>
          <p className="text-sm text-slate-400">Pour personaliser votre compte à rebours</p>
        </div>

        {/* Card */}
        <div className="mx-4">
          <div className="glass rounded-3xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Date du terme
            </label>
            <input
              type="date"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-base focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/60 transition-all"
              min={new Date().toISOString().split('T')[0]}
            />
            <button
              onClick={handleSave}
              disabled={!inputValue}
              className="w-full mt-4 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-semibold text-base transition-all active:scale-[0.98]"
            >
              {editing ? 'Enregistrer' : 'Commencer le compte à rebours'}
            </button>
            {editing && (
              <button
                onClick={() => setEditing(false)}
                className="w-full mt-2 py-3 rounded-xl text-slate-400 hover:text-slate-200 text-sm transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
          <p className="text-center text-xs text-slate-600 mt-4">
            Cette date reste uniquement sur votre appareil.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen hero-gradient-dark">
      {/* Header */}
      <div className="px-4 pt-10 pb-6">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">Terme</p>
          <button
            onClick={handleEdit}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2 rounded-lg hover:bg-white/5"
          >
            <Pencil size={12} />
            {formatTermDate(termeDate)}
          </button>
        </div>
      </div>

      {/* Countdown */}
      <div className="glass mx-4 rounded-3xl p-6 mb-4">
        <CountdownDisplay days={days} />

        {currentMilestone && (
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-center gap-2">
            <span className={`text-xs font-medium px-3 py-1 rounded-full ${currentMilestone.badgeColor}`}>
              {currentMilestone.label}
            </span>
            <span className="text-sm text-slate-300">{currentMilestone.title}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      {currentMilestone && (
        <div className="mx-4 mb-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-1">
            À faire maintenant
          </p>
          <div className="glass rounded-3xl overflow-hidden divide-y divide-white/5">
            {currentMilestone.actions.map((action, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5">
                <ChevronRight size={14} className="text-cyan-400 shrink-0" />
                <span className="text-sm text-slate-200 leading-snug">{action}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="mx-4 mb-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 px-1">
          Les phases
        </p>
        <div className="glass rounded-3xl px-4 py-2 divide-y divide-white/5">
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
  )
}
