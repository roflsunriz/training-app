import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import { ExerciseCard } from '../components/ExerciseCard'
import { ExerciseDetailModal } from '../components/ExerciseDetailModal'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { SafetyAlert } from '../components/SafetyAlert'
import { getTodaySession } from '../features/training/rotationLogic'
import { generateId, toISOString } from '../utils/date'
import type { Exercise, SessionLog } from '../../types/domain'

export function TrainingPage(): React.JSX.Element {
  const navigate = useNavigate()
  const currentStage = useAppStore((s) => s.currentStage)
  const logs = useAppStore((s) => s.logs)
  const completeSession = useAppStore((s) => s.completeSession)
  const showSafetyReminder = useAppStore((s) => s.showSafetyReminder)

  const session = getTodaySession(currentStage, logs)
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set())
  const [painReported, setPainReported] = useState(false)
  const [notes, setNotes] = useState('')
  const [detailExercise, setDetailExercise] = useState<Exercise | null>(null)
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false)

  const toggleCheck = useCallback((exerciseId: string) => {
    setCheckedIds((prev) => {
      const next = new Set(prev)
      if (next.has(exerciseId)) {
        next.delete(exerciseId)
      } else {
        next.add(exerciseId)
      }
      return next
    })
  }, [])

  const doComplete = useCallback(async () => {
    if (!session) return
    const trimmedNotes = notes.trim()
    const log: SessionLog = {
      id: generateId(),
      completedAt: toISOString(),
      stageId: session.stageId,
      sessionType: session.sessionType,
      completedExerciseIds: [...checkedIds],
      painReported,
      ...(trimmedNotes ? { notes: trimmedNotes } : {}),
    }
    await completeSession(log)
    void navigate('/')
  }, [session, checkedIds, painReported, notes, completeSession, navigate])

  const handleComplete = useCallback(() => {
    if (!session) return
    const allChecked = session.exercises.every((ex) => checkedIds.has(ex.id))
    if (!allChecked) {
      setShowIncompleteWarning(true)
      return
    }
    void doComplete()
  }, [session, checkedIds, doComplete])

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-8 text-center">
        <p className="text-stone-500">セッションが見つかりません</p>
        <button
          onClick={() => { void navigate('/') }}
          className="mt-4 text-sm text-emerald-600 hover:text-emerald-700"
          type="button"
        >
          ホームに戻る
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div>
        <h1 className="text-xl font-bold text-stone-800">{session.title}</h1>
        <p className="text-sm text-stone-500">
          目安: 約{session.estimatedMinutes}分
        </p>
      </div>

      {showSafetyReminder ? <SafetyAlert /> : null}

      <div className="space-y-3">
        {session.exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            checked={checkedIds.has(exercise.id)}
            onToggle={() => { toggleCheck(exercise.id) }}
            onShowDetail={() => { setDetailExercise(exercise) }}
          />
        ))}
      </div>

      <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={painReported}
            onChange={(e) => { setPainReported(e.target.checked) }}
            className="size-5 rounded border-stone-300 text-amber-500 focus:ring-amber-400"
          />
          <span className="text-sm text-stone-600">
            実施中に痛みや違和感があった
          </span>
        </label>

        <div>
          <label htmlFor="session-notes" className="text-sm text-stone-500">
            メモ（任意）
          </label>
          <textarea
            id="session-notes"
            value={notes}
            onChange={(e) => { setNotes(e.target.value) }}
            className="mt-1 w-full rounded-lg border border-stone-300 p-2 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            rows={2}
            placeholder="気づいたことがあれば記録できます"
          />
        </div>
      </div>

      <button
        onClick={handleComplete}
        className="w-full rounded-xl bg-emerald-500 px-4 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
        type="button"
      >
        セッションを完了する
      </button>

      <ExerciseDetailModal
        exercise={detailExercise}
        onClose={() => { setDetailExercise(null) }}
      />

      <ConfirmDialog
        open={showIncompleteWarning}
        title="未完了の種目があります"
        message="すべての種目にチェックが入っていませんが、セッションを完了しますか？"
        confirmLabel="完了する"
        cancelLabel="戻る"
        onConfirm={() => {
          setShowIncompleteWarning(false)
          void doComplete()
        }}
        onCancel={() => { setShowIncompleteWarning(false) }}
      />
    </div>
  )
}
