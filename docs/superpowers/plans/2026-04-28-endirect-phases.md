# Phases du travail & Vue "En direct" — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "phases of labor" preparation tip and a real-time birth tracking view ("En direct") accessible from the Calendrier tab.

**Architecture:** New data file `birthPhases.js` feeds both the Préparer tip and the En direct view. `App.jsx` manages `enDirectActive` state and renders `EnDirect` full-screen (no BottomNav) when active. The Calendrier receives an `onStartEnDirect` callback prop that triggers the transition.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, lucide-react, Vitest

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/data/birthPhases.js` | Create | 6-phase data array |
| `src/data/birthPhases.test.js` | Create | Data integrity tests |
| `src/data/tips.js` | Modify | Add 10th tip: phases-travail |
| `src/data/tips.test.js` | Modify | Update count 9 → 10 |
| `src/pages/EnDirect.jsx` | Create | Full-screen En direct view |
| `src/pages/Calendrier.jsx` | Modify | Accept `onStartEnDirect` prop + activation block |
| `src/App.jsx` | Modify | `enDirectActive` state + EnDirect render |

---

## Task 1 — Data: birthPhases.js

**Files:**
- Create: `src/data/birthPhases.js`
- Create: `src/data/birthPhases.test.js`

- [ ] **Step 1: Write the failing test**

Create `src/data/birthPhases.test.js`:

```js
import { describe, it, expect } from 'vitest'
import { BIRTH_PHASES } from './birthPhases'

describe('BIRTH_PHASES data integrity', () => {
  it('contient exactement 6 phases', () => {
    expect(BIRTH_PHASES).toHaveLength(6)
  })

  it('chaque phase a les champs obligatoires', () => {
    BIRTH_PHASES.forEach((phase) => {
      expect(phase.id, `phase sans id`).toBeTruthy()
      expect(phase.label, `${phase.id} sans label`).toBeTruthy()
      expect(phase.signal, `${phase.id} sans signal`).toBeTruthy()
      expect(phase.action, `${phase.id} sans action`).toBeTruthy()
      expect('words' in phase, `${phase.id} sans champ words`).toBe(true)
    })
  })

  it('les ids sont uniques', () => {
    const ids = BIRTH_PHASES.map((p) => p.id)
    expect(new Set(ids).size).toBe(BIRTH_PHASES.length)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test -- --run src/data/birthPhases.test.js
```

Expected: FAIL — `Cannot find module './birthPhases'`

- [ ] **Step 3: Create birthPhases.js**

Create `src/data/birthPhases.js`:

```js
export const BIRTH_PHASES = [
  {
    id: 'preliminaire',
    label: 'Travail préliminaire',
    signal: 'Elle peut encore parler, se pose des questions.',
    action: 'Observer. Rester calme. Pas encore le moment de partir.',
    words: null,
  },
  {
    id: 'actif',
    label: 'Travail actif',
    signal: 'Ferme les yeux ~30s pendant la contraction. Ne peut plus parler.',
    action: 'Regarder la montre. Contractions toutes les 5 min → on part.',
    words: null,
  },
  {
    id: 'desesperance',
    label: 'Phase de désespérance',
    signal: 'Mots très forts, paroles morbides. Air instinctif, sauvage.',
    action: 'Rassurer dans la puissance. La naissance est imminente.',
    words: '"Tu es puissante." · "Tu es en train de le faire." · "Ça veut dire que c\'est imminent."',
  },
  {
    id: 'quietude',
    label: 'Phase de quiétude',
    signal: 'Contractions stoppées. Peut s\'endormir.',
    action: 'Ne pas paniquer. C\'est une pause — pas obligatoire mais normale.',
    words: null,
  },
  {
    id: 'poussee',
    label: 'Phase de poussée',
    signal: 'Envie de pousser. Les soignants guident.',
    action: 'Encourager. Laisser les soignants diriger. Max ~1h.',
    words: null,
  },
  {
    id: 'delivrance',
    label: 'Délivrance du placenta',
    signal: 'Bébé est né. Le corps expulse le placenta.',
    action: 'Rester présent. C\'est la dernière étape — quelques minutes encore.',
    words: null,
  },
]
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npm test -- --run src/data/birthPhases.test.js
```

Expected: PASS — 3 tests

- [ ] **Step 5: Commit**

```bash
git add src/data/birthPhases.js src/data/birthPhases.test.js
git commit -m "feat: add BIRTH_PHASES data with 6 labor phases"
```

---

## Task 2 — Data: Add tip phases-travail to tips.js

**Files:**
- Modify: `src/data/tips.js` (append at end of TIPS array)
- Modify: `src/data/tips.test.js` (line 5: `toHaveLength(9)` → `toHaveLength(10)`)

- [ ] **Step 1: Update the count test first**

In `src/data/tips.test.js`, change line 5:

```js
// Before:
expect(TIPS).toHaveLength(9)

// After:
expect(TIPS).toHaveLength(10)
```

- [ ] **Step 2: Run test to verify it now fails (count mismatch)**

```bash
npm test -- --run src/data/tips.test.js
```

Expected: FAIL — `expected 9 to deeply equal 10`

- [ ] **Step 3: Add the new tip at the end of TIPS array in tips.js**

At the very end of `src/data/tips.js`, before the closing `]`, add a comma after the last tip and append:

```js
  {
    id: 'phases-travail',
    icon: 'Waves',
    title: 'Les phases du travail',
    summary: 'Reconnaître chaque phase pour répondre au bon moment',
    sections: [
      {
        title: 'Travail préliminaire',
        content:
          'Elle peut encore parler, se pose des questions, cherche du réconfort. Les contractions sont irrégulières. Ce n\'est pas encore le moment de partir — observer, accompagner, rester calme.',
      },
      {
        title: 'Travail actif',
        content:
          'Les contractions deviennent intenses et régulières. Elle ferme les yeux ~30 secondes, impossible de parler pendant une contraction. Aucun doute quand la phrase est : "On part, on y va." Bruit guttural, air instinctif, plus de questions : c\'est le moment. Regarder la montre — contractions toutes les 5 minutes → on part. (Prendre sabots + trench s\'il pleut.)',
      },
      {
        title: 'Phase de désespérance',
        content:
          'Elle peut prononcer des mots très forts — paroles morbides, sentiment d\'abandon. Ce n\'est pas un appel à l\'aide ordinaire : c\'est le signe que la naissance est imminente. Ne pas gérer, ne pas compatir. Rassurer dans la puissance. Phrases à dire : "Tu es puissante." · "Tu es en train de le faire." · "Ça veut dire que c\'est imminent." Si cet appel à l\'aide apparaît en phase préliminaire : envisager la péridurale.',
      },
      {
        title: 'Phase de quiétude',
        content:
          'Le corps marque une pause. Les contractions s\'arrêtent. Elle peut s\'endormir quelques minutes. C\'est une parenthèse dans l\'effort — ne pas paniquer. Important : cette phase n\'arrive pas systématiquement. Si elle n\'apparaît pas, c\'est normal. Si elle arrive, c\'est normal aussi.',
      },
      {
        title: 'Phase de poussée',
        content:
          'Dernière ligne droite avant l\'arrivée du bébé. Les soignants guident les efforts de poussée. Accompagner, encourager. Durée maximale environ une heure.',
      },
      {
        title: 'Délivrance du placenta',
        content:
          'Dernière étape après la naissance du bébé. Le corps expulse le placenta — cela fait partie du processus et peut prendre quelques minutes. Rester présent, ne pas être surpris. C\'est la fin.',
      },
    ],
    gyneco_tip:
      'L\'accompagnant qui connaît les phases ne panique pas — il agit juste. La phase de désespérance surprend souvent les partenaires qui ne l\'ont pas anticipée : savoir qu\'elle signifie "c\'est imminent" change tout.',
  },
```

- [ ] **Step 4: Run full test suite**

```bash
npm test -- --run
```

Expected: all tests PASS

- [ ] **Step 5: Commit**

```bash
git add src/data/tips.js src/data/tips.test.js
git commit -m "feat: add phases-travail tip to Préparer section"
```

---

## Task 3 — Component: EnDirect.jsx

**Files:**
- Create: `src/pages/EnDirect.jsx`

No automated test — visual verification in browser after Task 5 wires it up.

- [ ] **Step 1: Create src/pages/EnDirect.jsx**

```jsx
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react'
import { BIRTH_PHASES } from '../data/birthPhases'
import { REFLEX_CARDS } from '../data/reflexCards'
import ReflexCard from '../components/ReflexCard'
import { useLocalStorage } from '../hooks/useLocalStorage'

const QUICK_CHECKS = [
  'Sac dans la voiture',
  'GPS programmé vers la maternité',
  'Maternité appelée',
  'Formalités d\'arrivée gérées (toi)',
  'Lumière et ambiance salle ajustées',
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

        {/* Bloc 2 — Checklist rapide */}
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

        {/* Bloc 3 — Aide rapide */}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/EnDirect.jsx
git commit -m "feat: add EnDirect full-screen birth tracking view"
```

---

## Task 4 — Calendrier.jsx: add activation block

**Files:**
- Modify: `src/pages/Calendrier.jsx`

The component currently has no props. It needs to accept `onStartEnDirect`.

- [ ] **Step 1: Add prop to component signature**

In `src/pages/Calendrier.jsx`, change line 83:

```jsx
// Before:
export default function Calendrier() {

// After:
export default function Calendrier({ onStartEnDirect }) {
```

- [ ] **Step 2: Insert activation block**

In the main return (the view with the countdown, starting around line 165), find this block:

```jsx
        {/* Card compte à rebours — fond sombre dramatique */}
        <div
          className="rounded-3xl overflow-hidden mb-4"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a3a 100%)' }}
        >
```

After its closing `</div>` (which ends the card bloc, around line 208 before the `{/* Actions prioritaires */}` comment), insert:

```jsx
        {/* Bloc activation En direct */}
        <div
          className="rounded-3xl overflow-hidden mb-4"
          style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c1a3a 100%)' }}
        >
          <div className="px-6 py-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold font-serif text-white">C'est parti !</h2>
              <p className="text-sm text-slate-400 mt-0.5">Bébé arrive, à toi de jouer</p>
            </div>
            <button
              onClick={onStartEnDirect}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-lg whitespace-nowrap"
            >
              Démarrer →
            </button>
          </div>
        </div>
```

- [ ] **Step 3: Run tests**

```bash
npm test -- --run
```

Expected: all tests PASS (no test covers Calendrier JSX directly)

- [ ] **Step 4: Commit**

```bash
git add src/pages/Calendrier.jsx
git commit -m "feat: add En direct activation block in Calendrier"
```

---

## Task 5 — App.jsx: wire EnDirect

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Replace App.jsx content**

```jsx
import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Prepare from './pages/Prepare'
import Bagages from './pages/Bagages'
import ModeJ from './pages/ModeJ'
import Info from './pages/Info'
import Calendrier from './pages/Calendrier'
import EnDirect from './pages/EnDirect'

const PAGES = {
  prepare: Prepare,
  bagages: Bagages,
  calendrier: Calendrier,
  'mode-j': ModeJ,
  info: Info,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('prepare')
  const [selectedTipId, setSelectedTipId] = useState(null)
  const [enDirectActive, setEnDirectActive] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedTipId(null)
  }

  if (enDirectActive) {
    return <EnDirect onBack={() => setEnDirectActive(false)} />
  }

  const ActivePage = PAGES[activeTab]

  return (
    <div className="min-h-screen bg-background">
      <main className="pb-20">
        <ActivePage
          selectedTipId={selectedTipId}
          onSelectTip={setSelectedTipId}
          onBack={() => setSelectedTipId(null)}
          onStartEnDirect={() => setEnDirectActive(true)}
        />
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
```

- [ ] **Step 2: Run full test suite**

```bash
npm test -- --run
```

Expected: all tests PASS

- [ ] **Step 3: Start dev server and verify manually**

```bash
npm run dev
```

Open http://localhost:5173. Check:

1. **Préparer** → scroll to bottom → fiche "Les phases du travail" apparaît avec icône Waves
2. Taper sur la fiche → détail s'ouvre avec 6 sections correctes
3. **Calendrier** → entrer une date de terme → bloc "C'est parti !" visible avec bouton "Démarrer →"
4. Taper "Démarrer →" → onboarding plein écran s'affiche
5. Taper "Compris, on y va" → vue En direct s'affiche, BottomNav absente
6. Taper une phase → elle s'expand avec signal + action (+ mots si désespérance)
7. Taper une phase passée → retour en arrière fonctionne
8. Taper "Réinitialiser les phases" → tout repart à zéro
9. Cocher des éléments dans "À cocher" → coches et barres apparaissent
10. Cartes réflexes visibles en bas
11. Taper ← → retour Calendrier, BottomNav réapparaît
12. Rouvrir "En direct" → pas d'onboarding (localStorage flag)

- [ ] **Step 4: Build prod**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx
git commit -m "feat: wire EnDirect view from Calendrier activation button"
```
