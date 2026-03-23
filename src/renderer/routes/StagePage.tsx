import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'
import { StageBadge } from '../components/StageBadge'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { evaluateProgression } from '../features/training/progressionLogic'
import { getStageName, getStageDescription } from '../utils/format'
import { useState } from 'react'
import type { StageId } from '../../types/domain'

const ALL_STAGES: readonly StageId[] = ['stage1', 'stage2', 'stage3']

export function StagePage(): React.JSX.Element {
  const navigate = useNavigate()
  const currentStage = useAppStore((s) => s.currentStage)
  const logs = useAppStore((s) => s.logs)
  const changeStage = useAppStore((s) => s.changeStage)

  const progression = evaluateProgression(currentStage, logs)
  const [confirmTarget, setConfirmTarget] = useState<StageId | null>(null)

  const handleChangeStage = (stage: StageId): void => {
    if (stage === currentStage) return
    setConfirmTarget(stage)
  }

  const doChangeStage = (): void => {
    if (!confirmTarget) return
    void changeStage(confirmTarget).then(() => {
      setConfirmTarget(null)
      void navigate('/')
    })
  }

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold text-stone-800">段階判定</h1>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500">現在の段階:</span>
          <StageBadge stageId={currentStage} />
        </div>
        <p className="mt-2 text-sm text-stone-600">
          {getStageDescription(currentStage)}
        </p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">判定結果</h3>
        {progression.canAdvance && progression.nextStage ? (
          <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-medium text-emerald-800">
              🎉 {getStageName(progression.nextStage)} へ進める条件を満たしています
            </p>
            <button
              onClick={() => {
                if (progression.nextStage) {
                  handleChangeStage(progression.nextStage)
                }
              }}
              className="mt-3 w-full rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
              type="button"
            >
              次の段階へ進む
            </button>
          </div>
        ) : (
          <p className="mt-3 text-sm text-stone-500">
            {currentStage === 'stage3'
              ? '現在最終段階です。このまま継続しましょう。'
              : 'まだ次の段階への条件を満たしていません。'}
          </p>
        )}

        <h4 className="mt-4 text-sm font-medium text-stone-600">条件一覧</h4>
        <ul className="mt-2 space-y-2">
          {progression.conditions.map((cond, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span
                className={cond.met ? 'text-emerald-500' : 'text-stone-300'}
                aria-hidden="true"
              >
                {cond.met ? '✓' : '○'}
              </span>
              <span
                className={cond.met ? 'text-stone-700' : 'text-stone-500'}
              >
                {cond.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">
          手動で段階を変更する
        </h3>
        <p className="mt-1 text-xs text-stone-400">
          必要に応じて段階を戻すこともできます
        </p>
        <div className="mt-3 space-y-2">
          {ALL_STAGES.map((stage) => (
            <button
              key={stage}
              onClick={() => { handleChangeStage(stage) }}
              disabled={stage === currentStage}
              className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                stage === currentStage
                  ? 'border-emerald-200 bg-emerald-50 font-medium text-emerald-700'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              type="button"
            >
              <span className="font-medium">{getStageName(stage)}</span>
              <br />
              <span className="text-xs text-stone-400">
                {getStageDescription(stage)}
              </span>
              {stage === currentStage ? (
                <span className="ml-2 text-xs text-emerald-500">（現在）</span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <ConfirmDialog
        open={confirmTarget !== null}
        title="段階を変更しますか？"
        message={
          confirmTarget
            ? `${getStageName(confirmTarget)} に変更します。次回のメニュー内容が変わります。`
            : ''
        }
        confirmLabel="変更する"
        onConfirm={doChangeStage}
        onCancel={() => { setConfirmTarget(null) }}
      />
    </div>
  )
}
