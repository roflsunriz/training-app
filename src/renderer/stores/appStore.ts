import { create } from 'zustand'
import type { StageId, SessionType, SessionLog, ProgressState } from '../../types/domain'

interface AppActions {
  readonly initialize: () => Promise<void>
  readonly completeSession: (log: SessionLog) => Promise<void>
  readonly changeStage: (stage: StageId) => Promise<void>
  readonly completeOnboarding: () => Promise<void>
  readonly setDisplayName: (name: string) => Promise<void>
  readonly toggleSafetyReminder: (show: boolean) => Promise<void>
  readonly resetData: () => Promise<void>
}

type AppState = ProgressState & AppActions

const DEFAULT_STATE: ProgressState = {
  currentStage: 'stage1',
  onboardingCompleted: false,
  logs: [],
  preferredSessionRotation: 'A',
  showSafetyReminder: true,
  displayName: '',
}

const PROGRESS_KEYS: readonly (keyof ProgressState)[] = [
  'currentStage',
  'onboardingCompleted',
  'logs',
  'preferredSessionRotation',
  'showSafetyReminder',
  'displayName',
] as const

function extractProgress(state: AppState): ProgressState {
  return {
    currentStage: state.currentStage,
    onboardingCompleted: state.onboardingCompleted,
    logs: state.logs,
    preferredSessionRotation: state.preferredSessionRotation,
    showSafetyReminder: state.showSafetyReminder,
    displayName: state.displayName,
  }
}

async function persistState(state: AppState): Promise<void> {
  await window.api.saveState(extractProgress(state))
}

function getNextRotation(logs: readonly SessionLog[]): SessionType {
  if (logs.length === 0) return 'A'
  const lastLog = logs[logs.length - 1]
  return lastLog?.sessionType === 'A' ? 'B' : 'A'
}

export const useAppStore = create<AppState>()((set, get) => ({
  ...DEFAULT_STATE,

  initialize: async () => {
    const saved = await window.api.loadState()
    if (saved) {
      set(saved)
    }
  },

  completeSession: async (log: SessionLog) => {
    const newLogs = [...get().logs, log]
    const nextRotation = getNextRotation(newLogs)
    set({ logs: newLogs, preferredSessionRotation: nextRotation })
    await persistState(get())
  },

  changeStage: async (stage: StageId) => {
    set({ currentStage: stage })
    await persistState(get())
  },

  completeOnboarding: async () => {
    set({ onboardingCompleted: true })
    await persistState(get())
  },

  setDisplayName: async (name: string) => {
    set({ displayName: name })
    await persistState(get())
  },

  toggleSafetyReminder: async (show: boolean) => {
    set({ showSafetyReminder: show })
    await persistState(get())
  },

  resetData: async () => {
    set(DEFAULT_STATE)
    await window.api.saveState(DEFAULT_STATE)
  },
}))
