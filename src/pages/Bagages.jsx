import { CHECKLISTS } from '../data/checklists'
import ChecklistSection from '../components/ChecklistSection'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Luggage } from 'lucide-react'

export default function Bagages() {
  const [checked, setChecked] = useLocalStorage('pb-checklists', {})
  const [customItems, setCustomItems] = useLocalStorage('pb-custom-items', {})

  const toggle = (listId, itemId) => {
    setChecked({
      ...checked,
      [`${listId}::${itemId}`]: !checked[`${listId}::${itemId}`],
    })
  }

  const reset = (listId) => {
    const next = { ...checked }
    const list = CHECKLISTS.find((l) => l.id === listId)
    const allItems = [...(list?.items ?? []), ...(customItems[listId] ?? [])]
    allItems.forEach((item) => {
      delete next[`${listId}::${item.id}`]
    })
    setChecked(next)
  }

  const getListChecked = (listId) => {
    const result = {}
    const list = CHECKLISTS.find((l) => l.id === listId)
    const allItems = [...(list?.items ?? []), ...(customItems[listId] ?? [])]
    allItems.forEach((item) => {
      result[item.id] = Boolean(checked[`${listId}::${item.id}`])
    })
    return result
  }

  const addItem = (listId, label) => {
    const id = `custom-${Date.now()}`
    const listCustom = customItems[listId] ?? []
    setCustomItems({
      ...customItems,
      [listId]: [...listCustom, { id, label }],
    })
  }

  const removeItem = (listId, itemId) => {
    const listCustom = customItems[listId] ?? []
    setCustomItems({
      ...customItems,
      [listId]: listCustom.filter((item) => item.id !== itemId),
    })
    const next = { ...checked }
    delete next[`${listId}::${itemId}`]
    setChecked(next)
  }

  const getListWithCustomItems = (list) => ({
    ...list,
    items: [...list.items, ...(customItems[list.id] ?? [])],
  })

  const totalItems = CHECKLISTS.reduce((sum, l) => sum + l.items.length, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <div className="hero-gradient px-4 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15">
            <Luggage size={20} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">Vos sacs</h1>
        </div>
        <p className="text-sm text-sky-100/70 ml-13">4 listes · {totalItems} choses à ne pas oublier</p>
      </div>

      {/* Content */}
      <div className="bg-background rounded-t-3xl -mt-4 px-4 pt-5 pb-4 relative z-10">
        <div className="flex flex-col gap-4">
          {CHECKLISTS.map((list) => (
            <ChecklistSection
              key={list.id}
              list={getListWithCustomItems(list)}
              checked={getListChecked(list.id)}
              onToggle={toggle}
              onReset={reset}
              onAddItem={addItem}
              onRemoveItem={removeItem}
              customItemIds={new Set((customItems[list.id] ?? []).map((i) => i.id))}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
