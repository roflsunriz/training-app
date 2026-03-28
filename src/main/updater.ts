import { autoUpdater } from 'electron-updater'
import type { BrowserWindow } from 'electron'
import type { UpdateStatus } from '../types/api'

const AUTO_RESTART_DELAY_MS = 3000

export function initUpdater(mainWindow: BrowserWindow): void {
  if (process.env['DISABLE_UPDATER'] === 'true') {
    return
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  function sendStatus(status: UpdateStatus): void {
    mainWindow.webContents.send('update-status', status)
  }

  autoUpdater.on('checking-for-update', () => {
    sendStatus({ type: 'checking' })
  })

  autoUpdater.on('update-available', () => {
    sendStatus({ type: 'available' })
    void autoUpdater.downloadUpdate()
  })

  autoUpdater.on('update-not-available', () => {
    sendStatus({ type: 'not-available' })
  })

  autoUpdater.on('download-progress', (progress) => {
    sendStatus({ type: 'downloading', percent: Math.round(progress.percent) })
  })

  autoUpdater.on('update-downloaded', () => {
    sendStatus({ type: 'downloaded' })
    setTimeout(() => {
      autoUpdater.quitAndInstall(true, true)
    }, AUTO_RESTART_DELAY_MS)
  })

  autoUpdater.on('error', () => {
    sendStatus({ type: 'error' })
  })
}

export function checkForUpdates(): void {
  if (process.env['DISABLE_UPDATER'] === 'true') {
    return
  }
  void autoUpdater.checkForUpdates()
}
