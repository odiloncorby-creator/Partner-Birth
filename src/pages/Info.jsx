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
        <p className="text-sm text-foreground/65 mt-3 leading-relaxed">
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
        <p className="text-xs text-foreground/50">Version {APP_VERSION}</p>
        <p className="text-xs text-foreground/40 mt-1">Fait avec soin pour les accompagnants</p>
      </div>
    </div>
  )
}
