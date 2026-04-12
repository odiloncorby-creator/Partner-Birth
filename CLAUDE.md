# Partner Birth

PWA React installable sur iOS/Android — guide de l'accompagnant pour l'accouchement.

## Commandes

```bash
npm run dev      # Dev sur localhost:5173
npm test         # Tests Vitest (interactif)
npm test -- --run  # Tests en mode CI (non-interactif)
npm run build    # Build prod → dist/
npm run preview  # Prévisualiser le build sur localhost:4173
```

## Architecture

React 18 + Vite 5 + Tailwind CSS 3. Navigation par onglets sans routeur externe.

```
src/
├── App.jsx          # État navigation + rendu conditionnel des pages
├── data/            # Contenu statique embarqué (tips, checklists, reflexCards)
├── hooks/           # useLocalStorage — persistance état checklists
├── components/      # BottomNav, Accordion, TipCard, TipDetail, ChecklistSection, ReflexCard
└── pages/           # Prepare, Bagages, ModeJ, Info
```

## Patterns clés

- **Navigation** : pas de react-router. `activeTab` (useState) dans App.jsx détermine la page active.
- **Mode J** : fond sombre via `isDark = activeTab === 'mode-j'`. Ne pas utiliser les classes Tailwind `dark:` — le dark mode est géré via props et classes conditionnelles.
- **Checklists** : persistance via `useLocalStorage`, clés préfixées `pb-`.
- **Contenu** : tout dans `src/data/` — modifier là pour changer tips/checklists/cartes réflexes.

## Déploiement

Cloudflare Pages — repo GitHub `odiloncorby-creator/Partner-Birth`. Push sur `main` = déploiement auto.
Build : `npm run build` / Output : `dist/` / NODE_VERSION=20
