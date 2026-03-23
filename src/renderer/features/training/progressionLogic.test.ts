import { describe, it, expect } from 'vitest'
import type { SessionLog } from '../../../types/domain'
import { evaluateProgression } from './progressionLogic'

function makeLog(overrides: Partial<SessionLog> = {}): SessionLog {
  return {
    id: 'test-1',
    completedAt: '2026-03-20T10:00:00.000Z',
    stageId: 'stage1',
    sessionType: 'A',
    completedExerciseIds: [],
    painReported: false,
    ...overrides,
  }
}

function makeStage1Logs(count: number, painReported = false): SessionLog[] {
  return Array.from({ length: count }, (_, i) =>
    makeLog({
      id: `s1-${String(i)}`,
      stageId: 'stage1',
      sessionType: i % 2 === 0 ? 'A' : 'B',
      painReported,
    }),
  )
}

function makeStage2Logs(count: number, painReported = false): SessionLog[] {
  return Array.from({ length: count }, (_, i) =>
    makeLog({
      id: `s2-${String(i)}`,
      stageId: 'stage2',
      sessionType: i % 2 === 0 ? 'A' : 'B',
      painReported,
    }),
  )
}

describe('evaluateProgression - Stage 1 to 2', () => {
  it('cannot advance with fewer than 6 sessions', () => {
    const logs = makeStage1Logs(3)
    const result = evaluateProgression('stage1', logs)
    expect(result.canAdvance).toBe(false)
    expect(result.nextStage).toBeNull()
  })

  it('can advance with 6+ sessions and no pain', () => {
    const logs = makeStage1Logs(6)
    const result = evaluateProgression('stage1', logs)
    expect(result.canAdvance).toBe(true)
    expect(result.nextStage).toBe('stage2')
  })

  it('cannot advance if pain was reported', () => {
    const logs = makeStage1Logs(6, true)
    const result = evaluateProgression('stage1', logs)
    expect(result.canAdvance).toBe(false)
  })

  it('returns all conditions', () => {
    const result = evaluateProgression('stage1', [])
    expect(result.conditions.length).toBe(4)
  })
})

describe('evaluateProgression - Stage 2 to 3', () => {
  it('cannot advance with fewer than 6 sessions', () => {
    const logs = makeStage2Logs(3)
    const result = evaluateProgression('stage2', logs)
    expect(result.canAdvance).toBe(false)
    expect(result.nextStage).toBeNull()
  })

  it('can advance with 6+ sessions and no pain', () => {
    const logs = makeStage2Logs(6)
    const result = evaluateProgression('stage2', logs)
    expect(result.canAdvance).toBe(true)
    expect(result.nextStage).toBe('stage3')
  })

  it('cannot advance if pain was reported', () => {
    const logs = makeStage2Logs(6, true)
    const result = evaluateProgression('stage2', logs)
    expect(result.canAdvance).toBe(false)
  })
})

describe('evaluateProgression - Stage 3', () => {
  it('reports that stage 3 is the final stage', () => {
    const result = evaluateProgression('stage3', [])
    expect(result.canAdvance).toBe(false)
    expect(result.nextStage).toBeNull()
    expect(result.conditions[0]?.label).toBe('最終段階です')
  })
})
