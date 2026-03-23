import type { SessionLog, SessionType, StageId, TrainingSession } from '../../../types/domain'
import { toJstDateString } from '../../utils/date'
import { getSessionForStage } from './trainingData'

export function getNextSessionType(logs: readonly SessionLog[]): SessionType {
  if (logs.length === 0) return 'A'
  const lastLog = logs[logs.length - 1]
  return lastLog?.sessionType === 'A' ? 'B' : 'A'
}

export function getTodaySession(
  stageId: StageId,
  logs: readonly SessionLog[],
): TrainingSession | undefined {
  const nextType = getNextSessionType(logs)
  return getSessionForStage(stageId, nextType)
}

export function getSessionCountForStage(
  logs: readonly SessionLog[],
  stageId: StageId,
): number {
  return logs.filter((log) => log.stageId === stageId).length
}

export function getSessionCountByType(
  logs: readonly SessionLog[],
  stageId: StageId,
  sessionType: SessionType,
): number {
  return logs.filter(
    (log) => log.stageId === stageId && log.sessionType === sessionType,
  ).length
}

export function getLastCompletedDate(
  logs: readonly SessionLog[],
): string | undefined {
  if (logs.length === 0) return undefined
  return logs[logs.length - 1]?.completedAt
}

export function isCompletedToday(logs: readonly SessionLog[]): boolean {
  if (logs.length === 0) return false
  const lastLog = logs[logs.length - 1]
  if (!lastLog) return false
  const today = toJstDateString()
  return toJstDateString(new Date(lastLog.completedAt)) === today
}

export function getRecentLogs(
  logs: readonly SessionLog[],
  days: number,
): readonly SessionLog[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString()
  return logs.filter((log) => log.completedAt >= cutoffStr)
}
