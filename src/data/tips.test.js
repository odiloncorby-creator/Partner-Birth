import { describe, it, expect } from 'vitest'
import { TIPS } from './tips'

describe('TIPS data integrity', () => {
  it('contient exactement 10 fiches', () => {
    expect(TIPS).toHaveLength(10)
  })

  it('chaque fiche a tous les champs obligatoires', () => {
    TIPS.forEach((tip) => {
      expect(tip.id, `tip sans id`).toBeTruthy()
      expect(tip.icon, `${tip.id} sans icon`).toBeTruthy()
      expect(tip.title, `${tip.id} sans title`).toBeTruthy()
      expect(tip.summary, `${tip.id} sans summary`).toBeTruthy()
      expect(Array.isArray(tip.sections), `${tip.id} sections n'est pas un array`).toBe(true)
      expect(tip.gyneco_tip, `${tip.id} sans gyneco_tip`).toBeTruthy()
    })
  })

  it('chaque fiche a au moins une section avec titre et contenu', () => {
    TIPS.forEach((tip) => {
      expect(tip.sections.length, `${tip.id} a 0 sections`).toBeGreaterThan(0)
      tip.sections.forEach((section, i) => {
        expect(section.title, `section ${i} sans title dans ${tip.id}`).toBeTruthy()
        expect(section.content, `section ${i} sans content dans ${tip.id}`).toBeTruthy()
      })
    })
  })

  it('les ids sont uniques', () => {
    const ids = TIPS.map((t) => t.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
