import type { ProgressState } from './domain'

export interface AppApi {
  readonly getAppVersion: () => Promise<string>
  readonly loadState: () => Promise<ProgressState | null>
  readonly saveState: (state: ProgressState) => Promise<void>
  readonly checkForUpdates: () => Promise<void>
  readonly onUpdateStatus: (callback: (message: string) => void) => () => void
}

declare global {
  interface Window {
    readonly api: AppApi
  }
}
