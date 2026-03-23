import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import { StageBadge } from '../components/StageBadge'
import { SessionCard } from '../components/SessionCard'
import { SafetyAlert } from '../components/SafetyAlert'
import { getTodaySession, isCompletedToday, getLastCompletedDate, getSessionCountForStage } from '../features/training/rotationLogic'
import { evaluateProgression } from '../features/training/progressionLogic'
import { formatDate } from '../utils/date'

export function HomePage(): React.JSX.Element {
  const navigate = useNavigate()
  const currentStage = useAppStore((s) => s.currentStage)
  const logs = useAppStore((s) => s.logs)
  const showSafetyReminder = useAppStore((s) => s.showSafetyReminder)
  const toggleSafetyReminder = useAppStore((s) => s.toggleSafetyReminder)
  const displayName = useAppStore((s) => s.displayName)

  const completedToday = isCompletedToday(logs)
  const session = getTodaySession(currentStage, logs)
  const lastDate = getLastCompletedDate(logs)
  const stageCount = getSessionCountForStage(logs, currentStage)
  const progression = evaluateProgression(currentStage, logs)

  return (
    <div className="mx-auto max-w-md space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            {displayName ? `${displayName} さん` : 'こんにちは'}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            {completedToday ? '今日のトレーニングは完了です！' : '今日も頑張りましょう'}
          </p>
        </div>
        <StageBadge stageId={currentStage} />
      </div>

      {showSafetyReminder ? (
        <SafetyAlert onDismiss={() => void toggleSafetyReminder(false)} />
      ) : null}

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border border-stone-200 bg-white p-3">
          <p className="text-xl font-bold text-stone-800">{logs.length}</p>
          <p className="text-xs text-stone-500">累計実施</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-3">
          <p className="text-xl font-bold text-stone-800">{stageCount}</p>
          <p className="text-xs text-stone-500">今の段階</p>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-3">
          <p className="text-sm font-medium text-stone-800">
            {lastDate ? formatDate(lastDate) : '—'}
          </p>
          <p className="text-xs text-stone-500">前回実施</p>
        </div>
      </div>

      {progression.canAdvance ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            🎉 次の段階へ進めます！
          </p>
          <button
            onClick={() => { void navigate('/stage') }}
            className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-700"
            type="button"
          >
            段階判定を確認する →
          </button>
        </div>
      ) : null}

      {completedToday ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center">
          <p className="text-lg font-semibold text-emerald-700">
            お疲れさまでした！
          </p>
          <p className="mt-1 text-sm text-emerald-600">
            次回のセッションもお楽しみに
          </p>
        </div>
      ) : session ? (
        <SessionCard
          session={session}
          onStart={() => { void navigate('/training') }}
        />
      ) : null}

      <button
        onClick={() => { void navigate('/progress') }}
        className="w-full rounded-lg border border-stone-300 px-4 py-3 text-sm text-stone-600 transition-colors hover:bg-stone-100"
        type="button"
      >
        進捗を見る
      </button>
    </div>
  )
}
