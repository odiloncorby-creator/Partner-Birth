# Partner Birth

> Un guide de poche pour l'accompagnant — parce que le jour J, on préfère être présent que de chercher quoi faire.

---

## Pourquoi cette app existe

L'accouchement, ça se prépare. Pour la personne qui accouche, il y a des cours, des sages-femmes, des livres. Pour l'accompagnant — co-parent, partenaire, doula, proche — c'est souvent moins balisé.

Ce projet est né d'un constat simple : quand tu es dans la salle de naissance à 3h du matin, mains moites, tu n'as pas le temps de parcourir un PDF de 40 pages. Tu as besoin d'un truc qui s'ouvre, qui dit quoi faire, et qui tient dans ta poche.

Partner Birth est cette app. Une PWA installable sur iPhone et Android, offline-first, sans compte, sans connexion, sans friction.

---

## Ce que l'app contient

### Préparer — 7 fiches conseils

Des fiches pratiques pour l'accompagnant, organisées dans l'ordre chronologique du projet de naissance :

| Fiche | Sujet |
|-------|-------|
| Ton rôle | Gardien de la bulle, protecteur de l'ocytocine |
| Préparation | Dossier, voiture, sacs — tout prêt 3 semaines avant |
| Quand partir | La règle 5-1-1, la poche des eaux, les bons signaux |
| Le départ | Rester calme, installation voiture |
| Pendant le travail | Souffle miroir, positions, ambiance |
| La péridurale | La pose, comment rester utile après |
| Si ça change | Méthode B.R.A.I.N., les urgences |

Chaque fiche s'ouvre en vue détaillée avec sections accordéon et un conseil du gynéco mis en avant.

### Bagages — 3 checklists

Cases à cocher avec barre de progression. Tout ce qu'il ne faut pas oublier, organisé par sac :

- Sac salle de naissance
- Valise bébé
- Valise post-partum (maman)

L'état des checklists est sauvegardé sur l'appareil — même si tu fermes l'app, tu retrouves tes coches.

### Mode J — 5 cartes réflexes

C'est l'onglet pour le jour J, en salle de naissance. Fond sombre, texte grand, lisible en quelques secondes :

1. **Souffle miroir** — Place-toi face à elle, respire ample et sonore
2. **Massage sacrum** — Pression ferme et constante sur le bas du dos pendant la contraction
3. **Méthode B.R.A.I.N.** — Bénéfices · Risques · Alternatives · Instinct · Nothing/Now
4. **Mots d'ancrage** — "Expire" · "Relâche" · "C'est bien" · "On y est"
5. **Si urgence** — Reste calme, contact physique, décris ce qui se passe

---

## Principes de design

- **Conseiller, pas prescrire** — tout est formulé comme une suggestion, pas une règle
- **Calme et rassurant** — visuellement apaisant, jamais anxiogène
- **Lisible sous stress** — le Mode J fonctionne à 3h du matin, mains tremblantes
- **Zéro friction** — pas de compte, pas de connexion, offline-first

---

## Stack technique

```
React 18 + Vite 5
Tailwind CSS 3
Lucide React (icônes SVG)
vite-plugin-pwa (service worker + manifest)
Vitest + Testing Library
Déploiement : Cloudflare Pages
```

L'app ne communique avec aucun serveur. Tout le contenu est embarqué dans le code. Une fois installée, elle fonctionne sans connexion internet.

---

## Commandes

```bash
npm install       # Installer les dépendances
npm run dev       # Dev sur localhost:5173
npm test          # Tests Vitest
npm run build     # Build prod → dist/
npm run preview   # Prévisualiser le build
```

---

## Structure du projet

```
src/
├── App.jsx              # Navigation + état global
├── data/                # Contenu (tips, checklists, cartes réflexes)
├── hooks/               # useLocalStorage
├── components/          # BottomNav, TipCard, ChecklistSection, ReflexCard...
└── pages/               # Prepare, Bagages, ModeJ, Info
```

---

## Évolutions prévues

- Fiches spécifiques par type de naissance (déclenchement, césarienne programmée)
- Multi-langues
- Publication App Store / Google Play via Capacitor

---

## Avertissement médical

Le contenu de cette application est à titre informatif uniquement. Il ne remplace pas l'avis, le diagnostic ou le suivi de votre équipe médicale. En cas de doute ou d'urgence, contactez la maternité ou le 15 (SAMU).
