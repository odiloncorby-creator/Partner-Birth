import { BookOpen, Luggage, Moon, Info, CalendarDays } from 'lucide-react'

const TABS = [
  { id: 'prepare', label: 'Préparer', Icon: BookOpen },
  { id: 'bagages', label: 'Bagages', Icon: Luggage },
  { id: 'calendrier', label: 'Terme', Icon: CalendarDays },
  { id: 'mode-j', label: 'Mode J', Icon: Moon },
  { id: 'info', label: 'Info', Icon: Info },
]

export default function BottomNav({ activeTab, onTabChange }) {
  const isDark = activeTab === 'mode-j'

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex pb-safe ${
        isDark
          ? 'bg-slate-950 border-t border-white/10'
          : 'bg-slate-900 border-t border-white/10'
      }`}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-[60px] transition-all cursor-pointer focus-visible:outline-none relative ${
              isActive ? 'text-cyan-400' : 'text-slate-500'
            }`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-cyan-400" />
            )}
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
