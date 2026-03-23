import type { ExercisePrescription, StageId } from '../../types/domain'

export function formatPrescription(p: ExercisePrescription): string {
  if (p.rangeText) return p.rangeText

  const parts: string[] = []

  if (p.seconds !== undefined) {
    parts.push(`${String(p.seconds)}秒`)
  }
  if (p.reps !== undefined) {
    parts.push(`${String(p.reps)}回`)
  }
  if (p.perSide) {
    parts.push('（左右）')
  }
  if (p.sets !== undefined && p.sets > 1) {
    parts.push(`× ${String(p.sets)}セット`)
  }

  return parts.join(' ')
}

export function getStageName(stageId: StageId): string {
  switch (stageId) {
    case 'stage1':
      return 'Stage 1 — 導入期'
    case 'stage2':
      return 'Stage 2 — 基礎期'
    case 'stage3':
      return 'Stage 3 — 移行期'
    default: {
      const _exhaustive: never = stageId
      return _exhaustive
    }
  }
}

export function getStageDescription(stageId: StageId): string {
  switch (stageId) {
    case 'stage1':
      return '最小負荷から始めて体幹の基礎を作ります（1〜2週間）'
    case 'stage2':
      return '少しずつ負荷を上げて体幹を強化します（3〜4週間）'
    case 'stage3':
      return 'プランクやクランチの導入に移行します（5週間以降）'
    default: {
      const _exhaustive: never = stageId
      return _exhaustive
    }
  }
}
