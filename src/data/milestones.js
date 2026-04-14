export const MILESTONES = [
  {
    id: 'anticipation',
    minDays: 61,
    maxDays: Infinity,
    label: 'Anticipation',
    title: 'On prépare le terrain',
    subtitle: 'Encore du temps devant vous — profitez-en !',
    color: 'sky',
    badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    actions: [
      'Lire les 7 fiches de préparation',
      'Parler de votre rôle avec votre partenaire',
      'Repérer la maternité et les accès',
      'Discuter du projet de naissance',
    ],
  },
  {
    id: 'prep-active',
    minDays: 31,
    maxDays: 60,
    label: 'Prépa active',
    title: "C'est parti pour de vrai",
    subtitle: 'Deux mois — le bon moment pour s\'organiser.',
    color: 'blue',
    badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    actions: [
      'Participer aux cours de préparation',
      'Confirmer la maternité choisie',
      'Tester le trajet domicile → maternité',
      'Commencer la liste des sacs',
      'Préparer les contacts d\'urgence',
    ],
  },
  {
    id: 'bags',
    minDays: 15,
    maxDays: 30,
    label: 'Sacs à préparer',
    title: 'Un mois, ça file vite',
    subtitle: 'C\'est maintenant qu\'on prépare les sacs.',
    color: 'indigo',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    actions: [
      'Préparer le sac salle de naissance',
      'Préparer la valise bébé',
      'Préparer la valise post-partum',
      'Vérifier les documents (carte vitale, carnet)',
      'Charger les chargeurs dans les sacs',
    ],
  },
  {
    id: 'final-checks',
    minDays: 8,
    maxDays: 14,
    label: 'Checks finaux',
    title: 'Deux semaines',
    subtitle: 'Les sacs doivent être bouclés.',
    color: 'violet',
    badgeColor: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    actions: [
      'Vérifier les sacs — tout est dedans ?',
      'Tester le GPS maternité encore une fois',
      'Confirmer le parking / itinéraire de nuit',
      'Installer le siège auto dans la voiture',
      'Savoir quand appeler la maternité',
    ],
  },
  {
    id: 'last-week',
    minDays: 4,
    maxDays: 7,
    label: 'Dernière ligne',
    title: 'La dernière semaine',
    subtitle: 'Restez disponible et proche.',
    color: 'amber',
    badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    actions: [
      'Téléphone chargé en permanence',
      'Numéro de la maternité dans les favoris',
      'Numéro du gynéco / sage-femme dispo',
      'Rester à portée, éviter les longs déplacements',
      'Revoir la méthode B.R.A.I.N.',
    ],
  },
  {
    id: 'countdown',
    minDays: 1,
    maxDays: 3,
    label: 'Compte à rebours',
    title: 'Ça y est presque',
    subtitle: 'Plus que quelques jours — soyez prêt.',
    color: 'orange',
    badgeColor: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    actions: [
      'Sacs dans le coffre de la voiture',
      'Téléphone chargé à 100% chaque soir',
      'Dormir autant que possible',
      'Revoir les signes du départ (contractions, poche des eaux)',
      'Rester calme — vous êtes prêt.',
    ],
  },
  {
    id: 'birth-day',
    minDays: 0,
    maxDays: 0,
    label: 'Le grand jour',
    title: 'C\'est aujourd\'hui !',
    subtitle: 'Respirez. Vous êtes là. C\'est tout ce qui compte.',
    color: 'cyan',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    actions: [
      'Activer le Mode J dans l\'app',
      'Chronométrer les contractions',
      'Appeler la maternité au bon moment',
      'Rester ancré, calme, présent',
      'Souffler avec elle — souffle miroir',
    ],
  },
  {
    id: 'postpartum',
    minDays: -Infinity,
    maxDays: -1,
    label: 'Post-partum',
    title: 'Et maintenant…',
    subtitle: 'Le début d\'une nouvelle aventure.',
    color: 'emerald',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    actions: [
      'Être présent — les premières heures comptent',
      'Soutenir sans envahir',
      'Prendre soin d\'elle et de bébé',
      'Gérer les visites avec douceur',
      'Accepter de ne pas tout savoir — c\'est normal',
    ],
  },
]

export function getMilestone(daysUntilTerm) {
  if (daysUntilTerm === 0) return MILESTONES.find((m) => m.id === 'birth-day')
  if (daysUntilTerm < 0) return MILESTONES.find((m) => m.id === 'postpartum')
  return (
    MILESTONES.find(
      (m) => m.minDays !== -Infinity && m.maxDays !== Infinity &&
        daysUntilTerm >= m.minDays && daysUntilTerm <= m.maxDays
    ) ?? MILESTONES.find((m) => m.id === 'anticipation')
  )
}
