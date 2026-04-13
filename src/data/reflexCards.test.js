import { describe, it, expect } from 'vitest'
import { REFLEX_CARDS } from './reflexCards'

describe('REFLEX_CARDS data integrity', () => {
  it('contient exactement 8 cartes', () => {
    expect(REFLEX_CARDS).toHaveLength(8)
  })

  it('chaque carte a les champs obligatoires', () => {
    REFLEX_CARDS.forEach((card) => {
      expect(card.id).toBeTruthy()
      expect(card.icon).toBeTruthy()
      expect(card.title).toBeTruthy()
      expect(card.instruction).toBeTruthy()
      expect(card.detail).toBeTruthy()
    })
  })

  it('les ids sont uniques', () => {
    const ids = REFLEX_CARDS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
