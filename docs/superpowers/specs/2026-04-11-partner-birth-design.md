# Partner Birth — Design Spec
**Date :** 2026-04-11  
**Statut :** En attente de validation utilisateur  
**Stack :** React + Vite + Tailwind CSS → PWA → Cloudflare Pages (gratuit)

---

## Contexte & Objectif

Application mobile (PWA) destinée aux **accompagnants lors d'un accouchement** — co-parent, partenaire, doula, proche. L'app s'adresse à **tous les types de projets de naissance** (physiologique, médicalisé, avec péridurale, césarienne...) avec une tonalité conseil plutôt que prescriptive.

**Phase 1 :** Usage personnel (créateur + un ami futur père), dans 1 semaine max.  
**Phase 2 :** Partage public via lien (PWA), puis éventuellement App Store / Google Play.

**Source de contenu :** Notion — Tips accouchement  
https://www.notion.so/Tips-accouchement-33e0c947e1bf80719bc3c12f7d394df5

---

## Principes de design

- **Conseiller, pas prescrire** — Chaque tip est formulé comme une suggestion, pas une règle.
- **Calme & rassurant** — Visuellement apaisant, jamais anxiogène.
- **Lisible sous stress** — Le Mode J doit fonctionner à 3h du matin, mains tremblantes.
- **Zéro friction** — Pas de compte, pas de connexion, offline-first.

---

## Style visuel

| Élément | Valeur |
|---------|--------|
| Style | Organic Biophilic |
| Mode | Light (défaut) + Dark (Mode J) |
| Corners | 16–24px arrondis, formes organiques |
| Ombres | Douces, naturelles |
| Accessibilité | WCAG AA |

### Palette de couleurs

| Rôle | Hex | Usage |
|------|-----|-------|
| Background | `#F0F9FF` | Fond général |
| Primary | `#0369A1` | Actions principales, nav active |
| Secondary | `#38BDF8` | Accents secondaires |
| Accent/CTA | `#16A34A` | Boutons d'action, progression |
| Foreground | `#0C4A6E` | Texte principal |
| Muted | `#E7EFF5` | Fonds de cards |
| Border | `#E0F2FE` | Séparateurs |
| Destructive | `#DC2626` | Erreurs |

### Typographie

| Usage | Police | Poids |
|-------|--------|-------|
| Titres | **Lora** (serif) | 400 / 600 / 700 |
| Corps & UI | **Raleway** (sans-serif) | 300 / 400 / 500 / 600 |

```css
@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700&display=swap');
```

---

## Architecture de l'application

### Navigation principale (Bottom Navigation — 4 onglets)

```
[ Préparer ]  [ Bagages ]  [ Mode J ]  [ Info ]
```

Règle : max 4 onglets, icônes + labels, état actif visuellement marqué.

---

## Sections détaillées

### 1. Préparer — Fiches tips

Liste de fiches ordonnées logiquement, présentées en cards. Chaque fiche s'ouvre en vue détaillée avec sections accordéon.

**Ordre des fiches :**

| # | Fiche | Contenu clé |
|---|-------|-------------|
| 1 | 🛡️ Ton rôle | Gardien du temple, ocytocine, bulle |
| 2 | 🚌 Préparation | Logistique, dossier, voiture, sacs |
| 3 | 🚕 Quand partir | Règle 5-1-1, poche des eaux, signaux |
| 4 | 👨‍🍼 Le départ | Calme, installation voiture |
| 5 | 💪 Pendant le travail | Souffle miroir, positions, ambiance, monitoring |
| 6 | 💉 La péridurale | Pose, passivité à éviter, peanut ball |
| 7 | ⏰ Si ça change | B.R.A.I.N., deuil du projet, urgences |

**UX des fiches :**
- Card avec titre, icône, résumé 1 ligne
- Tap → vue détaillée scrollable
- Sections accordéon pour ne pas noyer (ex: "Le soutien par le souffle", "La communication basse fréquence")
- Citation "Le conseil du gynéco" mise en avant visuellement

---

### 2. Bagages — Checklists

3 checklists avec cases à cocher. État persisté en localStorage (survit au rechargement).

| Liste | Items actuels |
|-------|--------------|
| 🎒 Sac salle de naissance | Eau, snacks, brumisateur, bouillotte, chargeurs, bodys, pyjamas, bonnet, turbulette, boules quies, lunettes soleil |
| 👛 Valise bébé | Serviette, 5 bodys, 4 pyjamas, lange, turbulette, thermomètre, thermomètre bain, liniment, écharpe portage |
| 🧳 Valise post-partum (maman) | Culottes post-partum, serviettes post-partum, serviette bain, tapis bain, tenues confortables, brassière, pyjama, veilleuse, trousse de toilette, coussin allaitement |

**UX des checklists :**
- Barre de progression par liste (ex: "7 / 11 items")
- Reset possible par liste (avec confirmation)
- Items cochés visuellement barrés/atténués

---

### 3. Mode J — Salle de naissance

Vue d'urgence activable depuis n'importe quel onglet (bouton persistant ou onglet dédié).

**Principes :**
- **Fond sombre** (dark mode) — lisible de nuit, réduit la fatigue visuelle
- **Texte grand** (minimum 18px body)
- **5 cartes réflexes** — essentielles, lisibles en 5 secondes chacune

**Les 5 cartes réflexes :**

| # | Carte | Message clé |
|---|-------|-------------|
| 1 | 🫁 Souffle miroir | Place-toi face à elle, respire ample et sonore — elle calera son rythme sur le tien |
| 2 | 👐 Massage sacrum | Pression ferme et constante avec les deux pouces sur le bas du dos pendant la contraction |
| 3 | 🧠 Méthode B.R.A.I.N. | Bénéfices · Risques · Alternatives · Instinct · Nothing/Now |
| 4 | 💬 Mots d'ancrage | "Expire" · "Relâche" · "C'est bien" · "On y est" — Évite "Ça va ?" |
| 5 | 🚨 Si urgence | Reste calme, contact physique permanent, décris-lui ce qui se passe calmement |

---

### 4. Info — À propos

- Contexte de l'app (qui, pourquoi)
- Disclaimer médical : "Ces conseils sont informatifs, ils ne remplacent pas l'avis de votre équipe médicale."
- Version de l'app
- Lien vers le contenu source (Notion, optionnel)

---

## Données & Infrastructure

| Aspect | Choix | Raison |
|--------|-------|--------|
| Backend | Aucun | Zéro coût, zéro friction utilisateur |
| Stockage | localStorage | Persistance des checklists sur l'appareil |
| Contenu | Embarqué dans le code | Offline-first, pas de dépendance Notion en prod |
| Déploiement | Cloudflare Pages (free tier) | Gratuit, bande passante illimitée, lien partageable immédiatement |
| PWA | Oui (manifest + service worker) | Installable sur iPhone/Android sans App Store |

---

## Stack technique

```
React 18 + Vite
Tailwind CSS (styling)
Lucide React (icônes SVG)
Vite PWA Plugin (service worker + manifest)
Déploiement : Cloudflare Pages
```

---

## Évolutions futures (hors scope v1)

- Ajout de fiches par type de naissance (déclenchement, césarienne programmée...)
- Notifications / rappels pré-J
- Mode multi-langues
- Publication App Store / Google Play (via Capacitor)
- Monétisation éventuelle (à définir)

---

## Checklist pré-livraison UI

- [ ] Pas d'emojis comme icônes (Lucide SVG uniquement)
- [ ] Touch targets ≥ 44px
- [ ] Contraste texte ≥ 4.5:1 (light et dark)
- [ ] Responsive 375px en priorité
- [ ] Offline fonctionnel (service worker)
- [ ] Safe areas iOS respectées
- [ ] prefers-reduced-motion respecté
