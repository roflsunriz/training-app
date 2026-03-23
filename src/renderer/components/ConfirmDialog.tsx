import { useEffect, useRef } from 'react'

interface ConfirmDialogProps {
  readonly open: boolean
  readonly title: string
  readonly message: string
  readonly confirmLabel?: string
  readonly cancelLabel?: string
  readonly onConfirm: () => void
  readonly onCancel: () => void
  readonly variant?: 'default' | 'danger'
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = '確認',
  cancelLabel = 'キャンセル',
  onConfirm,
  onCancel,
  variant = 'default',
}: ConfirmDialogProps): React.JSX.Element | null {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  if (!open) return null

  const confirmClass =
    variant === 'danger'
      ? 'bg-red-500 hover:bg-red-600 text-white'
      : 'bg-emerald-500 hover:bg-emerald-600 text-white'

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-auto max-w-md rounded-xl border border-stone-200 bg-white p-0 shadow-xl backdrop:bg-black/40"
      onClose={onCancel}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
        <p className="mt-2 text-sm text-stone-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50"
            type="button"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${confirmClass}`}
            type="button"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  )
}
