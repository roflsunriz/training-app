import { useState, useEffect } from 'react'
import { useAppStore } from '../stores/appStore'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { toJstDateString } from '../utils/date'

export function SettingsPage(): React.JSX.Element {
  const displayName = useAppStore((s) => s.displayName)
  const showSafetyReminder = useAppStore((s) => s.showSafetyReminder)
  const logs = useAppStore((s) => s.logs)
  const setDisplayName = useAppStore((s) => s.setDisplayName)
  const toggleSafetyReminder = useAppStore((s) => s.toggleSafetyReminder)
  const resetData = useAppStore((s) => s.resetData)

  const [nameInput, setNameInput] = useState(displayName)
  const [appVersion, setAppVersion] = useState('')
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')

  useEffect(() => {
    void window.api.getAppVersion().then(setAppVersion)
  }, [])

  const handleNameSave = (): void => {
    void setDisplayName(nameInput.trim())
  }

  const handleExport = (): void => {
    const data = JSON.stringify({ logs }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ab-training-export-${toJstDateString()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleReset = (): void => {
    void resetData().then(() => {
      setShowResetDialog(false)
    })
  }

  const handleCheckUpdate = (): void => {
    setUpdateMessage('更新を確認中...')
    void window.api.checkForUpdates().catch(() => {
      setUpdateMessage('更新の確認に失敗しました')
    })
  }

  useEffect(() => {
    const unsubscribe = window.api.onUpdateStatus((message) => {
      setUpdateMessage(message)
    })
    return unsubscribe
  }, [])

  return (
    <div className="mx-auto max-w-md space-y-5">
      <h1 className="text-2xl font-bold text-stone-800">設定</h1>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">表示名</h3>
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => { setNameInput(e.target.value) }}
            className="flex-1 rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            placeholder="名前を入力"
          />
          <button
            onClick={handleNameSave}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            type="button"
          >
            保存
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">表示設定</h3>
        <label className="mt-3 flex items-center gap-3">
          <input
            type="checkbox"
            checked={showSafetyReminder}
            onChange={(e) => { void toggleSafetyReminder(e.target.checked) }}
            className="size-5 rounded border-stone-300 text-emerald-500 focus:ring-emerald-400"
          />
          <span className="text-sm text-stone-600">
            安全に関する注意を毎回表示する
          </span>
        </label>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">データ管理</h3>
        <div className="mt-3 space-y-2">
          <button
            onClick={handleExport}
            className="w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50"
            type="button"
          >
            データをエクスポート
          </button>
          <button
            onClick={() => { setShowResetDialog(true) }}
            className="w-full rounded-lg border border-red-200 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
            type="button"
          >
            データを初期化する
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5">
        <h3 className="text-sm font-semibold text-stone-700">アプリ情報</h3>
        <div className="mt-2 space-y-1 text-sm text-stone-500">
          <p>バージョン: {appVersion || '—'}</p>
          <p>累計セッション数: {logs.length}</p>
        </div>
        <button
          onClick={handleCheckUpdate}
          className="mt-3 w-full rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50"
          type="button"
        >
          アップデートを確認
        </button>
        {updateMessage ? (
          <p className="mt-2 text-sm text-sky-600">{updateMessage}</p>
        ) : null}
      </div>

      <ConfirmDialog
        open={showResetDialog}
        title="データを初期化しますか？"
        message="すべてのトレーニング記録と設定が削除されます。この操作は取り消せません。"
        confirmLabel="初期化する"
        cancelLabel="キャンセル"
        variant="danger"
        onConfirm={handleReset}
        onCancel={() => { setShowResetDialog(false) }}
      />
    </div>
  )
}
