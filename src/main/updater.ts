import { autoUpdater } from 'electron-updater'
import type { BrowserWindow } from 'electron'

export function initUpdater(mainWindow: BrowserWindow): void {
  if (process.env['DISABLE_UPDATER'] === 'true') {
    return
  }

  autoUpdater.autoDownload = false
  autoUpdater.autoInstallOnAppQuit = true

  function sendStatus(message: string): void {
    mainWindow.webContents.send('update-status', message)
  }

  autoUpdater.on('checking-for-update', () => {
    sendStatus('更新を確認中...')
  })

  autoUpdater.on('update-available', () => {
    sendStatus('新しいバージョンがあります。ダウンロードを開始します...')
    void autoUpdater.downloadUpdate()
  })

  autoUpdater.on('update-not-available', () => {
    sendStatus('最新バージョンです')
  })

  autoUpdater.on('download-progress', (progress) => {
    sendStatus(`ダウンロード中: ${String(Math.round(progress.percent))}%`)
  })

  autoUpdater.on('update-downloaded', () => {
    sendStatus('更新のダウンロードが完了しました。再起動すると適用されます。')
  })

  autoUpdater.on('error', () => {
    sendStatus('更新の確認に失敗しました')
  })
}

export function checkForUpdates(): void {
  if (process.env['DISABLE_UPDATER'] === 'true') {
    return
  }
  void autoUpdater.checkForUpdates()
}
