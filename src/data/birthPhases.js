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
    action: 'Rassurer. Ne pas gérer — juste être là. La naissance est imminente.',
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
