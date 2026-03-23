import type { TrainingSession } from '../../types/domain'
import { formatPrescription } from '../utils/format'

interface SessionCardProps {
  readonly session: TrainingSession
  readonly onStart: () => void
}

export function SessionCard({
  session,
  onStart,
}: SessionCardProps): React.JSX.Element {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-stone-800">
          {session.title}
        </h3>
        <span className="text-sm text-stone-500">
          約{session.estimatedMinutes}分
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {session.exercises.map((ex) => (
          <li
            key={ex.id}
            className="flex items-center justify-between text-sm text-stone-600"
          >
            <span>{ex.name}</span>
            <span className="text-stone-400">
              {formatPrescription(ex.prescription)}
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={onStart}
        className="mt-4 w-full rounded-lg bg-emerald-500 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        type="button"
      >
        このメニューを開始する
      </button>
    </div>
  )
}
