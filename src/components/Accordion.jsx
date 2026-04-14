import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ title, content }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left min-h-[44px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
        aria-expanded={open}
      >
        <span className="font-medium text-foreground pr-4 leading-snug text-sm">{title}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-primary/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-4 text-sm leading-relaxed text-foreground/65">{content}</p>
      )}
    </div>
  )
}
