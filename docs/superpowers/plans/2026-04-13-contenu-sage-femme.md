# Upgrade contenu sage-femme — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Intégrer les notes de la sage-femme dans l'app : enrichir 4 tips existants, ajouter 2 nouveaux tips, 3 nouvelles cartes réflexes, corriger/enrichir les checklists, ajouter une checklist, et permettre l'ajout d'items custom dans les checklists.

**Architecture:** Modifications data-only pour le contenu (tips, reflexCards, checklists). Mise à jour des icon maps dans les composants. Nouvelle feature "items custom" dans les checklists via localStorage + UI d'ajout/suppression dans ChecklistSection.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Vitest, lucide-react

---

### Task 1: Enrichir les tips existants et ajouter les 2 nouveaux tips

**Files:**
- Modify: `src/data/tips.js`
- Modify: `src/data/tips.test.js`

- [ ] **Step 1: Update test to expect 9 tips**

```js
// src/data/tips.test.js — line 6
it('contient exactement 9 fiches', () => {
  expect(TIPS).toHaveLength(9)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL — "expected 9, received 7"

- [ ] **Step 3: Enrich tip `ton-role` — add admin handling to section "Le gardien du temple"**

In `src/data/tips.js`, tip `ton-role`, section "Le gardien du temple", replace `content`:

```js
content: 'Ton rôle principal n\'est pas de "gérer" l\'accouchement, mais de protéger l\'espace où elle donne naissance. Moins il y a d\'interruptions, de lumière vive, de voix inconnues — plus le corps de ta partenaire peut travailler. Tu es le filtre entre le monde extérieur et sa bulle. À la maternité, c\'est toi qui gères les formalités d\'inscription pendant qu\'elle reste dans sa bulle. Entre les contractions, appui sacrum et soutien physique.',
```

- [ ] **Step 4: Enrich tip `le-depart` — add transport options as new section**

In `src/data/tips.js`, tip `le-depart`, add a new section after "Pendant le trajet":

```js
{
  title: 'Le choix du transport',
  content: 'La voiture n\'est pas la seule option. Le taxi peut être préférable : pas de stress de conduite, tu es 100 % disponible pour elle. Prévoir plusieurs scénarios selon l\'heure (nuit, embouteillages, distance). L\'important c\'est le temps d\'arrivée — choisir le moyen le plus rapide et le plus calme selon la situation.',
},
```

- [ ] **Step 5: Enrich tip `pendant-le-travail` — monitoring ballon + ambiance détaillée**

In `src/data/tips.js`, tip `pendant-le-travail`:

Replace section "Le monitoring foetal" content:
```js
content: 'Les ceintures de monitoring n\'empêchent pas le mouvement. Elle peut marcher, se balancer, être à 4 pattes. Demander si un monitoring sans fil (télémétrie) est disponible. Si elle doit rester branchée, demander un ballon : s\'asseoir dessus pendant le monitoring évite la position allongée. Les capteurs peuvent être serrés tout en étant assise sur le ballon — ne pas hésiter à le demander, c\'est courant et réalisable.',
```

Replace section "L'ambiance dans la salle" content:
```js
content: 'Demander à la sage-femme de baisser les lumières ou placer une veilleuse dans la salle. Demander que le personnel parle doucement, chuchote et limite les allées et venues. Mettre une musique douce si elle a une playlist préparée. Limiter les écrans affichant les données du monitoring si elles l\'angoissent. Important : c\'est la préférence individuelle qui compte — certaines préfèrent la lumière, d\'autres l\'obscurité. L\'ocytocine est favorisée par un environnement adapté au confort de chacune.',
```

- [ ] **Step 6: Enrich tip `si-ca-change` — add home birth emergency section**

In `src/data/tips.js`, tip `si-ca-change`, add a new section after "Urgences : agir sans hésiter":

```js
{
  title: 'Accouchement à domicile — protocole d\'urgence',
  content: 'Si le bébé arrive avant la maternité : garder son calme. Laisser la femme pousser naturellement — ne pas intervenir. Chercher des serviettes ou du linge propre. Quand le bébé naît, le poser directement sur le ventre ou la poitrine de la maman. Ne jamais couper le cordon ombilical — attendre les secours. Sécuriser la zone : bloquer le bord du lit, poser une serviette au sol. Appeler les pompiers (18) ou le SAMU (15) dès que la poussée est identifiée — plus tôt on appelle, plus ils ont de chances d\'arriver à temps.',
},
```

Update `gyneco_tip`:
```js
gyneco_tip: 'Le projet de naissance est un outil de communication, pas un contrat. B.R.A.I.N. permet de participer à la décision sans bloquer les soins urgents. En cas d\'accouchement à domicile imprévu, l\'essentiel est de ne pas intervenir inutilement : le corps sait faire, votre rôle est de sécuriser et d\'appeler les secours.',
```

- [ ] **Step 7: Add new tip `arrivee-maternite` at position 5 (after `le-depart`)**

In `src/data/tips.js`, insert after the `le-depart` tip object:

```js
{
  id: 'arrivee-maternite',
  icon: 'Building2',
  title: 'Arrivée à la maternité',
  summary: 'Garder la bulle, gérer l\'admin, aménager la salle',
  sections: [
    {
      title: 'Garder sa bulle en salle d\'attente',
      content: 'Rester debout plutôt que s\'asseoir — éviter le regard des autres. Mettre ses écouteurs avec sa propre musique pour se concentrer. Se placer face à un mur pour limiter les stimuli visuels. Le partenaire s\'occupe de toutes les formalités d\'inscription et aide physiquement pendant les contractions.',
    },
    {
      title: 'Examens et contractions',
      content: 'La sage-femme examine entre deux contractions pour éviter l\'inconfort. Après l\'examen, se relever, se rhabiller et reprendre sa gestion respiratoire. Ne pas rester passive après un examen — reprendre le contrôle de sa respiration et de sa position.',
    },
    {
      title: 'Aménager la salle',
      content: 'Demander un ballon si monitoring requis — s\'asseoir dessus permet de poursuivre la gestion active du travail. Les capteurs peuvent être serrés tout en étant assise sur le ballon. Ajuster la lumière selon ses préférences : veilleuse, tamisée, ou lumière normale. Demander au personnel de parler doucement et de limiter les allées et venues. L\'ocytocine est favorisée par un environnement adapté au confort de chacune — exprimez clairement vos préférences.',
    },
  ],
  gyneco_tip: 'L\'arrivée à la maternité est un moment de transition. Plus vous prenez en main votre environnement dès l\'entrée, plus le travail se poursuit efficacement. Le personnel est là pour respecter vos préférences — n\'hésitez pas à les exprimer.',
},
```

- [ ] **Step 8: Add new tip `points-de-pression` at position 6 (after `arrivee-maternite`)**

In `src/data/tips.js`, insert after the `arrivee-maternite` tip object:

```js
{
  id: 'points-de-pression',
  icon: 'Target',
  title: 'Points de pression',
  summary: '3 points pour atténuer la douleur des contractions',
  sections: [
    {
      title: 'Le principe',
      content: 'Le cerveau ne peut analyser qu\'une douleur prédominante à la fois. En provoquant une douleur localisée par pression sur des points précis (nerfs), on déclenche une libération d\'endorphines qui atténue la douleur de la contraction. Technique utilisable seule ou en complément d\'autres méthodes (souffle, massage sacrum). Maintenir la pression environ 1 minute — la durée d\'une contraction.',
    },
    {
      title: 'Creux du V — main',
      content: 'Dans le creux formé entre l\'os du pouce et l\'os de l\'index, côté index. Appuyer avec les deux pouces, légèrement dirigé vers l\'index, jusqu\'à ressentir une douleur vive localisée. Astuce : tourner l\'ongle du pouce vers l\'avant pour être stable. Maintenir pendant toute la contraction.',
    },
    {
      title: 'Dessus du pied — entre 1er et 2e orteil',
      content: 'Imaginer une ligne entre le 1er et le 2e orteil, suivre la courbe vers le haut du pied. Au terme de la courbe se trouve un creux, un point sensible. Appuyer fermement pendant la contraction (~1 minute). La douleur au pied diminue la perception de la contraction.',
    },
    {
      title: 'Derrière la malléole — cheville',
      content: 'Poser le petit doigt au début de la malléole (bosse de la cheville), placer les 4 doigts. Le pouce se positionne sur l\'os puis légèrement derrière pour atteindre le nerf. On peut utiliser un stylo pour une pression plus stable. La sensibilité varie selon les personnes.',
    },
    {
      title: 'Conseils pratiques',
      content: 'Marquer les points avec un stylo pour les repérer rapidement (gauche et droite). S\'entraîner avec le partenaire avant le travail pour automatiser le geste. Les points peuvent provoquer un petit bleu — le bénéfice dépasse l\'inconfort. Appuyer dès le début de la contraction et maintenir jusqu\'à la fin.',
    },
  ],
  gyneco_tip: 'Les points de pression sont une technique complémentaire efficace. Entraînez-vous avant le jour J pour que le geste soit automatique quand les contractions arrivent.',
},
```

- [ ] **Step 9: Run tests to verify they pass**

Run: `npm test -- --run`
Expected: ALL PASS — 9 tips, all with required fields, unique ids

- [ ] **Step 10: Commit**

```bash
git add src/data/tips.js src/data/tips.test.js
git commit -m "feat: enrich 4 tips + add arrivée maternité & points de pression"
```

---

### Task 2: Ajouter les 3 nouvelles cartes réflexes

**Files:**
- Modify: `src/data/reflexCards.js`
- Modify: `src/data/reflexCards.test.js`

- [ ] **Step 1: Update test to expect 8 cards**

```js
// src/data/reflexCards.test.js — line 6
it('contient exactement 8 cartes', () => {
  expect(REFLEX_CARDS).toHaveLength(8)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL — "expected 8, received 5"

- [ ] **Step 3: Add 3 new reflex cards**

In `src/data/reflexCards.js`, insert cards in the order defined in the spec.

After `massage-sacrum` card, add:
```js
{
  id: 'points-pression',
  icon: 'Target',
  title: 'Points de pression',
  instruction: 'Appuyer fort sur un point pendant toute la contraction (~1 min).',
  detail: '3 points : creux du V pouce/index (appuyer vers l\'index) · dessus du pied entre 1er/2e orteil (suivre la courbe, creux sensible) · derrière la malléole (pouce derrière l\'os). Marquer au stylo avant le travail.',
},
```

After `points-pression`, add:
```js
{
  id: 'arrivee-maternite',
  icon: 'Building2',
  title: 'Arrivée maternité',
  instruction: 'Protège sa bulle — tu gères l\'admin.',
  detail: 'Écouteurs + musique · debout face au mur · toi = inscription et formalités · demander ballon si monitoring · ajuster lumière · personnel qui chuchote.',
},
```

After `brain` card, add:
```js
{
  id: 'urgence-domicile',
  icon: 'Home',
  title: 'Accouchement domicile',
  instruction: 'Laisser faire — ne pas couper le cordon — appeler les secours.',
  detail: 'Serviettes propres · bébé sur le ventre de maman · sécuriser le bord du lit · appeler pompiers (18) ou SAMU (15) dès la poussée. Ne rien couper, les secours s\'en occupent.',
},
```

Final order: souffle-miroir, massage-sacrum, points-pression, arrivee-maternite, mots-ancrage, brain, urgence-domicile, urgence

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test -- --run`
Expected: ALL PASS — 8 cards, all with required fields, unique ids

- [ ] **Step 5: Commit**

```bash
git add src/data/reflexCards.js src/data/reflexCards.test.js
git commit -m "feat: add 3 reflex cards — pressure points, arrival, home birth"
```

---

### Task 3: Corriger et enrichir les checklists

**Files:**
- Modify: `src/data/checklists.js`
- Modify: `src/data/checklists.test.js`

- [ ] **Step 1: Update test to expect 4 checklists**

```js
// src/data/checklists.test.js — line 6
it('contient exactement 4 listes', () => {
  expect(CHECKLISTS).toHaveLength(4)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run`
Expected: FAIL — "expected 4, received 3"

- [ ] **Step 3: Fix boules quies label + add items to sac salle de naissance**

In `src/data/checklists.js`, checklist `salle-naissance`:

Replace `{ id: 'boules-quies', label: 'Boules quies (pour toi)' }` with:
```js
{ id: 'boules-quies', label: 'Boules quies' },
```

Add after `lunettes-soleil` item:
```js
{ id: 'ecouteurs', label: 'Écouteurs + playlist chargée' },
{ id: 'stylo', label: 'Stylo (marquer les points de pression)' },
```

- [ ] **Step 4: Add new checklist "Organisation logistique"**

In `src/data/checklists.js`, add after the `valise-maman` checklist:

```js
{
  id: 'organisation',
  icon: 'ClipboardList',
  title: 'Organisation logistique',
  items: [
    { id: 'numero-sf', label: 'Numéro sage-femme / consultante accessible' },
    { id: 'projet-naissance', label: 'Projet de naissance rédigé' },
    { id: 'plan-transport', label: 'Plan transport (taxi + itinéraire voiture)' },
    { id: 'garde-aines', label: 'Plan garde aînés + personne référente' },
    { id: 'fiche-urgences', label: 'Fiche contacts urgences (maternité, SAMU, sage-femme)' },
  ],
},
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test -- --run`
Expected: ALL PASS — 4 checklists, all with required fields, unique item ids

- [ ] **Step 6: Commit**

```bash
git add src/data/checklists.js src/data/checklists.test.js
git commit -m "fix: boules quies label + add items sac naissance + checklist organisation"
```

---

### Task 4: Mettre à jour les icon maps dans les composants

**Files:**
- Modify: `src/components/TipCard.jsx`
- Modify: `src/components/TipDetail.jsx`
- Modify: `src/components/ReflexCard.jsx`
- Modify: `src/components/ChecklistSection.jsx`

- [ ] **Step 1: Update TipCard.jsx icon map**

Replace line 1:
```jsx
import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ChevronRight } from 'lucide-react'
```
with:
```jsx
import { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle, ChevronRight } from 'lucide-react'
```

Replace line 3:
```jsx
const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }
```
with:
```jsx
const ICON_MAP = { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle }
```

- [ ] **Step 2: Update TipDetail.jsx icon map**

Replace line 1:
```jsx
import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
```
with:
```jsx
import { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
```

Replace line 4:
```jsx
const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }
```
with:
```jsx
const ICON_MAP = { Shield, Package, Clock, Car, Building2, Target, Heart, Activity, AlertCircle }
```

- [ ] **Step 3: Update ReflexCard.jsx icon map**

Replace line 1:
```jsx
import { Wind, Hand, Brain, MessageCircle, AlertTriangle } from 'lucide-react'
```
with:
```jsx
import { Wind, Hand, Target, Building2, Brain, Home, MessageCircle, AlertTriangle } from 'lucide-react'
```

Replace line 3:
```jsx
const ICON_MAP = { Wind, Hand, Brain, MessageCircle, AlertTriangle }
```
with:
```jsx
const ICON_MAP = { Wind, Hand, Target, Building2, Brain, Home, MessageCircle, AlertTriangle }
```

- [ ] **Step 4: Update ChecklistSection.jsx icon map**

Replace line 2:
```jsx
import { Backpack, Baby, Luggage, RotateCcw } from 'lucide-react'
```
with:
```jsx
import { Backpack, Baby, Luggage, ClipboardList, RotateCcw } from 'lucide-react'
```

Replace line 4:
```jsx
const ICON_MAP = { Backpack, Baby, Luggage }
```
with:
```jsx
const ICON_MAP = { Backpack, Baby, Luggage, ClipboardList }
```

- [ ] **Step 5: Run tests + build to verify no import errors**

Run: `npm test -- --run && npm run build`
Expected: ALL PASS, build succeeds

- [ ] **Step 6: Commit**

```bash
git add src/components/TipCard.jsx src/components/TipDetail.jsx src/components/ReflexCard.jsx src/components/ChecklistSection.jsx
git commit -m "feat: update icon maps for new tips, reflex cards and checklists"
```

---

### Task 5: Mettre à jour les sous-titres des pages

**Files:**
- Modify: `src/pages/Prepare.jsx`
- Modify: `src/pages/Bagages.jsx`

- [ ] **Step 1: Update Prepare.jsx subtitle**

Replace line 16:
```jsx
<p className="text-sm text-foreground/55 mb-6">7 fiches pour l'accompagnant</p>
```
with:
```jsx
<p className="text-sm text-foreground/55 mb-6">9 fiches pour l'accompagnant</p>
```

- [ ] **Step 2: Update Bagages.jsx subtitle**

Replace line 34:
```jsx
<p className="text-sm text-foreground/55 mb-6">3 listes à cocher avant le départ</p>
```
with:
```jsx
<p className="text-sm text-foreground/55 mb-6">4 listes à cocher avant le départ</p>
```

- [ ] **Step 3: Run build to verify**

Run: `npm run build`
Expected: Build succeeds

- [ ] **Step 4: Commit**

```bash
git add src/pages/Prepare.jsx src/pages/Bagages.jsx
git commit -m "fix: update page subtitles to match new content counts"
```

---

### Task 6: Feature — Items custom dans les checklists

**Files:**
- Modify: `src/pages/Bagages.jsx`
- Modify: `src/components/ChecklistSection.jsx`

- [ ] **Step 1: Add custom items state in Bagages.jsx**

In `src/pages/Bagages.jsx`, add a second `useLocalStorage` for custom items and merge them into the list before passing to `ChecklistSection`. Also pass `onAddItem` and `onRemoveItem` callbacks.

Replace entire file:

```jsx
import { CHECKLISTS } from '../data/checklists'
import ChecklistSection from '../components/ChecklistSection'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Bagages() {
  const [checked, setChecked] = useLocalStorage('pb-checklists', {})
  const [customItems, setCustomItems] = useLocalStorage('pb-custom-items', {})

  const toggle = (listId, itemId) => {
    setChecked({
      ...checked,
      [`${listId}::${itemId}`]: !checked[`${listId}::${itemId}`],
    })
  }

  const reset = (listId) => {
    const next = { ...checked }
    const list = CHECKLISTS.find((l) => l.id === listId)
    const allItems = [...(list?.items ?? []), ...(customItems[listId] ?? [])]
    allItems.forEach((item) => {
      delete next[`${listId}::${item.id}`]
    })
    setChecked(next)
  }

  const getListChecked = (listId) => {
    const result = {}
    const list = CHECKLISTS.find((l) => l.id === listId)
    const allItems = [...(list?.items ?? []), ...(customItems[listId] ?? [])]
    allItems.forEach((item) => {
      result[item.id] = Boolean(checked[`${listId}::${item.id}`])
    })
    return result
  }

  const addItem = (listId, label) => {
    const id = `custom-${Date.now()}`
    const listCustom = customItems[listId] ?? []
    setCustomItems({
      ...customItems,
      [listId]: [...listCustom, { id, label }],
    })
  }

  const removeItem = (listId, itemId) => {
    const listCustom = customItems[listId] ?? []
    setCustomItems({
      ...customItems,
      [listId]: listCustom.filter((item) => item.id !== itemId),
    })
    // Also remove the checked state
    const next = { ...checked }
    delete next[`${listId}::${itemId}`]
    setChecked(next)
  }

  const getListWithCustomItems = (list) => ({
    ...list,
    items: [...list.items, ...(customItems[list.id] ?? [])],
  })

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Bagages</h1>
      <p className="text-sm text-foreground/55 mb-6">4 listes à cocher avant le départ</p>
      <div className="flex flex-col gap-4">
        {CHECKLISTS.map((list) => (
          <ChecklistSection
            key={list.id}
            list={getListWithCustomItems(list)}
            checked={getListChecked(list.id)}
            onToggle={toggle}
            onReset={reset}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            customItemIds={new Set((customItems[list.id] ?? []).map((i) => i.id))}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Add custom item UI in ChecklistSection.jsx**

In `src/components/ChecklistSection.jsx`, add an input row at the bottom of the items list for adding custom items, and an X button on custom items for removal.

Replace entire file:

```jsx
import { useState } from 'react'
import { Backpack, Baby, Luggage, ClipboardList, RotateCcw, Plus, X } from 'lucide-react'

const ICON_MAP = { Backpack, Baby, Luggage, ClipboardList }

export default function ChecklistSection({ list, checked, onToggle, onReset, onAddItem, onRemoveItem, customItemIds }) {
  const Icon = ICON_MAP[list.icon] ?? Backpack
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const total = list.items.length
  const done = list.items.filter((item) => Boolean(checked[item.id])).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  const handleAdd = () => {
    const trimmed = newLabel.trim()
    if (!trimmed) return
    onAddItem(list.id, trimmed)
    setNewLabel('')
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted">
              <Icon size={18} className="text-primary" />
            </div>
            <h2 className="font-semibold font-serif text-foreground">{list.title}</h2>
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-foreground/40 hover:text-foreground/60 hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={`Réinitialiser ${list.title}`}
          >
            <RotateCcw size={16} />
          </button>
        </div>
        {/* Barre de progression */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
          <span className="text-xs font-medium text-foreground/60 shrink-0 tabular-nums">
            {done} / {total}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {list.items.map((item) => {
          const isChecked = Boolean(checked[item.id])
          const isCustom = customItemIds?.has(item.id)
          return (
            <div key={item.id} className="flex items-center">
              <button
                onClick={() => onToggle(list.id, item.id)}
                className="flex items-center gap-3 flex-1 px-4 py-3 text-left min-h-[44px] transition-colors active:bg-muted/50 cursor-pointer focus-visible:outline-none focus-visible:bg-muted/30"
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-colors ${
                    isChecked ? 'bg-accent border-accent' : 'border-foreground/30'
                  }`}
                >
                  {isChecked && (
                    <svg viewBox="0 0 12 10" fill="none" className="w-3 h-3">
                      <path
                        d="M1 5l3.5 3.5L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    isChecked ? 'line-through text-foreground/40' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {isCustom && (
                <button
                  onClick={() => onRemoveItem(list.id, item.id)}
                  className="flex items-center justify-center w-10 h-10 mr-1 text-foreground/30 hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full"
                  aria-label={`Supprimer ${item.label}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Ajouter un item */}
      <div className="px-4 py-3 border-t border-border flex items-center gap-2">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Ajouter un élément…"
          className="flex-1 text-sm bg-transparent text-foreground placeholder:text-foreground/35 outline-none min-h-[44px]"
        />
        <button
          onClick={handleAdd}
          disabled={!newLabel.trim()}
          className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Ajouter"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Confirmation inline reset */}
      {confirmOpen && (
        <div className="px-4 py-3 bg-red-50 border-t border-red-100 flex items-center justify-between gap-3">
          <span className="text-sm text-red-700 leading-snug">Réinitialiser "{list.title}" ?</span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-1.5 text-sm font-medium text-foreground/60 rounded-lg hover:bg-red-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Annuler
            </button>
            <button
              onClick={() => { onReset(list.id); setConfirmOpen(false) }}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Run tests + build to verify**

Run: `npm test -- --run && npm run build`
Expected: ALL PASS, build succeeds

- [ ] **Step 4: Start dev server and test in browser**

Run: `npm run dev`

Verify:
1. Navigate to Bagages tab
2. See 4 checklists
3. "Boules quies" label is correct (no "pour toi")
4. New items "Écouteurs + playlist chargée" and "Stylo" appear in sac salle de naissance
5. "Organisation logistique" checklist appears with 5 items
6. Type a custom item name in the input field → click + or press Enter → item appears
7. Check/uncheck custom items → progress bar updates
8. Click X on a custom item → item removed
9. Reload page → custom items persist
10. Reset a list → all items (including custom) unchecked

- [ ] **Step 5: Commit**

```bash
git add src/pages/Bagages.jsx src/components/ChecklistSection.jsx
git commit -m "feat: custom checklist items — add/remove/persist via localStorage"
```

---

### Task 7: Vérification finale

**Files:** none (verification only)

- [ ] **Step 1: Run full test suite**

Run: `npm test -- --run`
Expected: ALL PASS

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: Build succeeds with no warnings

- [ ] **Step 3: Verify all pages in dev server**

Run: `npm run dev`

Verify Préparer tab:
1. "9 fiches pour l'accompagnant" subtitle
2. 9 tip cards visible in list
3. Tap "Arrivée à la maternité" → 3 sections + gyneco tip
4. Tap "Points de pression" → 5 sections + gyneco tip
5. Verify enriched tips: "Ton rôle" mentions inscription, "Le départ" has transport section, "Pendant le travail" mentions ballon monitoring + veilleuse, "Si ça change" has home birth section

Verify Mode J tab:
1. 8 reflex cards visible
2. "Points de pression" card present with 3 points summary
3. "Arrivée maternité" card present
4. "Accouchement domicile" card present with protocol

Verify Bagages tab:
1. 4 checklists visible
2. Custom item add/remove working on all 4 lists

- [ ] **Step 4: Commit any remaining fixes if needed**
