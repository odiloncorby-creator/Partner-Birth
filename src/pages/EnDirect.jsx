import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import { BIRTH_PHASES } from '../data/birthPhases'
import { REFLEX_CARDS } from '../data/reflexCards'
import ReflexCard from '../components/ReflexCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

function formatInterval(ms) {
  const totalSec = Math.round(ms / 1000)
  const min = Math.floor(totalSec / 60)
  const sec = totalSec % 60
  if (min === 0) return `${sec} s`
  if (sec === 0) return `${min} min`
  return `${min} min ${sec}`
}

function ContractionCounter() {
  const [taps, setTaps] = useState([])

  const handleTap = () => setTaps((prev) => [...prev, Date.now()])

  const intervals = []
  for (let i = 1; i < taps.length; i++) intervals.push(taps[i] - taps[i - 1])

  const lastInterval = intervals.at(-1) ?? null
  const recentIntervals = intervals.slice(-5)
  const avgInterval =
    recentIntervals.length >= 2
      ? recentIntervals.reduce((a, b) => a + b, 0) / recentIntervals.length
      : null

  const isUrgent = avgInterval !== null && avgInterval < 5 * 60 * 1000

  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/20 p-4">
      <button
        onClick={handleTap}
        className="w-full py-5 rounded-xl border-2 border-slate-600 bg-slate-800/40 hover:border-cyan-600/50 hover:bg-cyan-500/5 active:scale-[0.97] active:border-cyan-500 active:bg-cyan-500/15 transition-all select-none"
      >
        <div className="text-center">
          <p className="text-2xl mb-1">👊</p>
          <p className="text-sm font-semibold text-slate-200">
            {taps.length === 0 ? 'Taper à chaque début de contraction' : 'Contraction !'}
          </p>
          {taps.length > 0 && (
            <p className="text-xs text-slate-500 mt-0.5">
              {taps.length} enregistrée{taps.length > 1 ? 's' : ''}
            </p>
          )}
        </div>
      </button>

      {taps.length >= 2 && (
        <div className="mt-3 flex gap-3">
          <div className="flex-1 rounded-xl bg-slate-800/60 p-3 text-center">
            <p className="text-xs text-slate-500 mb-0.5">Dernière</p>
            <p className="text-base font-bold text-white">{formatInterval(lastInterval)}</p>
          </div>
          {avgInterval !== null && (
            <div
              className={`flex-1 rounded-xl p-3 text-center ${
                isUrgent ? 'bg-cyan-500/15 border border-cyan-500/30' : 'bg-slate-800/60'
              }`}
            >
              <p className={`text-xs mb-0.5 ${isUrgent ? 'text-cyan-400' : 'text-slate-500'}`}>
                Moyenne
              </p>
              <p className={`text-base font-bold ${isUrgent ? 'text-cyan-300' : 'text-white'}`}>
                {formatInterval(avgInterval)}
              </p>
            </div>
          )}
        </div>
      )}

      {isUrgent && (
        <p className="mt-2 text-xs text-cyan-400 text-center font-medium">
          Toutes les ~5 min → il est temps de partir !
        </p>
      )}

      {intervals.length >= 2 && (
        <div className="mt-3 flex flex-wrap gap-1.5 justify-center">
          {intervals.slice(-5).map((iv, i) => (
            <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-slate-700/60 text-slate-400">
              {formatInterval(iv)}
            </span>
          ))}
        </div>
      )}

      {taps.length > 0 && (
        <button
          onClick={() => setTaps([])}
          className="mt-3 w-full text-xs text-slate-600 hover:text-slate-400 transition-colors py-1"
        >
          Réinitialiser
        </button>
      )}
    </div>
  )
}

const QUICK_CHECKS = [
  'Sac prêt',
  'Transport validé',
  'Maternité appelée',
  'Formalités d\'arrivée gérées (toi)',
  'Lumière et ambiance salle ajustée',
]

function OnboardingScreen({ onDismiss }) {
  return (
    <div className="min-h-screen hero-gradient-dark flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-xs">
        <div className="text-4xl mb-6">🤝</div>
        <h2 className="text-2xl font-bold font-serif text-white mb-6">En direct</h2>
        <ul className="text-left space-y-4 mb-8">
          <li className="flex items-start gap-3 text-slate-300 text-sm">
            <span className="text-cyan-400 shrink-0 mt-0.5">→</span>
            Tape la phase où elle en est
          </li>
          <li className="flex items-start gap-3 text-slate-300 text-sm">
            <span className="text-cyan-400 shrink-0 mt-0.5">→</span>
            Chaque carte te dit quoi observer et quoi faire
          </li>
          <li className="flex items-start gap-3 text-slate-300 text-sm">
            <span className="text-cyan-400 shrink-0 mt-0.5">→</span>
            Fais défiler pour la checklist et l'aide rapide
          </li>
        </ul>
        <button
          onClick={onDismiss}
          className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-base transition-all active:scale-[0.98] shadow-lg"
        >
          Compris, on y va
        </button>
      </div>
    </div>
  )
}

function PhaseCard({ phase, status, onTap }) {
  const isPast = status === 'past'
  const isActive = status === 'active'

  return (
    <button
      onClick={() => !isActive && onTap(phase.id)}
      className={`w-full text-left rounded-2xl border p-4 transition-all ${
        isPast
          ? 'border-slate-700 bg-slate-800/30 opacity-50'
          : isActive
          ? 'border-cyan-500/60 bg-cyan-500/10'
          : 'border-slate-700/50 bg-slate-800/20 opacity-40'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`shrink-0 ${isPast ? 'text-cyan-500' : isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
          {isPast ? <CheckCircle2 size={18} /> : <Circle size={18} />}
        </div>
        <span
          className={`font-semibold text-sm ${
            isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {phase.label}
        </span>
      </div>

      {isActive && (
        <div className="mt-3 space-y-3 pl-7">
          <div>
            <p className="text-xs font-semibold text-cyan-400/70 uppercase tracking-widest mb-1">
              Comment tu le sais
            </p>
            <p className="text-sm text-slate-200 leading-snug">{phase.signal}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-cyan-400/70 uppercase tracking-widest mb-1">
              Ce que tu fais
            </p>
            <p className="text-sm text-slate-200 leading-snug">{phase.action}</p>
          </div>
          {phase.words && (
            <div>
              <p className="text-xs font-semibold text-cyan-400/70 uppercase tracking-widest mb-1">
                Ce que tu dis
              </p>
              <p className="text-sm text-cyan-200 leading-snug italic">{phase.words}</p>
            </div>
          )}
        </div>
      )}
    </button>
  )
}

export default function EnDirect({ onBack }) {
  const [onboarded, setOnboarded] = useLocalStorage('pb-endirect-onboarded', false)
  const [currentPhaseId, setCurrentPhaseId] = useState(null)
  const [checks, setChecks] = useState(QUICK_CHECKS.map(() => false))

  if (!onboarded) {
    return <OnboardingScreen onDismiss={() => setOnboarded(true)} />
  }

  const currentIndex = BIRTH_PHASES.findIndex((p) => p.id === currentPhaseId)

  const getStatus = (index) => {
    if (currentIndex === -1) return 'future'
    if (index < currentIndex) return 'past'
    if (index === currentIndex) return 'active'
    return 'future'
  }

  const toggleCheck = (index) => {
    setChecks((prev) => prev.map((v, i) => (i === index ? !v : v)))
  }

  return (
    <div className="min-h-screen hero-gradient-dark">
      {/* Header */}
      <div className="px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h1 className="flex-1 text-xl font-bold font-serif text-white">En direct</h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Actif</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8 space-y-6">
        {/* Bloc 1 — Les phases */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
            Les phases
          </p>
          <div className="space-y-2">
            {BIRTH_PHASES.map((phase, index) => (
              <PhaseCard
                key={phase.id}
                phase={phase}
                status={getStatus(index)}
                onTap={setCurrentPhaseId}
              />
            ))}
          </div>
          {currentPhaseId && (
            <button
              onClick={() => setCurrentPhaseId(null)}
              className="mt-3 w-full text-xs text-slate-600 hover:text-slate-400 transition-colors py-2"
            >
              Réinitialiser les phases
            </button>
          )}
        </div>

        {/* Bloc 2 — Contractions */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
            Contractions
          </p>
          <ContractionCounter />
        </div>

        {/* Bloc 4 — Checklist rapide */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
            À cocher
          </p>
          <div className="rounded-2xl border border-slate-700/50 bg-slate-800/20 overflow-hidden divide-y divide-slate-700/30">
            {QUICK_CHECKS.map((item, index) => (
              <button
                key={index}
                onClick={() => toggleCheck(index)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/5 active:bg-white/10"
              >
                <div className={`shrink-0 ${checks[index] ? 'text-cyan-400' : 'text-slate-600'}`}>
                  {checks[index] ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                </div>
                <span
                  className={`text-sm leading-snug ${
                    checks[index] ? 'line-through text-slate-500' : 'text-slate-300'
                  }`}
                >
                  {item}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bloc 5 — Aide rapide */}
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3 px-1">
            Aide rapide
          </p>
          <div className="space-y-3">
            {REFLEX_CARDS.map((card) => (
              <ReflexCard key={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
