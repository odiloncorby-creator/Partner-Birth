# Design — Phases du travail & Vue "En direct"

**Date** : 2026-04-28
**Statut** : Validé

---

## Contexte

L'app Partner Birth accompagne le partenaire pendant l'accouchement. Actuellement, aucun contenu ne couvre les phases du travail ni les signaux permettant de les reconnaître. Ce design ajoute ce contenu sur deux niveaux : préparation en amont (fiche Préparer) et suivi en temps réel le jour J (vue "En direct").

---

## Livrable 1 — Fiche "Les phases du travail" dans Préparer

### Emplacement
Nouvelle entrée dans `src/data/tips.js`, ajoutée à la suite des 9 fiches existantes.

### Structure

```js
{
  id: 'phases-travail',
  icon: 'Waves',
  title: 'Les phases du travail',
  summary: 'Reconnaître chaque phase pour répondre au bon moment',
  sections: [...],
  gyneco_tip: '...',
}
```

### Sections (6)

**1. Travail préliminaire**
Elle peut encore parler, se pose des questions, cherche du réconfort. Les contractions sont irrégulières. Ce n'est pas encore le moment de partir — observer, accompagner, rester calme.

**2. Travail actif**
Les contractions deviennent intenses et régulières. Elle ferme les yeux ~30 secondes, impossible de parler pendant une contraction. Aucun doute quand la phrase est : "On part, on y va." Si elle ne pose plus de questions, si un bruit guttural apparaît, si elle a l'air "sauvage / instinctif" : c'est le moment.
→ Action : regarder la montre. Contractions toutes les 5 minutes → on part. *(Prendre sabots + trench s'il pleut.)*

**3. Phase de désespérance**
Elle peut prononcer des mots très forts (paroles morbides, sentiment d'abandon). Ce n'est pas un appel à l'aide ordinaire — c'est le signe que la naissance est imminente. Ne pas gérer, ne pas compatir : **rassurer dans la puissance**.
→ Phrases à dire : *"Tu es puissante"*, *"Tu es en train de le faire"*, *"Ça veut dire que c'est imminent"*.
→ Si cet appel à l'aide arrive plus tôt (phase préliminaire) : envisager la péridurale.

**4. Phase de quiétude**
Le corps marque une pause. Les contractions s'arrêtent. Elle peut s'endormir quelques minutes. C'est une parenthèse dans l'effort — ne pas paniquer.
→ Important : cette phase **n'arrive pas systématiquement**. Si elle n'apparaît pas, c'est normal. Si elle arrive, c'est normal aussi.

**5. Phase de poussée**
Dernière ligne droite avant l'arrivée du bébé. Durée maximale : environ une heure. Accompagner, encourager, laisser les soignants guider.

**6. Délivrance du placenta**
Dernière étape après la naissance du bébé. Le corps expulse le placenta — cela fait partie du processus et peut prendre quelques minutes. Rester présent, ne pas être surpris.

### Gyneco tip
*"L'accompagnant qui connaît les phases ne panique pas — il agit juste. La phase de désespérance surprend souvent les partenaires qui ne l'ont pas anticipée : savoir qu'elle signifie 'c'est imminent' change tout."*

---

## Livrable 2 — Bloc d'activation dans le Calendrier

### Emplacement
Dans `src/pages/Calendrier.jsx`, inséré **entre le bloc compte à rebours et la section "À faire maintenant"**. Visible en permanence dans la vue Calendrier active (pas uniquement à J-0).

### Apparence
- Fond sombre : même palette que Mode J (`#0f172a → #1e1b4b`)
- Titre : **"C'est parti !"**
- Sous-titre : *"Bébé arrive, à toi de jouer"*
- Bouton CTA plein : **"Démarrer →"**

### Comportement
Appuyer sur "Démarrer →" ouvre la vue "En direct" en plein écran (state React local dans App.jsx — pas de nouvel onglet dans la BottomNav).

---

## Livrable 3 — Vue "En direct"

### Accès
Depuis le bouton Calendrier. État géré dans `App.jsx` : `enDirectActive` (boolean). Quand `true`, la vue "En direct" remplace la page active en plein écran.

### Onboarding premier lancement
Au premier appui sur "Démarrer →", un écran d'intro s'affiche (plein écran, dismissible) :
- *"Tape la phase où elle en est"*
- *"Chaque carte te dit quoi observer et quoi faire"*
- *"Fais défiler pour accéder à la checklist et à l'aide rapide"*
- Bouton **"Compris, on y va"**

Flag de persistance : `localStorage` clé `pb-endirect-onboarded`. Jamais affiché une deuxième fois.

### Structure de la vue (scroll vertical, fond sombre)

**Header**
- Bouton retour ← (ferme "En direct", retour Calendrier)
- Titre : *"En direct"*
- Indicateur pulsant vert "Actif"

---

**Bloc 1 — Les phases**
Label section : `LES PHASES`

Timeline verticale des 6 phases dans l'ordre. Chaque phase = une carte tappable.

États visuels :
- **Passée** : grisée + icône coche ✓
- **En cours** : surlignée (bordure cyan, fond légèrement éclairé) + expanded
- **À venir** : opacité réduite

Contenu d'une carte en état "en cours" (expanded) :
1. **Comment tu le sais** — signal observable (ex : *"Elle ferme les yeux ~30s, ne peut plus parler"*)
2. **Ce que tu fais** — action concrète (ex : *"Regarde la montre — si 5 min → on part"*)
3. **Ce que tu dis** — phrases mot pour mot si pertinent (ex : *"Tu es puissante, tu es en train de le faire"*)

Interaction :
- Tap sur une phase → devient "en cours" (les précédentes passent en "passée", les suivantes en "à venir")
- Tap sur la phase déjà active → rien (évite désactivation accidentelle)
- Bouton **"Réinitialiser"** discret en bas de timeline pour repartir de zéro

Données : nouveau fichier `src/data/birthPhases.js`

---

**Bloc 2 — Checklist rapide**
Label section : `À COCHER`

Mini-checklist non-persistée (repart à zéro à chaque activation) :
- [ ] Sac dans la voiture
- [ ] GPS programmé vers la maternité
- [ ] Maternité appelée
- [ ] Formalités d'arrivée gérées (toi)
- [ ] Lumière et ambiance salle ajustées

---

**Bloc 3 — Aide rapide**
Label section : `AIDE RAPIDE`

Les cartes réflexes existantes (`REFLEX_CARDS`) réaffichées en format compact. L'utilisateur n'a pas besoin de quitter la vue pour y accéder.

---

## Données à créer

### `src/data/birthPhases.js`

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

---

## Fichiers à créer / modifier

| Fichier | Action |
|---|---|
| `src/data/birthPhases.js` | Créer |
| `src/data/tips.js` | Ajouter fiche `phases-travail` |
| `src/pages/EnDirect.jsx` | Créer |
| `src/pages/Calendrier.jsx` | Ajouter bloc activation |
| `src/App.jsx` | Gérer state `enDirectActive` + rendu conditionnel |

---

## Contraintes UI

- Fond sombre sur toute la vue "En direct" (même ambiance que Mode J)
- Pas de classe Tailwind `dark:` — dark mode géré via props/classes conditionnelles (cf. CLAUDE.md)
- Interactions tactiles larges (mains qui tremblent, stress)
- Pas de modal / overlay — navigation plein écran simple
