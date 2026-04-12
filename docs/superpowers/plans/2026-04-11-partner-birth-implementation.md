# Partner Birth PWA — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire une PWA React installable sur iOS/Android pour les accompagnants d'accouchement — 7 fiches tips, 3 checklists bagages, 5 cartes réflexes Mode J.

**Architecture:** Application React mono-page avec navigation par onglets gérée par `useState`, sans routeur externe. Contenu embarqué dans des fichiers JS. Persistance des checklists via hook `useLocalStorage`. Mode J : fond sombre via classe CSS sur le container racine.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3, Lucide React, vite-plugin-pwa, Vitest + @testing-library/react, Cloudflare Pages

---

## Structure des fichiers

```
/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── public/
│   └── icons/                    # SVG source + PNG générés (Task 10)
└── src/
    ├── main.jsx
    ├── App.jsx                   # navigation state + root layout
    ├── index.css                 # Tailwind directives + fonts Google
    ├── test/
    │   └── setup.js              # jest-dom matchers
    ├── data/
    │   ├── tips.js               # 7 fiches tips avec contenu complet
    │   ├── tips.test.js
    │   ├── checklists.js         # 3 listes avec items
    │   ├── checklists.test.js
    │   ├── reflexCards.js        # 5 cartes Mode J
    │   └── reflexCards.test.js
    ├── hooks/
    │   ├── useLocalStorage.js
    │   └── useLocalStorage.test.js
    ├── components/
    │   ├── BottomNav.jsx
    │   ├── Accordion.jsx
    │   ├── TipCard.jsx
    │   ├── TipDetail.jsx
    │   ├── ChecklistSection.jsx
    │   └── ReflexCard.jsx
    └── pages/
        ├── Prepare.jsx
        ├── Bagages.jsx
        ├── ModeJ.jsx
        └── Info.jsx
```

---

## Task 1 : Scaffolding projet

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `postcss.config.js`
- Create: `.gitignore`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/index.css`
- Create: `src/test/setup.js`

- [ ] **Créer `package.json`**

```json
{
  "name": "partner-birth",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "lucide-react": "^0.460.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@vitejs/plugin-react": "^4.3.4",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.16",
    "vite": "^5.4.10",
    "vite-plugin-pwa": "^0.21.1",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Créer `index.html`**

```html
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="theme-color" content="#0369A1" />
    <meta name="description" content="Guide de l'accompagnant pour l'accouchement" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Partner Birth" />
    <title>Partner Birth</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Créer `vite.config.js`** (sans PWA pour l'instant, ajouté Task 10)

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
```

- [ ] **Créer `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Créer `.gitignore`**

```
node_modules
dist
.env
.DS_Store
*.local
```

- [ ] **Créer `src/main.jsx`**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Créer `src/App.jsx`** (squelette, sera remplacé Task 5)

```jsx
export default function App() {
  return <div className="p-4 font-sans">Partner Birth</div>
}
```

- [ ] **Créer `src/index.css`** (vide pour l'instant, remplacé Task 2)

```css
/* complété Task 2 */
```

- [ ] **Créer `src/test/setup.js`**

```js
import '@testing-library/jest-dom'
```

- [ ] **Installer les dépendances**

```bash
cd "/Users/odiloncorby/Documents/ODILON/odilon.code/Partner Birth" && npm install
```

Expected: `node_modules/` créé, aucune erreur npm.

- [ ] **Vérifier que le projet démarre**

```bash
npm run dev
```

Expected: `Local: http://localhost:5173/` — affiche "Partner Birth" dans le navigateur.

- [ ] **Initialiser git et commit**

```bash
cd "/Users/odiloncorby/Documents/ODILON/odilon.code/Partner Birth" && git init && git add package.json index.html vite.config.js postcss.config.js .gitignore src/ && git commit -m "feat: scaffold projet React + Vite"
```

---

## Task 2 : Tailwind CSS + design tokens + typographie

**Files:**
- Create: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Créer `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F0F9FF',
        primary: '#0369A1',
        secondary: '#38BDF8',
        accent: '#16A34A',
        foreground: '#0C4A6E',
        muted: '#E7EFF5',
        border: '#E0F2FE',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Mettre à jour `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Raleway:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground font-sans antialiased;
    -webkit-tap-highlight-color: transparent;
  }
}

@layer utilities {
  .pb-safe {
    padding-bottom: max(env(safe-area-inset-bottom), 0px);
  }
  .pt-safe {
    padding-top: max(env(safe-area-inset-top), 0px);
  }
}
```

- [ ] **Vérifier le fond dans le navigateur**

```bash
npm run dev
```

Expected: fond bleu très clair `#F0F9FF` visible, texte "Partner Birth" en Raleway.

- [ ] **Commit**

```bash
git add tailwind.config.js src/index.css && git commit -m "feat: Tailwind design tokens + typographie Lora/Raleway"
```

---

## Task 3 : Données de l'application + tests d'intégrité

**Files:**
- Create: `src/data/tips.js`
- Create: `src/data/tips.test.js`
- Create: `src/data/checklists.js`
- Create: `src/data/checklists.test.js`
- Create: `src/data/reflexCards.js`
- Create: `src/data/reflexCards.test.js`

- [ ] **Créer `src/data/tips.js`**

```js
export const TIPS = [
  {
    id: 'ton-role',
    icon: 'Shield',
    title: 'Ton rôle',
    summary: 'Gardien de la bulle, protecteur de l\'ocytocine',
    sections: [
      {
        title: 'Le gardien du temple',
        content: 'Ton rôle principal n\'est pas de "gérer" l\'accouchement, mais de protéger l\'espace où elle donne naissance. Moins il y a d\'interruptions, de lumière vive, de voix inconnues — plus le corps de ta partenaire peut travailler. Tu es le filtre entre le monde extérieur et sa bulle.',
      },
      {
        title: 'L\'ocytocine : l\'hormone qui fait tout',
        content: 'L\'ocytocine déclenche et entretient les contractions. Elle est inhibée par la peur, le froid, le stress et la lumière forte. Maintenir un environnement calme, chaud et sécurisant n\'est pas un luxe — c\'est de la biochimie au service du travail.',
      },
      {
        title: 'Ta présence, ton calme',
        content: 'Parle doucement ou ne parle pas. Évite les questions pendant une contraction. Si les soignants arrivent pendant une contraction, réponds à leur place et demande-leur de patienter. Ton état émotionnel est contagieux : si tu es ancré, elle le ressent.',
      },
    ],
    gyneco_tip: 'Le partenaire qui reste calme et présent physiquement est plus utile que celui qui essaie de tout gérer. Être là, silencieux et ancré, suffit souvent.',
  },
  {
    id: 'preparation',
    icon: 'Package',
    title: 'Préparation',
    summary: 'Dossier, voiture, sacs — tout prêt 3 semaines avant',
    sections: [
      {
        title: 'Le dossier de maternité',
        content: 'Vérifier qu\'il est complet : carte vitale, carte de mutuelle, pièce d\'identité, carnet de grossesse, groupe sanguin, résultats des examens récents. Le mettre dans le sac dès la 36e semaine. Ne pas chercher ces documents sous stress au dernier moment.',
      },
      {
        title: 'La voiture',
        content: 'Siège bébé homologué installé et correctement fixé bien avant le terme. GPS programmé avec l\'itinéraire vers la maternité. Plein d\'essence fait. Tester le trajet une fois à des heures différentes pour repérer les embouteillages potentiels.',
      },
      {
        title: 'Les sacs',
        content: 'Sacs prêts et dans le coffre dès la 37e semaine. Sac salle de naissance distinct de la valise bébé et de la valise post-partum. Vérifier la liste une fois ensemble — et ne plus y toucher ensuite.',
      },
    ],
    gyneco_tip: 'Les pères qui ont tout géré à l\'avance sont bien plus disponibles émotionnellement le Jour J. La logistique faite en amont libère l\'espace pour le soutien.',
  },
  {
    id: 'quand-partir',
    icon: 'Clock',
    title: 'Quand partir',
    summary: 'Règle 5-1-1, poche des eaux, signaux d\'alerte',
    sections: [
      {
        title: 'La règle 5-1-1',
        content: 'Partir à la maternité quand les contractions arrivent toutes les 5 minutes, durent 1 minute chacune, et ce depuis au moins 1 heure. Utiliser une application de minutage (Contraction Timer). Appeler la maternité avant de partir pour les prévenir.',
      },
      {
        title: 'Rupture de la poche des eaux',
        content: 'Si la poche des eaux se rompt, partir à la maternité même sans contractions régulières. Noter l\'heure et la couleur du liquide : clair = normal, verdâtre ou jaune = signaler immédiatement. Le cordon peut se comprimer — ne pas attendre.',
      },
      {
        title: 'Signaux d\'alerte — partir immédiatement',
        content: 'Ne pas attendre la règle 5-1-1 si : douleur abdominale intense et continue sans relâchement, saignements importants (plus que des pertes rosées), mouvements du bébé très diminués ou absents depuis plusieurs heures. En cas de doute, appeler la maternité.',
      },
    ],
    gyneco_tip: 'Mieux vaut aller à la maternité "trop tôt" et rentrer chez soi, que rester trop longtemps à la maison par peur de déranger. Appelez toujours avant de venir.',
  },
  {
    id: 'le-depart',
    icon: 'Car',
    title: 'Le départ',
    summary: 'Calme, installation en voiture, gestion du trajet',
    sections: [
      {
        title: 'Rester calme pour elle',
        content: 'Ton niveau d\'adrénaline se transfère. Pas de conduite agressive, pas de panique visible. Si tu peux, dis-lui à voix haute ce que tu fais : "Je mets les sacs dans la voiture, j\'arrive." Ça l\'ancre dans le réel et réduit son anxiété.',
      },
      {
        title: 'L\'installation dans la voiture',
        content: 'La position semi-allongée sur le côté (siège rabattu) est plus confortable que assise droite. Prévoir une couverture. Si une contraction arrive pendant l\'installation, attendre qu\'elle passe avant de fermer la portière.',
      },
      {
        title: 'Pendant le trajet',
        content: 'Signaler les dos-d\'âne à l\'avance pour qu\'elle se prépare. Éviter la musique forte. Si le travail s\'intensifie en route, appeler la maternité depuis la voiture. Si une contraction arrive à un feu, se garer plutôt que de forcer le départ.',
      },
    ],
    gyneco_tip: 'Le trajet en voiture est souvent plus difficile émotionnellement que physiquement. Elle quitte son espace sécurisant. Voix calme, conduite douce, présence.',
  },
  {
    id: 'pendant-le-travail',
    icon: 'Heart',
    title: 'Pendant le travail',
    summary: 'Souffle miroir, positions, ambiance, monitoring',
    sections: [
      {
        title: 'Le souffle miroir',
        content: 'Place-toi face à elle, à hauteur des yeux. Inspire... puis expire de façon ample, lente et sonore — presque audible. Elle calera inconsciemment son rythme sur le tien. Quand elle perd le rythme sur une contraction difficile, tu deviens son métronome. C\'est la technique la plus efficace de ta boîte à outils.',
      },
      {
        title: 'La communication basse fréquence',
        content: 'Voix grave, phrases courtes, affirmatives. "Tu respires bien." "C\'est ça." "On y est." Évite les questions — "Ça va ?" ou "Tu as mal ?" la force à quitter son état intérieur pour te répondre. Préfère constater : "Je suis là."',
      },
      {
        title: 'Les positions',
        content: 'La verticalité favorise la descente du bébé (gravité + pression sur le col). À 4 pattes soulage le bas du dos et ouvre le bassin. Le balancement latéral aide entre les contractions. Encourager les changements de position toutes les 20-30 minutes si possible.',
      },
      {
        title: 'L\'ambiance dans la salle',
        content: 'Demander à la sage-femme de baisser les lumières. Mettre une musique douce si elle a une playlist préparée. Limiter les allées et venues. Couvrir ou éteindre les écrans affichant les données du monitoring si elles l\'angoissent.',
      },
      {
        title: 'Le monitoring fœtal',
        content: 'Les ceintures de monitoring n\'empêchent pas le mouvement. Elle peut marcher, se balancer, être à 4 pattes. Demander si un monitoring sans fil (télémétrie) est disponible dans la maternité — plus de liberté de mouvement.',
      },
    ],
    gyneco_tip: 'Un partenaire qui maintient le calme, le soutien actif et la mobilité peut réduire significativement la durée du travail actif. Votre rôle a un impact physiologique réel.',
  },
  {
    id: 'la-peridurale',
    icon: 'Activity',
    title: 'La péridurale',
    summary: 'Pose, garder la mobilité après, peanut ball',
    sections: [
      {
        title: 'Pendant la pose',
        content: 'Elle doit s\'immobiliser complètement pendant quelques minutes — assise courbée ou sur le côté en position fœtale. Ton rôle : la tenir physiquement (mains sur ses épaules ou ses mains), lui parler doucement, maintenir le contact visuel. Si une contraction arrive pendant la pose, l\'encourager à souffler sans bouger.',
      },
      {
        title: 'Après la péridurale : éviter la passivité',
        content: 'La péridurale soulage la douleur mais le bébé descend toujours. Le risque est de rester allongée sans bouger pendant des heures. Rappeler aux sages-femmes de changer de position régulièrement (côté gauche / côté droit / semi-assise). Elle sent moins mais peut encore participer.',
      },
      {
        title: 'Le peanut ball',
        content: 'C\'est un ballon de yoga en forme d\'arachide. Placé entre les genoux en position latérale, il maintient le bassin ouvert et aide la progression même sans mobilité. Demander aux sages-femmes s\'elles en ont un — certaines maternités en sont équipées, d\'autres non.',
      },
    ],
    gyneco_tip: 'La péridurale n\'est pas un échec. C\'est un outil médical qui, bien utilisé, permet de récupérer de l\'énergie pour les efforts expulsifs. Le travail continue même sans douleur.',
  },
  {
    id: 'si-ca-change',
    icon: 'AlertCircle',
    title: 'Si ça change',
    summary: 'Méthode B.R.A.I.N., deuil du projet, urgences',
    sections: [
      {
        title: 'La méthode B.R.A.I.N.',
        content: 'Pour toute proposition médicale non planifiée (déclenchement, césarienne, forceps...) utiliser B.R.A.I.N. : Bénéfices (pourquoi le faire), Risques (risques réels de l\'acte), Alternatives (autres options possibles), Instinct (qu\'est-ce qu\'elle ressent), Nothing/Now (que se passe-t-il si on attend ?). Prendre 2 minutes pour poser ces questions calmement avant de décider.',
      },
      {
        title: 'Le deuil du projet de naissance',
        content: 'Si ça ne se passe pas comme prévu, valider ses émotions plutôt que de minimiser. "C\'est normal de ressentir ça" vaut mieux que "au moins le bébé va bien." Les deux peuvent être vrais en même temps. Ne pas la forcer à être positive. Être présent dans la déception aussi.',
      },
      {
        title: 'Urgences : agir sans hésiter',
        content: 'Appuyer sur la sonnette IMMÉDIATEMENT et sans attendre si : cordon visible à la vulve (cordon prolabé), saignements soudains et abondants, bébé qui ne bouge plus, détresse ou perte de conscience. Ne pas chercher à comprendre — alerter le personnel et rester avec elle.',
      },
    ],
    gyneco_tip: 'Le projet de naissance est un outil de communication, pas un contrat. B.R.A.I.N. permet de participer à la décision sans bloquer les soins urgents. Faites confiance à l\'équipe.',
  },
]
```

- [ ] **Créer `src/data/tips.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { TIPS } from './tips'

describe('TIPS data integrity', () => {
  it('contient exactement 7 fiches', () => {
    expect(TIPS).toHaveLength(7)
  })

  it('chaque fiche a tous les champs obligatoires', () => {
    TIPS.forEach((tip) => {
      expect(tip.id, `tip sans id`).toBeTruthy()
      expect(tip.icon, `${tip.id} sans icon`).toBeTruthy()
      expect(tip.title, `${tip.id} sans title`).toBeTruthy()
      expect(tip.summary, `${tip.id} sans summary`).toBeTruthy()
      expect(Array.isArray(tip.sections), `${tip.id} sections n'est pas un array`).toBe(true)
      expect(tip.gyneco_tip, `${tip.id} sans gyneco_tip`).toBeTruthy()
    })
  })

  it('chaque fiche a au moins une section avec titre et contenu', () => {
    TIPS.forEach((tip) => {
      expect(tip.sections.length, `${tip.id} a 0 sections`).toBeGreaterThan(0)
      tip.sections.forEach((section, i) => {
        expect(section.title, `section ${i} sans title dans ${tip.id}`).toBeTruthy()
        expect(section.content, `section ${i} sans content dans ${tip.id}`).toBeTruthy()
      })
    })
  })

  it('les ids sont uniques', () => {
    const ids = TIPS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Créer `src/data/checklists.js`**

```js
export const CHECKLISTS = [
  {
    id: 'salle-naissance',
    icon: 'Backpack',
    title: 'Sac salle de naissance',
    items: [
      { id: 'eau', label: 'Eau (grande bouteille)' },
      { id: 'snacks', label: 'Snacks (barres, fruits secs, chocolat)' },
      { id: 'brumisateur', label: 'Brumisateur' },
      { id: 'bouillotte', label: 'Bouillotte' },
      { id: 'chargeur-tel', label: 'Chargeur téléphone' },
      { id: 'powerbank', label: 'Powerbank' },
      { id: 'bodys', label: 'Bodys bébé (3, taille naissance)' },
      { id: 'pyjama', label: 'Pyjama bébé' },
      { id: 'bonnet', label: 'Bonnet bébé' },
      { id: 'turbulette', label: 'Turbulette / gigoteuse' },
      { id: 'boules-quies', label: 'Boules quies (pour toi)' },
      { id: 'lunettes-soleil', label: 'Lunettes de soleil' },
    ],
  },
  {
    id: 'valise-bebe',
    icon: 'Baby',
    title: 'Valise bébé',
    items: [
      { id: 'serviette', label: 'Serviette bébé' },
      { id: 'bodys-5', label: '5 bodys (taille naissance + 1 mois)' },
      { id: 'pyjamas-4', label: '4 pyjamas' },
      { id: 'lange', label: 'Lange / drap de bain' },
      { id: 'turbulette-v', label: 'Turbulette' },
      { id: 'thermometre', label: 'Thermomètre rectal' },
      { id: 'thermometre-bain', label: 'Thermomètre de bain' },
      { id: 'liniment', label: 'Liniment oléo-calcaire' },
      { id: 'echarpe', label: 'Écharpe de portage' },
    ],
  },
  {
    id: 'valise-maman',
    icon: 'Luggage',
    title: 'Valise post-partum (maman)',
    items: [
      { id: 'culottes-pp', label: 'Culottes post-partum (5)' },
      { id: 'serviettes-pp', label: 'Serviettes hygiéniques post-partum' },
      { id: 'serviette-bain', label: 'Serviette de bain' },
      { id: 'tapis-bain', label: 'Tapis de bain' },
      { id: 'tenues', label: 'Tenues confortables (2)' },
      { id: 'brassiere', label: 'Brassière d\'allaitement' },
      { id: 'pyjama-pp', label: 'Pyjama (ouverture devant pour allaitement)' },
      { id: 'veilleuse', label: 'Veilleuse' },
      { id: 'trousse', label: 'Trousse de toilette' },
      { id: 'coussin-allait', label: 'Coussin d\'allaitement' },
    ],
  },
]
```

- [ ] **Créer `src/data/checklists.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { CHECKLISTS } from './checklists'

describe('CHECKLISTS data integrity', () => {
  it('contient exactement 3 listes', () => {
    expect(CHECKLISTS).toHaveLength(3)
  })

  it('chaque liste a les champs obligatoires', () => {
    CHECKLISTS.forEach((list) => {
      expect(list.id).toBeTruthy()
      expect(list.icon).toBeTruthy()
      expect(list.title).toBeTruthy()
      expect(Array.isArray(list.items)).toBe(true)
      expect(list.items.length).toBeGreaterThan(0)
    })
  })

  it('chaque item a un id et un label non vides', () => {
    CHECKLISTS.forEach((list) => {
      list.items.forEach((item) => {
        expect(item.id, `item sans id dans ${list.id}`).toBeTruthy()
        expect(item.label, `item sans label dans ${list.id}`).toBeTruthy()
      })
    })
  })

  it('les ids d\'items sont uniques par liste', () => {
    CHECKLISTS.forEach((list) => {
      const ids = list.items.map((i) => i.id)
      expect(new Set(ids).size, `ids dupliqués dans ${list.id}`).toBe(ids.length)
    })
  })
})
```

- [ ] **Créer `src/data/reflexCards.js`**

```js
export const REFLEX_CARDS = [
  {
    id: 'souffle-miroir',
    icon: 'Wind',
    title: 'Souffle miroir',
    instruction: 'Place-toi face à elle, à hauteur des yeux.',
    detail: 'Inspire... puis expire de façon ample, lente et sonore. Elle calera inconsciemment son rythme sur le tien. Quand elle décroche sur une contraction, tu deviens son métronome.',
  },
  {
    id: 'massage-sacrum',
    icon: 'Hand',
    title: 'Massage sacrum',
    instruction: 'Pression ferme et constante avec les deux pouces.',
    detail: 'Bas du dos, sur le sacrum (le triangle osseux entre les fesses). Appuyer pendant toute la contraction, relâcher entre. Demande-lui si c\'est au bon endroit — ajuste.',
  },
  {
    id: 'brain',
    icon: 'Brain',
    title: 'Méthode B.R.A.I.N.',
    instruction: 'Pour toute décision médicale non prévue.',
    detail: 'Bénéfices · Risques · Alternatives · Instinct · Nothing/Now — Demander ces 5 points calmement avant de décider. Vous avez le droit de prendre 2 minutes.',
  },
  {
    id: 'mots-ancrage',
    icon: 'MessageCircle',
    title: 'Mots d\'ancrage',
    instruction: 'Voix grave, phrases courtes, affirmatives.',
    detail: '"Expire." · "Relâche." · "C\'est bien." · "On y est." — Évite "Ça va ?" (elle devrait répondre). Préfère constater : "Je suis là."',
  },
  {
    id: 'urgence',
    icon: 'AlertTriangle',
    title: 'Si urgence',
    instruction: 'Sonnette IMMÉDIATEMENT — sans attendre.',
    detail: 'Cordon visible · Saignements abondants · Bébé ne bouge plus · Perte de conscience. Reste avec elle, contact physique permanent. Décris calmement ce qui se passe.',
  },
]
```

- [ ] **Créer `src/data/reflexCards.test.js`**

```js
import { describe, it, expect } from 'vitest'
import { REFLEX_CARDS } from './reflexCards'

describe('REFLEX_CARDS data integrity', () => {
  it('contient exactement 5 cartes', () => {
    expect(REFLEX_CARDS).toHaveLength(5)
  })

  it('chaque carte a les champs obligatoires', () => {
    REFLEX_CARDS.forEach((card) => {
      expect(card.id).toBeTruthy()
      expect(card.icon).toBeTruthy()
      expect(card.title).toBeTruthy()
      expect(card.instruction).toBeTruthy()
      expect(card.detail).toBeTruthy()
    })
  })

  it('les ids sont uniques', () => {
    const ids = REFLEX_CARDS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
```

- [ ] **Lancer les tests**

```bash
npm test
```

Expected: 3 suites de tests passent (tips, checklists, reflexCards), 0 failure.

- [ ] **Commit**

```bash
git add src/data/ src/test/ && git commit -m "feat: données app — 7 tips, 3 checklists, 5 cartes Mode J"
```

---

## Task 4 : Hook useLocalStorage + tests

**Files:**
- Create: `src/hooks/useLocalStorage.test.js`
- Create: `src/hooks/useLocalStorage.js`

- [ ] **Écrire les tests en premier**

Créer `src/hooks/useLocalStorage.test.js` :

```js
import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear())

  it('retourne la valeur initiale quand rien n\'est stocké', () => {
    const { result } = renderHook(() => useLocalStorage('pb-test', { a: false }))
    expect(result.current[0]).toEqual({ a: false })
  })

  it('persiste la valeur dans localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('pb-test', {}))
    act(() => result.current[1]({ x: true }))
    expect(JSON.parse(localStorage.getItem('pb-test'))).toEqual({ x: true })
  })

  it('lit une valeur existante depuis localStorage', () => {
    localStorage.setItem('pb-test', JSON.stringify({ b: true }))
    const { result } = renderHook(() => useLocalStorage('pb-test', {}))
    expect(result.current[0]).toEqual({ b: true })
  })

  it('deux hooks avec des clés différentes sont indépendants', () => {
    const { result: r1 } = renderHook(() => useLocalStorage('pb-key1', 0))
    const { result: r2 } = renderHook(() => useLocalStorage('pb-key2', 0))
    act(() => r1.current[1](42))
    expect(r1.current[0]).toBe(42)
    expect(r2.current[0]).toBe(0)
  })
})
```

- [ ] **Lancer le test pour vérifier qu'il échoue**

```bash
npm test -- src/hooks/useLocalStorage.test.js
```

Expected: FAIL — `Cannot find module './useLocalStorage'`

- [ ] **Implémenter `src/hooks/useLocalStorage.js`**

```js
import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      setStoredValue(value)
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // localStorage indisponible (mode privé strict) : état conservé en mémoire
    }
  }

  return [storedValue, setValue]
}
```

- [ ] **Lancer tous les tests**

```bash
npm test
```

Expected: 4 suites passent, 0 failure.

- [ ] **Commit**

```bash
git add src/hooks/ && git commit -m "feat: hook useLocalStorage avec persistance"
```

---

## Task 5 : App shell + BottomNav

**Files:**
- Create: `src/components/BottomNav.jsx`
- Create: `src/pages/Prepare.jsx` (stub)
- Create: `src/pages/Bagages.jsx` (stub)
- Create: `src/pages/ModeJ.jsx` (stub)
- Create: `src/pages/Info.jsx` (stub)
- Modify: `src/App.jsx`

- [ ] **Créer `src/components/BottomNav.jsx`**

```jsx
import { BookOpen, Luggage, Moon, Info } from 'lucide-react'

const TABS = [
  { id: 'prepare', label: 'Préparer', Icon: BookOpen },
  { id: 'bagages', label: 'Bagages', Icon: Luggage },
  { id: 'mode-j', label: 'Mode J', Icon: Moon },
  { id: 'info', label: 'Info', Icon: Info },
]

export default function BottomNav({ activeTab, onTabChange, isDark }) {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex border-t pb-safe ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-border'
      }`}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-[60px] transition-colors ${
              isActive
                ? isDark ? 'text-blue-400' : 'text-primary'
                : isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
```

- [ ] **Créer les pages stubs**

`src/pages/Prepare.jsx` :
```jsx
export default function Prepare() {
  return <div className="p-4">Préparer (à venir)</div>
}
```

`src/pages/Bagages.jsx` :
```jsx
export default function Bagages() {
  return <div className="p-4">Bagages (à venir)</div>
}
```

`src/pages/ModeJ.jsx` :
```jsx
export default function ModeJ() {
  return <div className="p-4 text-white bg-gray-900 min-h-screen">Mode J (à venir)</div>
}
```

`src/pages/Info.jsx` :
```jsx
export default function Info() {
  return <div className="p-4">Info (à venir)</div>
}
```

- [ ] **Remplacer `src/App.jsx`**

```jsx
import { useState } from 'react'
import BottomNav from './components/BottomNav'
import Prepare from './pages/Prepare'
import Bagages from './pages/Bagages'
import ModeJ from './pages/ModeJ'
import Info from './pages/Info'

const PAGES = {
  prepare: Prepare,
  bagages: Bagages,
  'mode-j': ModeJ,
  info: Info,
}

export default function App() {
  const [activeTab, setActiveTab] = useState('prepare')
  const [selectedTipId, setSelectedTipId] = useState(null)

  const isDark = activeTab === 'mode-j'

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedTipId(null)
  }

  const ActivePage = PAGES[activeTab]

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-background'}`}>
      <main className="pb-20">
        <ActivePage
          selectedTipId={selectedTipId}
          onSelectTip={setSelectedTipId}
          onBack={() => setSelectedTipId(null)}
          isDark={isDark}
        />
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} isDark={isDark} />
    </div>
  )
}
```

- [ ] **Vérifier dans le navigateur**

```bash
npm run dev
```

Expected: 4 onglets en bas, navigation fonctionnelle entre onglets. Mode J → fond gris foncé + nav sombre.

- [ ] **Commit**

```bash
git add src/App.jsx src/components/BottomNav.jsx src/pages/ && git commit -m "feat: app shell + navigation 4 onglets bottom nav"
```

---

## Task 6 : Section Préparer — fiches tips

**Files:**
- Create: `src/components/Accordion.jsx`
- Create: `src/components/TipCard.jsx`
- Create: `src/components/TipDetail.jsx`
- Modify: `src/pages/Prepare.jsx`

- [ ] **Créer `src/components/Accordion.jsx`**

```jsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ title, content }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left min-h-[44px]"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4 leading-snug">{title}</span>
        <ChevronDown
          size={20}
          className={`shrink-0 text-primary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-foreground/75">{content}</p>
      )}
    </div>
  )
}
```

- [ ] **Créer `src/components/TipCard.jsx`**

```jsx
import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ChevronRight } from 'lucide-react'

const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }

export default function TipCard({ tip, onSelect }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield

  return (
    <button
      onClick={() => onSelect(tip.id)}
      className="flex items-center gap-4 w-full p-4 bg-white rounded-2xl shadow-sm border border-border text-left min-h-[72px] active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted shrink-0">
        <Icon size={22} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground font-serif">{tip.title}</p>
        <p className="text-sm text-foreground/55 mt-0.5 truncate">{tip.summary}</p>
      </div>
      <ChevronRight size={18} className="text-foreground/30 shrink-0" />
    </button>
  )
}
```

- [ ] **Créer `src/components/TipDetail.jsx`**

```jsx
import { Shield, Package, Clock, Car, Heart, Activity, AlertCircle, ArrowLeft, Lightbulb } from 'lucide-react'
import Accordion from './Accordion'

const ICON_MAP = { Shield, Package, Clock, Car, Heart, Activity, AlertCircle }

export default function TipDetail({ tip, onBack }) {
  const Icon = ICON_MAP[tip.icon] ?? Shield

  return (
    <div className="min-h-screen bg-background">
      {/* Header sticky */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted -ml-2 min-h-[44px] min-w-[44px]"
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
        <p className="text-sm text-foreground/55 leading-relaxed">{tip.summary}</p>
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
```

- [ ] **Remplacer `src/pages/Prepare.jsx`**

```jsx
import { TIPS } from '../data/tips'
import TipCard from '../components/TipCard'
import TipDetail from '../components/TipDetail'

export default function Prepare({ selectedTipId, onSelectTip, onBack }) {
  const selectedTip = TIPS.find((t) => t.id === selectedTipId)

  if (selectedTip) {
    return <TipDetail tip={selectedTip} onBack={onBack} />
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Préparer</h1>
      <p className="text-sm text-foreground/55 mb-6">7 fiches pour l'accompagnant</p>
      <div className="flex flex-col gap-3">
        {TIPS.map((tip) => (
          <TipCard key={tip.id} tip={tip} onSelect={onSelectTip} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Vérifier dans le navigateur**

```bash
npm run dev
```

Expected: liste de 7 cartes → tap → vue détail scrollable avec accordéons qui s'ouvrent/ferment + encadré "conseil du gynéco" → bouton retour fonctionne.

- [ ] **Commit**

```bash
git add src/components/Accordion.jsx src/components/TipCard.jsx src/components/TipDetail.jsx src/pages/Prepare.jsx && git commit -m "feat: section Préparer — 7 fiches tips avec accordéons"
```

---

## Task 7 : Section Bagages — checklists

**Files:**
- Create: `src/components/ChecklistSection.jsx`
- Modify: `src/pages/Bagages.jsx`

- [ ] **Créer `src/components/ChecklistSection.jsx`**

```jsx
import { Backpack, Baby, Luggage, RotateCcw } from 'lucide-react'

const ICON_MAP = { Backpack, Baby, Luggage }

export default function ChecklistSection({ list, checked, onToggle, onReset }) {
  const Icon = ICON_MAP[list.icon] ?? Backpack
  const total = list.items.length
  const done = list.items.filter((item) => Boolean(checked[item.id])).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  const handleReset = () => {
    if (window.confirm(`Réinitialiser "${list.title}" ?`)) {
      onReset(list.id)
    }
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
            onClick={handleReset}
            className="flex items-center justify-center w-10 h-10 rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-muted transition-colors"
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
          <span className="text-xs font-medium text-foreground/50 shrink-0 tabular-nums">
            {done} / {total}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="divide-y divide-border">
        {list.items.map((item) => {
          const isChecked = Boolean(checked[item.id])
          return (
            <button
              key={item.id}
              onClick={() => onToggle(list.id, item.id)}
              className="flex items-center gap-3 w-full px-4 py-3 text-left min-h-[44px] transition-colors active:bg-muted/50"
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
                  isChecked ? 'line-through text-foreground/30' : 'text-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
```

- [ ] **Remplacer `src/pages/Bagages.jsx`**

```jsx
import { CHECKLISTS } from '../data/checklists'
import ChecklistSection from '../components/ChecklistSection'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Bagages() {
  const [checked, setChecked] = useLocalStorage('pb-checklists', {})

  const toggle = (listId, itemId) => {
    setChecked({
      ...checked,
      [`${listId}::${itemId}`]: !checked[`${listId}::${itemId}`],
    })
  }

  const reset = (listId) => {
    const next = { ...checked }
    CHECKLISTS.find((l) => l.id === listId)?.items.forEach((item) => {
      delete next[`${listId}::${item.id}`]
    })
    setChecked(next)
  }

  const getListChecked = (listId) => {
    const result = {}
    CHECKLISTS.find((l) => l.id === listId)?.items.forEach((item) => {
      result[item.id] = Boolean(checked[`${listId}::${item.id}`])
    })
    return result
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Bagages</h1>
      <p className="text-sm text-foreground/55 mb-6">3 listes à cocher avant le départ</p>
      <div className="flex flex-col gap-4">
        {CHECKLISTS.map((list) => (
          <ChecklistSection
            key={list.id}
            list={list}
            checked={getListChecked(list.id)}
            onToggle={toggle}
            onReset={reset}
          />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Vérifier dans le navigateur**

```bash
npm run dev
```

Expected: 3 sections de checklists, items cochables, barre de progression verte, compteur `X / Y`. Recharger la page → état conservé. Reset → window.confirm, puis liste réinitialisée.

- [ ] **Commit**

```bash
git add src/components/ChecklistSection.jsx src/pages/Bagages.jsx && git commit -m "feat: section Bagages — 3 checklists persistées dans localStorage"
```

---

## Task 8 : Section Mode J — cartes réflexes

**Files:**
- Create: `src/components/ReflexCard.jsx`
- Modify: `src/pages/ModeJ.jsx`

- [ ] **Créer `src/components/ReflexCard.jsx`**

```jsx
import { Wind, Hand, Brain, MessageCircle, AlertTriangle } from 'lucide-react'

const ICON_MAP = { Wind, Hand, Brain, MessageCircle, AlertTriangle }

export default function ReflexCard({ card }) {
  const Icon = ICON_MAP[card.icon] ?? AlertTriangle

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 shrink-0">
          <Icon size={20} className="text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-white font-serif">{card.title}</h2>
      </div>
      <p className="text-base font-medium text-gray-100 leading-snug mb-3">{card.instruction}</p>
      <p className="text-sm text-gray-400 leading-relaxed">{card.detail}</p>
    </div>
  )
}
```

- [ ] **Remplacer `src/pages/ModeJ.jsx`**

```jsx
import { Moon } from 'lucide-react'
import { REFLEX_CARDS } from '../data/reflexCards'
import ReflexCard from '../components/ReflexCard'

export default function ModeJ() {
  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-1">
        <Moon size={22} className="text-blue-400" />
        <h1 className="text-2xl font-bold font-serif text-white">Mode J</h1>
      </div>
      <p className="text-sm text-gray-500 mb-6 ml-9">Salle de naissance — cartes réflexes</p>
      <div className="flex flex-col gap-4">
        {REFLEX_CARDS.map((card) => (
          <ReflexCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Vérifier dans le navigateur**

```bash
npm run dev
```

Expected: onglet Mode J → fond noir total, nav sombre, 5 cartes blanches/grises lisibles, icônes bleues. Texte lisible à bout de bras en lumière faible.

- [ ] **Commit**

```bash
git add src/components/ReflexCard.jsx src/pages/ModeJ.jsx && git commit -m "feat: section Mode J — 5 cartes réflexes dark mode"
```

---

## Task 9 : Section Info

**Files:**
- Modify: `src/pages/Info.jsx`

- [ ] **Remplacer `src/pages/Info.jsx`**

```jsx
import { Heart, AlertTriangle } from 'lucide-react'

const APP_VERSION = '1.0.0'

export default function Info() {
  return (
    <div className="px-4 pt-6 pb-8">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-6">À propos</h1>

      {/* Contexte */}
      <section className="bg-white rounded-2xl border border-border p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Heart size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Partner Birth</h2>
        </div>
        <p className="text-sm text-foreground/70 leading-relaxed">
          Une application de poche pour les accompagnants d'accouchement — co-parent, partenaire, doula ou proche. Conçue pour tous les types de projets de naissance.
        </p>
        <p className="text-sm text-foreground/50 mt-3 leading-relaxed">
          Contenu inspiré de formations à l'accouchement physiologique. Reformulé pour l'accompagnant, pas pour la personne qui accouche.
        </p>
      </section>

      {/* Disclaimer médical */}
      <section className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <h2 className="font-semibold text-amber-800 mb-2">Avertissement médical</h2>
            <p className="text-sm text-amber-700 leading-relaxed">
              Les conseils et informations de cette application sont à titre informatif uniquement. Ils ne remplacent pas l'avis, le diagnostic ou le suivi de votre équipe médicale (sage-femme, gynécologue-obstétricien, médecin).
            </p>
            <p className="text-sm text-amber-700 leading-relaxed mt-2">
              En cas de doute ou d'urgence, contactez immédiatement la maternité ou le 15 (SAMU).
            </p>
          </div>
        </div>
      </section>

      {/* Version */}
      <div className="text-center mt-8">
        <p className="text-xs text-foreground/30">Version {APP_VERSION}</p>
        <p className="text-xs text-foreground/20 mt-1">Fait avec soin pour les accompagnants</p>
      </div>
    </div>
  )
}
```

- [ ] **Vérifier dans le navigateur**

```bash
npm run dev
```

Expected: onglet Info → section contexte blanche + encadré avertissement amber + version en bas.

- [ ] **Commit**

```bash
git add src/pages/Info.jsx && git commit -m "feat: section Info — à propos + disclaimer médical"
```

---

## Task 10 : Configuration PWA (manifest + service worker)

**Files:**
- Create: `public/icons/source.svg`
- Modify: `vite.config.js`

- [ ] **Créer l'icône source SVG**

Créer `public/icons/source.svg` :

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#0369A1"/>
  <circle cx="256" cy="210" r="70" fill="white" opacity="0.95"/>
  <path d="M110 370 Q180 310 256 305 Q332 310 402 370" stroke="white" stroke-width="28" fill="none" stroke-linecap="round" opacity="0.95"/>
  <path d="M256 285 Q216 240 196 200 Q180 165 200 140 Q225 110 256 130 Q287 110 312 140 Q332 165 316 200 Q296 240 256 285Z" fill="#38BDF8" opacity="0.9"/>
</svg>
```

- [ ] **Générer les PNG avec le générateur officiel vite-plugin-pwa**

```bash
cd "/Users/odiloncorby/Documents/ODILON/odilon.code/Partner Birth" && npx @vite-pwa/assets-generator@latest --preset minimal-2023 public/icons/source.svg
```

Expected: génère `public/icons/pwa-192x192.png`, `public/icons/pwa-512x512.png`, `public/apple-touch-icon-180x180.png`, `public/favicon.ico`, et d'autres assets dans `public/`.

- [ ] **Mettre à jour `vite.config.js`** avec le plugin PWA

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Partner Birth',
        short_name: 'Partner Birth',
        description: 'Guide de l\'accompagnant pour l\'accouchement',
        theme_color: '#0369A1',
        background_color: '#F0F9FF',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'fr',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    globals: true,
  },
})
```

- [ ] **Lancer tous les tests**

```bash
npm test
```

Expected: tous les tests passent.

- [ ] **Tester le build de production**

```bash
npm run build && npm run preview
```

Expected: app disponible sur `http://localhost:4173`. Ouvrir dans Chrome DevTools → Application → Manifest : icônes présentes, app installable. Ouvrir dans Safari iOS (via ngrok ou déploiement) → "Sur l'écran d'accueil" disponible.

- [ ] **Commit**

```bash
git add vite.config.js public/ && git commit -m "feat: PWA — manifest + service worker offline-first"
```

---

## Task 11 : Déploiement Cloudflare Pages

**Prérequis :** Compte Cloudflare existant avec un projet déjà créé dessus.

- [ ] **Créer le repo GitHub**

```bash
cd "/Users/odiloncorby/Documents/ODILON/odilon.code/Partner Birth"
git remote add origin https://github.com/<ton-username>/partner-birth.git
git branch -M main
git push -u origin main
```

Expected: repo visible sur github.com avec tous les commits.

- [ ] **Connecter Cloudflare Pages au repo**

1. Aller sur https://dash.cloudflare.com → Workers & Pages → Pages
2. Cliquer **"Create a project"** → **"Connect to Git"**
3. Sélectionner le repo `partner-birth`
4. **Configuration du build :**
   - Framework preset : `Vite`
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Node.js version (Environment variables) : `NODE_VERSION = 20`
5. Cliquer **"Save and Deploy"**

Expected: build en 1-2 minutes → URL du type `partner-birth.pages.dev`

- [ ] **Vérifier le déploiement**

Sur `partner-birth.pages.dev`, vérifier :
- Navigation entre les 4 onglets fonctionne
- Mode J → fond sombre
- Checklists → cocher des items → recharger la page → état conservé
- Sur iPhone Safari : Partager → "Sur l'écran d'accueil" → icône installée, ouvre en plein écran sans barre Safari

- [ ] **Tagger la v1.0.0**

```bash
git tag v1.0.0
git push origin main --tags
```

---

## Self-review du plan

**Couverture spec :**
- ✅ 7 fiches tips avec contenu complet (Task 3, 6)
- ✅ 3 checklists avec tous les items (Task 3, 7)
- ✅ 5 cartes Mode J (Task 3, 8)
- ✅ Section Info + disclaimer médical (Task 9)
- ✅ Design tokens Organic Biophilic — couleurs + typo (Task 2)
- ✅ Lora (titres) + Raleway (corps) (Task 2)
- ✅ localStorage persistance checklists (Task 4, 7)
- ✅ PWA installable iOS + Android (Task 10)
- ✅ Déploiement Cloudflare Pages (Task 11)
- ✅ Dark mode Mode J (Task 5, 8)
- ✅ Touch targets ≥ 44px sur tous les boutons interactifs
- ✅ Safe areas iOS via `.pb-safe` (Task 2)
- ✅ Offline-first via Workbox (Task 10)
- ✅ Pas d'emojis comme icônes — Lucide SVG partout
- ✅ Barre de progression par checklist (Task 7)
- ✅ Reset par liste avec confirmation (Task 7)
- ✅ Accordéons dans TipDetail (Task 6)
- ✅ Conseil du gynéco mis en avant visuellement (Task 6)
- ✅ Responsive 375px (Tailwind mobile-first par défaut)

**Cohérence des types :**
- `tip.id / .icon / .title / .summary / .sections / .gyneco_tip` — cohérent entre tips.js, TipCard, TipDetail
- `card.id / .icon / .title / .instruction / .detail` — cohérent entre reflexCards.js et ReflexCard
- `checked[listId::itemId]` — cohérent entre toggle, reset, getListChecked dans Bagages.jsx
- Props `selectedTipId / onSelectTip / onBack / isDark` passées depuis App.jsx — Prepare les utilise toutes, les autres les ignorent silencieusement
