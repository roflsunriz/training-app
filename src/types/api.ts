import type { ProgressState } from './domain'

export type UpdateStatus =
  | { readonly type: 'checking' }
  | { readonly type: 'available' }
  | { readonly type: 'not-available' }
  | { readonly type: 'downloading'; readonly percent: number }
  | { readonly type: 'downloaded' }
  | { readonly type: 'error' }

export interface AppApi {
  readonly getAppVersion: () => Promise<string>
  readonly loadState: () => Promise<ProgressState | null>
  readonly saveState: (state: ProgressState) => Promise<void>
  readonly checkForUpdates: () => Promise<void>
  readonly onUpdateStatus: (callback: (status: UpdateStatus) => void) => () => void
}

declare global {
  interface Window {
    readonly api: AppApi
  }
}
