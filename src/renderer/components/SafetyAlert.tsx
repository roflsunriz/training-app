interface SafetyAlertProps {
  readonly onDismiss?: () => void
}

export function SafetyAlert({ onDismiss }: SafetyAlertProps): React.JSX.Element {
  return (
    <div
      className="rounded-lg border border-amber-200 bg-amber-50 p-4"
      role="alert"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-lg" aria-hidden="true">
          ⚠️
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-amber-800">安全に関する注意</p>
          <ul className="mt-1 space-y-1 text-sm text-amber-700">
            <li>痛みを感じた場合はすぐに中止してください</li>
            <li>このアプリは医療用途ではありません</li>
            <li>腰に不安がある方は医師にご相談ください</li>
          </ul>
        </div>
        {onDismiss ? (
          <button
            onClick={onDismiss}
            className="text-amber-600 hover:text-amber-800"
            aria-label="閉じる"
            type="button"
          >
            ✕
          </button>
        ) : null}
      </div>
    </div>
  )
}
