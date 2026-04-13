import { useState } from 'react'
import { Backpack, Baby, Luggage, ClipboardList, RotateCcw } from 'lucide-react'

const ICON_MAP = { Backpack, Baby, Luggage, ClipboardList }

export default function ChecklistSection({ list, checked, onToggle, onReset }) {
  const Icon = ICON_MAP[list.icon] ?? Backpack
  const [confirmOpen, setConfirmOpen] = useState(false)

  const total = list.items.length
  const done = list.items.filter((item) => Boolean(checked[item.id])).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

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
            onClick={() => setConfirmOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-foreground/40 hover:text-foreground/60 hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
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
          <span className="text-xs font-medium text-foreground/60 shrink-0 tabular-nums">
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
              className="flex items-center gap-3 w-full px-4 py-3 text-left min-h-[44px] transition-colors active:bg-muted/50 cursor-pointer focus-visible:outline-none focus-visible:bg-muted/30"
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
                  isChecked ? 'line-through text-foreground/40' : 'text-foreground'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Confirmation inline reset */}
      {confirmOpen && (
        <div className="px-4 py-3 bg-red-50 border-t border-red-100 flex items-center justify-between gap-3">
          <span className="text-sm text-red-700 leading-snug">Réinitialiser "{list.title}" ?</span>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setConfirmOpen(false)}
              className="px-3 py-1.5 text-sm font-medium text-foreground/60 rounded-lg hover:bg-red-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Annuler
            </button>
            <button
              onClick={() => { onReset(list.id); setConfirmOpen(false) }}
              className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
