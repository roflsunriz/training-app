import type { Exercise } from '../../types/domain'
import { formatPrescription } from '../utils/format'
import { ExerciseIllustration } from './ExerciseIllustration'

interface ExerciseCardProps {
  readonly exercise: Exercise
  readonly checked: boolean
  readonly onToggle: () => void
  readonly onShowDetail: () => void
}

export function ExerciseCard({
  exercise,
  checked,
  onToggle,
  onShowDetail,
}: ExerciseCardProps): React.JSX.Element {
  return (
    <div
      className={`rounded-lg border p-4 transition-colors ${
        checked
          ? 'border-emerald-200 bg-emerald-50'
          : 'border-stone-200 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <label className="flex cursor-pointer items-center pt-0.5">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="size-5 rounded border-stone-300 text-emerald-500 focus:ring-emerald-400"
            aria-label={`${exercise.name} を完了にする`}
          />
        </label>
        <div className="shrink-0 pt-0.5">
          <ExerciseIllustration
            exerciseId={exercise.id}
            className={`h-10 w-16 ${checked ? 'text-emerald-400' : 'text-stone-300'}`}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4
              className={`font-medium ${
                checked ? 'text-emerald-700' : 'text-stone-800'
              }`}
            >
              {exercise.name}
            </h4>
            <button
              onClick={onShowDetail}
              className="text-xs text-stone-400 hover:text-stone-600"
              type="button"
              aria-label={`${exercise.name} の詳細を見る`}
            >
              詳細
            </button>
          </div>
          <p className="mt-1 text-sm text-stone-500">
            {formatPrescription(exercise.prescription)}
          </p>
          {exercise.tips[0] ? (
            <p className="mt-1 text-xs text-stone-400">
              💡 {exercise.tips[0]}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
