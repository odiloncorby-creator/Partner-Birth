import { BookOpen, Luggage, Moon, Info } from 'lucide-react'

const TABS = [
  { id: 'prepare', label: 'Préparer', Icon: BookOpen },
  { id: 'bagages', label: 'Bagages', Icon: Luggage },
  { id: 'mode-j', label: 'Mode J', Icon: Moon },
  { id: 'info', label: 'Info', Icon: Info },
]

export default function BottomNav({ activeTab, onTabChange, isDark }) {
  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 flex border-t pb-safe ${
        isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-border'
      }`}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 min-h-[60px] transition-colors ${
              isActive
                ? isDark ? 'text-blue-400' : 'text-primary'
                : isDark ? 'text-gray-500' : 'text-gray-400'
            }`}
            aria-label={label}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-xs font-medium">{label}</span>
          </button>
        )
      })}
    </nav>
  )
}
