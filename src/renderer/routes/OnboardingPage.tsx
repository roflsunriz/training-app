import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../stores/appStore'

export function OnboardingPage(): React.JSX.Element {
  const navigate = useNavigate()
  const completeOnboarding = useAppStore((s) => s.completeOnboarding)

  const handleStart = (): void => {
    void completeOnboarding().then(() => {
      void navigate('/')
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-6">
      <div className="w-full max-w-md space-y-6 text-center">
        <h1 className="text-3xl font-bold text-stone-800">
          腹筋トレーニング
        </h1>
        <p className="text-stone-600">
          腹筋が弱くて何から始めればいいかわからない——
          <br />
          そんなあなたのためのアプリです。
        </p>

        <div className="space-y-4 text-left">
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-stone-800">
              このアプリでできること
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-stone-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500" aria-hidden="true">✓</span>
                <span>最小負荷から無理なく始められるメニュー</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500" aria-hidden="true">✓</span>
                <span>1回10〜15分で完了する短時間プログラム</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500" aria-hidden="true">✓</span>
                <span>段階的にステップアップできる3段階構成</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500" aria-hidden="true">✓</span>
                <span>進捗を記録して成果を可視化</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4" role="alert">
            <p className="text-sm font-medium text-amber-800">ご注意ください</p>
            <ul className="mt-1 space-y-1 text-sm text-amber-700">
              <li>このアプリは医療用途ではありません</li>
              <li>痛みを感じたらすぐに中止してください</li>
              <li>腰に不安がある方は医師にご相談ください</li>
            </ul>
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full rounded-xl bg-emerald-500 px-6 py-4 text-lg font-semibold text-white shadow-md transition-colors hover:bg-emerald-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
          type="button"
        >
          はじめる
        </button>
      </div>
    </div>
  )
}
