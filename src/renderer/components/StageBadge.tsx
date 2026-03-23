import type { StageId } from '../../types/domain'
import { getStageName } from '../utils/format'

interface StageBadgeProps {
  readonly stageId: StageId
}

const stageColors: Record<StageId, string> = {
  stage1: 'bg-sky-100 text-sky-700 border-sky-200',
  stage2: 'bg-amber-100 text-amber-700 border-amber-200',
  stage3: 'bg-emerald-100 text-emerald-700 border-emerald-200',
}

export function StageBadge({ stageId }: StageBadgeProps): React.JSX.Element {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-sm font-medium ${stageColors[stageId]}`}
    >
      {getStageName(stageId)}
    </span>
  )
}
