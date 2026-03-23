import { app } from 'electron'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import type { ProgressState } from '../types/domain'

function getStoragePath(): string {
  return join(app.getPath('userData'), 'progress.json')
}

export async function loadState(): Promise<ProgressState | null> {
  try {
    const filePath = getStoragePath()
    const raw = await readFile(filePath, 'utf-8')
    return JSON.parse(raw) as ProgressState
  } catch {
    return null
  }
}

export async function saveState(state: ProgressState): Promise<void> {
  const filePath = getStoragePath()
  const dir = dirname(filePath)
  await mkdir(dir, { recursive: true })
  await writeFile(filePath, JSON.stringify(state, null, 2), 'utf-8')
}
