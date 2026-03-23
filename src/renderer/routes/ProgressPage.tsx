import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import { StageBadge } from '../components/StageBadge'
import { ProgressSummary } from '../components/ProgressSummary'
import { getRecentLogs } from '../features/training/rotationLogic'
import { evaluateProgression } from '../features/training/progressionLogic'
import { formatDate } from '../utils/date'

export function ProgressPage(): React.JSX.Element {
  const navigate = useNavigate()
  const currentStage = useAppStore((s) => s.currentStage)
  const logs = useAppStore((s) => s.logs)

  const recentLogs = getRecentLogs(logs, 14)
  const progression = evaluateProgression(currentStage, logs)

  return (
    <div className="mx-auto max-w-md space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">進捗</h1>
        <StageBadge stageId={currentStage} />
      </div>

      <ProgressSummary logs={logs} currentStage={currentStage} />

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">
          進行条件の達成状況
        </h3>
        <ul className="mt-3 space-y-2">
          {progression.conditions.map((cond, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span
                className={cond.met ? 'text-emerald-500' : 'text-stone-300'}
                aria-hidden="true"
              >
                {cond.met ? '✓' : '○'}
              </span>
              <span
                className={
                  cond.met ? 'text-stone-700' : 'text-stone-500'
                }
              >
                {cond.label}
              </span>
            </li>
          ))}
        </ul>
        {progression.canAdvance ? (
          <button
            onClick={() => { void navigate('/stage') }}
            className="mt-4 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            type="button"
          >
            段階判定を確認する
          </button>
        ) : null}
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">
          最近14日の履歴
        </h3>
        {recentLogs.length === 0 ? (
          <p className="mt-3 text-sm text-stone-400">
            まだ記録がありません
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {[...recentLogs].reverse().map((log) => (
              <li
                key={log.id}
                className="flex items-center justify-between rounded-lg bg-stone-50 px-3 py-2 text-sm"
              >
                <span className="text-stone-700">
                  {formatDate(log.completedAt)}
                </span>
                <span className="text-stone-500">
                  Session {log.sessionType}
                </span>
                {log.painReported ? (
                  <span className="text-xs text-amber-500" title="痛みの報告あり">
                    ⚠️
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-center text-sm text-stone-400">
        累計 {logs.length} セッション完了
      </div>
    </div>
  )
}
