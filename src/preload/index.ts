import { contextBridge, ipcRenderer } from 'electron'
import type { ProgressState } from '../types/domain'
import type { AppApi } from '../types/api'

const api: AppApi = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version') as Promise<string>,

  loadState: () =>
    ipcRenderer.invoke('load-state') as Promise<ProgressState | null>,

  saveState: (state: ProgressState) =>
    ipcRenderer.invoke('save-state', state) as Promise<void>,

  checkForUpdates: () =>
    ipcRenderer.invoke('check-for-updates') as Promise<void>,

  onUpdateStatus: (callback: (message: string) => void) => {
    const handler = (_event: Electron.IpcRendererEvent, message: string): void => {
      callback(message)
    }
    ipcRenderer.on('update-status', handler)
    return () => {
      ipcRenderer.removeListener('update-status', handler)
    }
  },
}

contextBridge.exposeInMainWorld('api', api)
