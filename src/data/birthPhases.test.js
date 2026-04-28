import { describe, it, expect } from 'vitest'
import { BIRTH_PHASES } from './birthPhases'

describe('BIRTH_PHASES data integrity', () => {
  it('contient exactement 6 phases', () => {
    expect(BIRTH_PHASES).toHaveLength(6)
  })

  it('chaque phase a les champs obligatoires', () => {
    BIRTH_PHASES.forEach((phase) => {
      expect(phase.id, `phase sans id`).toBeTruthy()
      expect(phase.label, `${phase.id} sans label`).toBeTruthy()
      expect(phase.signal, `${phase.id} sans signal`).toBeTruthy()
      expect(phase.action, `${phase.id} sans action`).toBeTruthy()
      expect('words' in phase, `${phase.id} sans champ words`).toBe(true)
    })
  })

  it('les ids sont uniques', () => {
    const ids = BIRTH_PHASES.map((p) => p.id)
    expect(new Set(ids).size).toBe(BIRTH_PHASES.length)
  })
})
