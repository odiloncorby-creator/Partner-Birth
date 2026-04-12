import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => localStorage.clear())

  it('retourne la valeur initiale quand rien n\'est stocké', () => {
    const { result } = renderHook(() => useLocalStorage('pb-test', { a: false }))
    expect(result.current[0]).toEqual({ a: false })
  })

  it('persiste la valeur dans localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('pb-test', {}))
    act(() => result.current[1]({ x: true }))
    expect(JSON.parse(localStorage.getItem('pb-test'))).toEqual({ x: true })
  })

  it('lit une valeur existante depuis localStorage', () => {
    localStorage.setItem('pb-test', JSON.stringify({ b: true }))
    const { result } = renderHook(() => useLocalStorage('pb-test', {}))
    expect(result.current[0]).toEqual({ b: true })
  })

  it('deux hooks avec des clés différentes sont indépendants', () => {
    const { result: r1 } = renderHook(() => useLocalStorage('pb-key1', 0))
    const { result: r2 } = renderHook(() => useLocalStorage('pb-key2', 0))
    act(() => r1.current[1](42))
    expect(r1.current[0]).toBe(42)
    expect(r2.current[0]).toBe(0)
  })
})
