import { useState } from 'react'
import { Backpack, Baby, Luggage, ClipboardList, RotateCcw, Plus, X } from 'lucide-react'

const ICON_MAP = { Backpack, Baby, Luggage, ClipboardList }

const ICON_COLORS = {
  Backpack: 'bg-sky-100 text-sky-600',
  Baby: 'bg-rose-100 text-rose-600',
  Luggage: 'bg-violet-100 text-violet-600',
}

export default function ChecklistSection({ list, checked, onToggle, onReset, onAddItem, onRemoveItem, customItemIds }) {
  const Icon = ICON_MAP[list.icon] ?? Backpack
  const colorClass = ICON_COLORS[list.icon] ?? 'bg-muted text-primary'
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [newLabel, setNewLabel] = useState('')

  const total = list.items.length
  const done = list.items.filter((item) => Boolean(checked[item.id])).length
  const percent = total > 0 ? Math.round((done / total) * 100) : 0

  const handleAdd = () => {
    const trimmed = newLabel.trim()
    if (!trimmed) return
    onAddItem(list.id, trimmed)
    setNewLabel('')
  }

  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className={`flex items-center justify-center w-9 h-9 rounded-xl ${colorClass}`}>
              <Icon size={18} />
            </div>
            <h2 className="font-semibold font-serif text-foreground">{list.title}</h2>
          </div>
          <button
            onClick={() => setConfirmOpen(true)}
            className="flex items-center justify-center w-10 h-10 rounded-full text-foreground/30 hover:text-foreground/60 hover:bg-muted transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={`Réinitialiser ${list.title}`}
          >
            <RotateCcw size={15} />
          </button>
        </div>
        {/* Barre de progression */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full transition-all duration-300"
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
          const isCustom = customItemIds?.has(item.id)
          return (
            <div key={item.id} className="flex items-center">
              <button
                onClick={() => onToggle(list.id, item.id)}
                className="flex items-center gap-3 flex-1 px-4 py-3 text-left min-h-[44px] transition-colors active:bg-muted/50 cursor-pointer focus-visible:outline-none focus-visible:bg-muted/30"
              >
                <div
                  className={`flex items-center justify-center w-5 h-5 rounded-full border-2 shrink-0 transition-all ${
                    isChecked
                      ? 'bg-gradient-to-br from-sky-400 to-cyan-400 border-transparent'
                      : 'border-foreground/20'
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
                    isChecked ? 'line-through text-foreground/35' : 'text-foreground'
                  }`}
                >
                  {item.label}
                </span>
              </button>
              {isCustom && (
                <button
                  onClick={() => onRemoveItem(list.id, item.id)}
                  className="flex items-center justify-center w-10 h-10 mr-1 text-foreground/30 hover:text-red-500 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 rounded-full"
                  aria-label={`Supprimer ${item.label}`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Ajouter un item */}
      <div className="px-4 py-3 border-t border-border flex items-center gap-2">
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Ajouter un élément…"
          className="flex-1 text-sm bg-transparent text-foreground placeholder:text-foreground/35 outline-none min-h-[44px]"
        />
        <button
          onClick={handleAdd}
          disabled={!newLabel.trim()}
          className="flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-muted transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          aria-label="Ajouter"
        >
          <Plus size={18} />
        </button>
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
