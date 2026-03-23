import { describe, it, expect } from 'vitest'
import { validateProgressState } from './progressSchema'

describe('validateProgressState', () => {
  const validState = {
    currentStage: 'stage1',
    onboardingCompleted: false,
    logs: [],
    preferredSessionRotation: 'A',
    showSafetyReminder: true,
    displayName: '',
  }

  it('accepts valid state', () => {
    const result = validateProgressState(validState)
    expect(result).toEqual(validState)
  })

  it('accepts state with logs', () => {
    const state = {
      ...validState,
      logs: [
        {
          id: 'log-1',
          completedAt: '2026-03-20T10:00:00.000Z',
          stageId: 'stage1',
          sessionType: 'A',
          completedExerciseIds: ['ex-1', 'ex-2'],
          painReported: false,
        },
      ],
    }
    const result = validateProgressState(state)
    expect(result).not.toBeNull()
    expect(result?.logs).toHaveLength(1)
  })

  it('rejects null', () => {
    expect(validateProgressState(null)).toBeNull()
  })

  it('rejects undefined', () => {
    expect(validateProgressState(undefined)).toBeNull()
  })

  it('rejects invalid stage', () => {
    expect(
      validateProgressState({ ...validState, currentStage: 'stage99' }),
    ).toBeNull()
  })

  it('rejects invalid session type', () => {
    expect(
      validateProgressState({ ...validState, preferredSessionRotation: 'C' }),
    ).toBeNull()
  })

  it('rejects missing required fields', () => {
    expect(validateProgressState({ currentStage: 'stage1' })).toBeNull()
  })

  it('rejects log with invalid completedAt', () => {
    const state = {
      ...validState,
      logs: [
        {
          id: 'log-1',
          completedAt: 'not-a-date',
          stageId: 'stage1',
          sessionType: 'A',
          completedExerciseIds: [],
          painReported: false,
        },
      ],
    }
    expect(validateProgressState(state)).toBeNull()
  })
})
