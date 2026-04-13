# Upgrade contenu app — Notes sage-femme

Date : 2026-04-13
Source : Rendez-vous sage-femme — résumé conversation sur l'arrivée à la maternité, gestion du travail, techniques de soulagement, urgences

## Objectif

Intégrer les conseils de la sage-femme dans le contenu existant de l'app Partner Birth : enrichir les tips et cartes réflexes existants, en créer de nouveaux quand le contenu ne rentre pas, corriger les erreurs identifiées, et mettre à jour les checklists.

---

## 1. Corrections

### 1.1 Checklist — Boules quies

**Fichier :** `src/data/checklists.js`, checklist `salle-naissance`
**Problème :** Label `Boules quies (pour toi)` — incorrect. Les boules quies sont pour la femme, pour couper les stimuli sonores et rester dans sa bulle.
**Action :** Changer le label en `Boules quies` (sans précision de destinataire, c'est dans le sac salle de naissance donc implicitement pour elle).

---

## 2. Enrichissement des tips existants

### 2.1 Tip `ton-role` — Ajout gestion admin

**Section à enrichir :** "Le gardien du temple"
**Ajout :** Le partenaire s'occupe des formalités d'inscription à l'arrivée à la maternité. Il aide physiquement pendant les contractions (appui sacrum, soutien physique) pendant que la femme reste dans sa bulle.

### 2.2 Tip `le-depart` — Option taxi + scénarios transport

**Section à enrichir :** "Rester calme pour elle" ou nouvelle section
**Ajout :** Le taxi est une option valide (évite le stress de conduite). Prévoir plusieurs scénarios d'arrivée (rapide vs. long trajet, horaire de nuit). Le choix du transport dépend de la situation et du temps estimé.

### 2.3 Tip `pendant-le-travail` — Monitoring + ambiance

**Section "Le monitoring foetal" :**
- Ajouter : demander un ballon pour s'asseoir dessus pendant le monitoring (évite la position allongée). Les capteurs peuvent être serrés tout en étant assise sur le ballon. Ne pas hésiter à demander — c'est courant et réalisable.

**Section "L'ambiance dans la salle" :**
- Ajouter : option veilleuse dans la salle d'accouchement
- Ajouter : demander que le personnel parle doucement / chuchote et limite les allées-venues
- Préciser : c'est la préférence individuelle qui compte (certaines préfèrent la lumière, d'autres l'obscurité)

### 2.4 Tip `si-ca-change` — Nouvelle section accouchement à domicile

**Nouvelle section à ajouter :** "Accouchement à domicile — protocole d'urgence"
**Contenu :**
1. Laisser la femme pousser naturellement — ne pas intervenir
2. Chercher serviettes ou linge propre
3. Poser le bébé sur le ventre/poitrine de la maman
4. **Ne pas couper le cordon ombilical** — attendre les secours
5. Sécuriser la zone (bloquer bord du lit, serviette au sol)
6. Appeler les pompiers/SAMU dès que la poussée est identifiée — appeler tôt

**Gyneco tip à adapter :** Inclure le message que certains accouchements à domicile se passent bien, mais qu'il faut être préparé.

---

## 3. Nouveaux tips

### 3.1 Tip `arrivee-maternite`

**Position dans l'ordre :** entre `le-depart` (4) et `pendant-le-travail` (actuel 5, futur 7)
**Icon :** `Hospital` ou `Building`
**Title :** Arrivée à la maternité
**Summary :** Garder la bulle, ballon monitoring, lumière et ambiance

**Sections :**

1. **Garder sa bulle en salle d'attente**
   - Rester debout plutôt que s'asseoir (éviter le regard des autres)
   - Mettre ses écouteurs avec sa propre musique
   - Se placer face à un mur pour limiter les stimuli visuels
   - Le partenaire gère l'inscription et les formalités

2. **Examens et contractions**
   - La sage-femme examine entre deux contractions
   - Après l'examen, se relever, se rhabiller, reprendre la gestion respiratoire
   - Ne pas rester passive — reprendre le contrôle après chaque examen

3. **Aménager la salle**
   - Demander un ballon si monitoring requis (s'asseoir dessus, capteurs serrés, c'est possible)
   - Ajuster la lumière selon ses préférences (veilleuse, tamisée, ou lumière normale)
   - Demander au personnel de parler doucement et limiter les allées-venues
   - L'ocytocine est favorisée par un environnement adapté au confort de chacune

**Gyneco tip :** L'arrivée à la maternité est un moment de transition. Plus vous prenez en main votre environnement dès l'entrée, plus le travail se poursuit efficacement. Exprimez vos préférences — le personnel est là pour les respecter.

### 3.2 Tip `points-de-pression`

**Position dans l'ordre :** entre `arrivee-maternite` (5) et `pendant-le-travail` (7)
**Icon :** `Fingerprint` ou `Target`
**Title :** Points de pression
**Summary :** 3 points pour atténuer la douleur des contractions

**Sections :**

1. **Le principe**
   - Le cerveau ne peut analyser qu'une douleur prédominante à la fois
   - Provoquer une douleur localisée déclenche une libération d'endorphines
   - Atténue la perception de la douleur de contraction
   - Utilisable seul ou en complément d'autres méthodes

2. **Point 1 — Creux du V (main)**
   - Entre le pouce et l'index, dans le creux formé par les deux os
   - Appuyer avec les deux pouces, légèrement dirigé vers l'index
   - Maintenir la pression ~1 minute (durée d'une contraction)
   - Astuce : tourner l'ongle du pouce vers l'avant pour être stable

3. **Point 2 — Dessus du pied**
   - Ligne imaginaire entre le 1er et 2e orteil, suivre la courbe vers le haut
   - Au terme de la courbe se trouve un creux / point sensible
   - Appuyer fermement pendant la contraction (~1 minute)

4. **Point 3 — Derrière la malléole (cheville)**
   - Poser le petit doigt au début de la malléole, placer les 4 doigts
   - Le pouce se positionne sur l'os puis légèrement derrière pour atteindre le nerf
   - Possibilité d'utiliser un stylo pour une pression plus stable
   - Sensibilité variable selon les personnes

5. **Conseils pratiques**
   - Marquer les points avec un stylo pour repérage rapide (gauche et droite)
   - S'entraîner avec le partenaire avant le travail pour automatiser le geste
   - Les points peuvent provoquer un petit bleu — le bénéfice dépasse l'inconfort

**Gyneco tip :** Les points de pression sont une technique complémentaire efficace. Entraînez-vous avant le jour J pour que le geste soit automatique quand les contractions arrivent.

---

## 4. Nouvelles cartes réflexes (Mode J)

### 4.1 Carte `points-pression`

- **Icon :** `Fingerprint` ou `Target`
- **Title :** Points de pression
- **Instruction :** Appuyer fort sur un point pendant toute la contraction (~1 min).
- **Detail :** 3 points : creux du V pouce/index (appuyer vers l'index) · dessus du pied entre 1er/2e orteil (suivre la courbe, creux sensible) · derrière la malléole (pouce derrière l'os). Marquer au stylo avant le travail.

### 4.2 Carte `arrivee-maternite`

- **Icon :** `Hospital` ou `Building`
- **Title :** Arrivée maternité
- **Instruction :** Protège sa bulle — tu gères l'admin.
- **Detail :** Écouteurs + musique · debout face au mur · toi = inscription et formalités · demander ballon si monitoring · ajuster lumière · personnel qui chuchote.

### 4.3 Carte `urgence-domicile`

- **Icon :** `Home` ou `Phone`
- **Title :** Accouchement domicile
- **Instruction :** Laisser faire — ne pas couper le cordon — appeler les secours.
- **Detail :** Serviettes propres · bébé sur le ventre de maman · sécuriser le bord du lit · appeler pompiers/SAMU dès la poussée. Ne rien couper, les secours s'en occupent.

---

## 5. Checklist — mises à jour

### 5.1 Sac salle de naissance — ajouts

| Item | Raison |
|---|---|
| Écouteurs + playlist chargée | Rester dans la bulle (sage-femme) |
| Stylo | Marquer les points de pression |
| Fix : `Boules quies` (retirer "pour toi") | Correction erreur |

### 5.2 Nouvelle checklist : Organisation logistique

| Item | Raison |
|---|---|
| Numéro sage-femme / consultante accessible | Contact rapide au début du travail |
| Projet de naissance rédigé | Préférences lumière, ambiance, monitoring |
| Plan transport (taxi + itinéraire voiture) | Plusieurs scénarios prévus |
| Plan garde aînés + personne référente | Transition fluide le jour J |
| Fiche contacts urgences (sage-femme, maternité, SAMU) | Accès rapide sans chercher |

---

## 6. Ordre final des tips

```
1. Ton rôle                    ← enrichi
2. Préparation                 ← tel quel
3. Quand partir                ← tel quel
4. Le départ                   ← enrichi (taxi)
5. Arrivée à la maternité     ← NOUVEAU
6. Points de pression          ← NOUVEAU
7. Pendant le travail          ← enrichi (monitoring, ambiance)
8. La péridurale               ← tel quel
9. Si ça change                ← enrichi (section domicile)
```

## 7. Ordre final des cartes réflexes

```
1. Souffle miroir              ← existant
2. Massage sacrum              ← existant
3. Points de pression          ← NOUVEAU
4. Arrivée maternité           ← NOUVEAU
5. Mots d'ancrage              ← existant
6. Méthode B.R.A.I.N.          ← existant
7. Accouchement domicile       ← NOUVEAU
8. Si urgence                  ← existant
```

Logique d'ordre : gestes physiques d'abord (souffle, massage, pression), puis gestion situationnelle (arrivée, mots), puis décision/urgence (BRAIN, domicile, urgence).

## 8. Ordre final des checklists

```
1. Sac salle de naissance      ← enrichi + fix
2. Valise bébé                 ← tel quel
3. Valise post-partum (maman)  ← tel quel
4. Organisation logistique     ← NOUVEAU
```
