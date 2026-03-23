import { useEffect, useRef } from 'react'
import type { Exercise } from '../../types/domain'
import { formatPrescription } from '../utils/format'

interface ExerciseDetailModalProps {
  readonly exercise: Exercise | null
  readonly onClose: () => void
}

export function ExerciseDetailModal({
  exercise,
  onClose,
}: ExerciseDetailModalProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (exercise && !dialog.open) {
      dialog.showModal()
    } else if (!exercise && dialog.open) {
      dialog.close()
    }
  }, [exercise])

  if (!exercise) return null

  return (
    <dialog
      ref={dialogRef}
      className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-xl border border-stone-200 bg-white p-0 shadow-xl backdrop:bg-black/40"
      onClose={onClose}
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-800">{exercise.name}</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600"
            aria-label="閉じる"
            type="button"
          >
            ✕
          </button>
        </div>

        <p className="mt-2 text-sm text-stone-600">{exercise.description}</p>

        <div className="mt-4 rounded-lg bg-stone-50 p-3">
          <span className="text-sm font-medium text-stone-700">目標: </span>
          <span className="text-sm text-stone-600">
            {formatPrescription(exercise.prescription)}
          </span>
        </div>

        <section className="mt-4">
          <h3 className="text-sm font-semibold text-stone-700">目的</h3>
          <p className="mt-1 text-sm text-stone-600">{exercise.purpose}</p>
        </section>

        <section className="mt-4">
          <h3 className="text-sm font-semibold text-stone-700">手順</h3>
          <ol className="mt-1 list-inside list-decimal space-y-1 text-sm text-stone-600">
            {exercise.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        {exercise.commonMistakes.length > 0 ? (
          <section className="mt-4">
            <h3 className="text-sm font-semibold text-stone-700">
              よくある失敗
            </h3>
            <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-stone-600">
              {exercise.commonMistakes.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {exercise.regression ? (
          <section className="mt-4">
            <h3 className="text-sm font-semibold text-stone-700">
              軽減版のやり方
            </h3>
            <p className="mt-1 text-sm text-stone-600">{exercise.regression}</p>
          </section>
        ) : null}

        {exercise.progression ? (
          <section className="mt-4">
            <h3 className="text-sm font-semibold text-stone-700">
              次の段階へのつながり
            </h3>
            <p className="mt-1 text-sm text-stone-600">
              {exercise.progression}
            </p>
          </section>
        ) : null}

        {exercise.warnings.length > 0 ? (
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm font-medium text-amber-800">⚠️ 注意</p>
            <ul className="mt-1 list-inside list-disc text-sm text-amber-700">
              {exercise.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50"
          type="button"
        >
          閉じる
        </button>
      </div>
    </dialog>
  )
}
