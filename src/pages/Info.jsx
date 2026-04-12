import { Heart, AlertTriangle, Info } from 'lucide-react'

const APP_VERSION = '1.1.0'

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
            <Info size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">À propos</h1>
        </div>
        <p className="text-sm text-sky-100/70 ml-13">Partner Birth · v{APP_VERSION}</p>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-8 relative z-10">
        {/* Description */}
        <section className="bg-white rounded-2xl border border-border shadow-sm p-5 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-50">
              <Heart size={16} className="text-primary" />
            </div>
            <h2 className="font-semibold text-foreground">Partner Birth</h2>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed">
            Une application de poche pour les accompagnants d'accouchement — co-parent, partenaire, doula ou proche. Conçue pour tous les types de projets de naissance.
          </p>
          <p className="text-sm text-foreground/60 mt-3 leading-relaxed">
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
                Les conseils et informations de cette application sont à titre informatif uniquement. Ils ne remplacent pas l'avis, le diagnostic ou le suivi de votre équipe médicale.
              </p>
              <p className="text-sm text-amber-700 leading-relaxed mt-2">
                En cas de doute ou d'urgence, contactez immédiatement la maternité ou le 15 (SAMU).
              </p>
            </div>
          </div>
        </section>

        {/* Version */}
        <div className="text-center mt-8">
          <p className="text-xs text-foreground/40">Version {APP_VERSION}</p>
          <p className="text-xs text-foreground/30 mt-1">Fait avec soin pour les accompagnants</p>
        </div>
      </div>
    </div>
  )
}
