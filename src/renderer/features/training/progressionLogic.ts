import type { SessionLog, StageId } from '../../../types/domain'
import { getSessionCountForStage } from './rotationLogic'

export interface ProgressionCondition {
  readonly label: string
  readonly met: boolean
}

export interface ProgressionResult {
  readonly canAdvance: boolean
  readonly conditions: readonly ProgressionCondition[]
  readonly nextStage: StageId | null
}

function hasNoPainReports(logs: readonly SessionLog[], stageId: StageId): boolean {
  return logs
    .filter((log) => log.stageId === stageId)
    .every((log) => !log.painReported)
}

export function evaluateStage1to2(logs: readonly SessionLog[]): ProgressionResult {
  const stageCount = getSessionCountForStage(logs, 'stage1')
  const noPain = hasNoPainReports(logs, 'stage1')

  const conditions: ProgressionCondition[] = [
    {
      label: 'お腹へこませキープ 10秒×5回相当を問題なく実施できる（自己申告）',
      met: stageCount >= 6,
    },
    {
      label: 'かかとスライド中に腰反りの自己申告がない',
      met: noPain,
    },
    {
      label: 'ブリッジ超軽量版 5回が苦痛なくできる（自己申告）',
      met: stageCount >= 6,
    },
    {
      label: 'Stage 1 のセッションを累計6回以上完了している',
      met: stageCount >= 6,
    },
  ]

  const canAdvance = conditions.every((c) => c.met)

  return {
    canAdvance,
    conditions,
    nextStage: canAdvance ? 'stage2' : null,
  }
}

export function evaluateStage2to3(logs: readonly SessionLog[]): ProgressionResult {
  const stageCount = getSessionCountForStage(logs, 'stage2')
  const noPain = hasNoPainReports(logs, 'stage2')

  const conditions: ProgressionCondition[] = [
    {
      label: '壁プランク 15秒×4回が実施できる（自己申告）',
      met: stageCount >= 6 && noPain,
    },
    {
      label: '四つ這い保持 10秒×5回が実施できる（自己申告）',
      met: stageCount >= 6 && noPain,
    },
    {
      label: 'Stage 2 のセッションを累計6回以上完了している',
      met: stageCount >= 6,
    },
  ]

  const canAdvance = conditions.every((c) => c.met)

  return {
    canAdvance,
    conditions,
    nextStage: canAdvance ? 'stage3' : null,
  }
}

export function evaluateProgression(
  currentStage: StageId,
  logs: readonly SessionLog[],
): ProgressionResult {
  switch (currentStage) {
    case 'stage1':
      return evaluateStage1to2(logs)
    case 'stage2':
      return evaluateStage2to3(logs)
    case 'stage3':
      return {
        canAdvance: false,
        conditions: [{ label: '最終段階です', met: true }],
        nextStage: null,
      }
    default: {
      const _exhaustive: never = currentStage
      return _exhaustive
    }
  }
}
