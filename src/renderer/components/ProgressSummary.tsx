import type { SessionLog, StageId } from '../../types/domain'
import {
  getSessionCountForStage,
  getSessionCountByType,
} from '../features/training/rotationLogic'
import { getStageName } from '../utils/format'

interface ProgressSummaryProps {
  readonly logs: readonly SessionLog[]
  readonly currentStage: StageId
}

export function ProgressSummary({
  logs,
  currentStage,
}: ProgressSummaryProps): React.JSX.Element {
  const stageCount = getSessionCountForStage(logs, currentStage)
  const aCount = getSessionCountByType(logs, currentStage, 'A')
  const bCount = getSessionCountByType(logs, currentStage, 'B')

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-stone-700">
        {getStageName(currentStage)} の進捗
      </h3>
      <div className="mt-3 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-stone-800">{stageCount}</p>
          <p className="text-xs text-stone-500">累計セッション</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-sky-600">{aCount}</p>
          <p className="text-xs text-stone-500">Session A</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-amber-600">{bCount}</p>
          <p className="text-xs text-stone-500">Session B</p>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-stone-500">
          <span>進行条件まで</span>
          <span>{stageCount}/6 セッション</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${String(Math.min((stageCount / 6) * 100, 100))}%` }}
          />
        </div>
      </div>
    </div>
  )
}
