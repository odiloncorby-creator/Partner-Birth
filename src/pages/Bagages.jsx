import { CHECKLISTS } from '../data/checklists'
import ChecklistSection from '../components/ChecklistSection'
import { useLocalStorage } from '../hooks/useLocalStorage'

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

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-2xl font-bold font-serif text-foreground mb-1">Bagages</h1>
      <p className="text-sm text-foreground/55 mb-6">4 listes à cocher avant le départ</p>
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
  )
}
