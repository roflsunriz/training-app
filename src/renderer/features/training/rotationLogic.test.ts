import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { SessionLog } from '../../../types/domain'
import {
  getNextSessionType,
  getSessionCountForStage,
  getSessionCountByType,
  isCompletedToday,
  getRecentLogs,
  getLastCompletedDate,
} from './rotationLogic'

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

describe('getNextSessionType', () => {
  it('returns A when no logs exist', () => {
    expect(getNextSessionType([])).toBe('A')
  })

  it('returns B after session A', () => {
    const logs = [makeLog({ sessionType: 'A' })]
    expect(getNextSessionType(logs)).toBe('B')
  })

  it('returns A after session B', () => {
    const logs = [makeLog({ sessionType: 'B' })]
    expect(getNextSessionType(logs)).toBe('A')
  })

  it('alternates correctly through multiple logs', () => {
    const logs = [
      makeLog({ id: '1', sessionType: 'A' }),
      makeLog({ id: '2', sessionType: 'B' }),
      makeLog({ id: '3', sessionType: 'A' }),
    ]
    expect(getNextSessionType(logs)).toBe('B')
  })
})

describe('getSessionCountForStage', () => {
  it('returns 0 for empty logs', () => {
    expect(getSessionCountForStage([], 'stage1')).toBe(0)
  })

  it('counts only logs for specified stage', () => {
    const logs = [
      makeLog({ id: '1', stageId: 'stage1' }),
      makeLog({ id: '2', stageId: 'stage2' }),
      makeLog({ id: '3', stageId: 'stage1' }),
    ]
    expect(getSessionCountForStage(logs, 'stage1')).toBe(2)
    expect(getSessionCountForStage(logs, 'stage2')).toBe(1)
  })
})

describe('getSessionCountByType', () => {
  it('counts logs filtered by stage and session type', () => {
    const logs = [
      makeLog({ id: '1', stageId: 'stage1', sessionType: 'A' }),
      makeLog({ id: '2', stageId: 'stage1', sessionType: 'B' }),
      makeLog({ id: '3', stageId: 'stage1', sessionType: 'A' }),
      makeLog({ id: '4', stageId: 'stage2', sessionType: 'A' }),
    ]
    expect(getSessionCountByType(logs, 'stage1', 'A')).toBe(2)
    expect(getSessionCountByType(logs, 'stage1', 'B')).toBe(1)
    expect(getSessionCountByType(logs, 'stage2', 'A')).toBe(1)
  })
})

describe('getLastCompletedDate', () => {
  it('returns undefined for empty logs', () => {
    expect(getLastCompletedDate([])).toBeUndefined()
  })

  it('returns the last log date', () => {
    const logs = [
      makeLog({ id: '1', completedAt: '2026-03-18T10:00:00.000Z' }),
      makeLog({ id: '2', completedAt: '2026-03-20T10:00:00.000Z' }),
    ]
    expect(getLastCompletedDate(logs)).toBe('2026-03-20T10:00:00.000Z')
  })
})

describe('isCompletedToday', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns false for empty logs', () => {
    expect(isCompletedToday([])).toBe(false)
  })

  it('returns true when last log is today in JST', () => {
    vi.setSystemTime(new Date('2026-03-23T06:00:00.000Z'))
    const logs = [makeLog({ completedAt: '2026-03-23T03:00:00.000Z' })]
    expect(isCompletedToday(logs)).toBe(true)
  })

  it('returns false when last log is not today', () => {
    vi.setSystemTime(new Date('2026-03-23T06:00:00.000Z'))
    const logs = [makeLog({ completedAt: '2020-01-01T00:00:00.000Z' })]
    expect(isCompletedToday(logs)).toBe(false)
  })

  it('treats JST midnight as the day boundary (log from previous JST day)', () => {
    // Now: 2026-03-24 00:30 JST (= 2026-03-23 15:30 UTC)
    vi.setSystemTime(new Date('2026-03-23T15:30:00.000Z'))
    // Log: 2026-03-23 23:30 JST (= 2026-03-23 14:30 UTC) → JST March 23
    const logs = [makeLog({ completedAt: '2026-03-23T14:30:00.000Z' })]
    expect(isCompletedToday(logs)).toBe(false)
  })

  it('treats same JST day correctly across UTC day boundary', () => {
    // Now: 2026-03-23 23:30 JST (= 2026-03-23 14:30 UTC)
    vi.setSystemTime(new Date('2026-03-23T14:30:00.000Z'))
    // Log: 2026-03-23 00:30 JST (= 2026-03-22 15:30 UTC) → same JST day
    const logs = [makeLog({ completedAt: '2026-03-22T15:30:00.000Z' })]
    expect(isCompletedToday(logs)).toBe(true)
  })
})

describe('getRecentLogs', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-03-23T06:00:00.000Z'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns empty for empty logs', () => {
    expect(getRecentLogs([], 14)).toEqual([])
  })

  it('filters logs within specified days', () => {
    const logs = [
      makeLog({ id: '1', completedAt: '2026-02-20T06:00:00.000Z' }),
      makeLog({ id: '2', completedAt: '2026-03-20T06:00:00.000Z' }),
      makeLog({ id: '3', completedAt: '2026-03-23T06:00:00.000Z' }),
    ]
    const result = getRecentLogs(logs, 14)
    expect(result).toHaveLength(2)
  })
})
