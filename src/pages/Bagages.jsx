import { CHECKLISTS } from '../data/checklists'
import ChecklistSection from '../components/ChecklistSection'
import { useLocalStorage } from '../hooks/useLocalStorage'

export default function Bagages() {
  const [checked, setChecked] = useLocalStorage('pb-checklists', {})

  const toggle = (listId, itemId) => {
    setChecked({
      ...checked,
      [`${listId}::${itemId}`]: !checked[`${listId}::${itemId}`],
    })
  }

  const reset = (listId) => {
    const next = { ...checked }
    CHECKLISTS.find((l) => l.id === listId)?.items.forEach((item) => {
      delete next[`${listId}::${item.id}`]
    })
    setChecked(next)
  }

  const getListChecked = (listId) => {
    const result = {}
    CHECKLISTS.find((l) => l.id === listId)?.items.forEach((item) => {
      result[item.id] = Boolean(checked[`${listId}::${item.id}`])
    })
    return result
  }

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Bagages</h1>
      <p className="text-sm text-foreground/55 mb-6">3 listes à cocher avant le départ</p>
      <div className="flex flex-col gap-4">
        {CHECKLISTS.map((list) => (
          <ChecklistSection
            key={list.id}
            list={list}
            checked={getListChecked(list.id)}
            onToggle={toggle}
            onReset={reset}
          />
        ))}
      </div>
    </div>
  )
}
