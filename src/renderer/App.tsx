import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAppStore } from './stores/appStore'
import { AppShell } from './components/AppShell'
import { HomePage } from './routes/HomePage'
import { TrainingPage } from './routes/TrainingPage'
import { ProgressPage } from './routes/ProgressPage'
import { StagePage } from './routes/StagePage'
import { SettingsPage } from './routes/SettingsPage'
import { OnboardingPage } from './routes/OnboardingPage'

export function App(): React.JSX.Element {
  const [ready, setReady] = useState(false)
  const onboardingCompleted = useAppStore((s) => s.onboardingCompleted)
  const initialize = useAppStore((s) => s.initialize)

  useEffect(() => {
    void initialize().then(() => {
      setReady(true)
    })
  }, [initialize])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-50">
        <p className="text-stone-400">読み込み中...</p>
      </div>
    )
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route
            path="/"
            element={
              onboardingCompleted ? (
                <HomePage />
              ) : (
                <Navigate to="/onboarding" replace />
              )
            }
          />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/stage" element={<StagePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>
    </HashRouter>
  )
}
