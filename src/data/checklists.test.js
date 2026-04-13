import { describe, it, expect } from 'vitest'
import { CHECKLISTS } from './checklists'

describe('CHECKLISTS data integrity', () => {
  it('contient exactement 3 listes', () => {
    expect(CHECKLISTS).toHaveLength(4)
  })

  it('chaque liste a les champs obligatoires', () => {
    CHECKLISTS.forEach((list) => {
      expect(list.id).toBeTruthy()
      expect(list.icon).toBeTruthy()
      expect(list.title).toBeTruthy()
      expect(Array.isArray(list.items)).toBe(true)
      expect(list.items.length).toBeGreaterThan(0)
    })
  })

  it('chaque item a un id et un label non vides', () => {
    CHECKLISTS.forEach((list) => {
      list.items.forEach((item) => {
        expect(item.id, `item sans id dans ${list.id}`).toBeTruthy()
        expect(item.label, `item sans label dans ${list.id}`).toBeTruthy()
      })
    })
  })

  it('les ids d\'items sont uniques par liste', () => {
    CHECKLISTS.forEach((list) => {
      const ids = list.items.map((i) => i.id)
      expect(new Set(ids).size, `ids dupliqués dans ${list.id}`).toBe(ids.length)
    })
  })
})
