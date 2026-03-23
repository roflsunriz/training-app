export type StageId = 'stage1' | 'stage2' | 'stage3'

export type SessionType = 'A' | 'B'

export interface ExercisePrescription {
  readonly reps?: number
  readonly seconds?: number
  readonly sets?: number
  readonly perSide?: boolean
  readonly rangeText?: string
}

export interface Exercise {
  readonly id: string
  readonly name: string
  readonly description: string
  readonly purpose: string
  readonly steps: readonly string[]
  readonly tips: readonly string[]
  readonly warnings: readonly string[]
  readonly commonMistakes: readonly string[]
  readonly regression?: string
  readonly progression?: string
  readonly prescription: ExercisePrescription
}

export interface TrainingSession {
  readonly id: string
  readonly stageId: StageId
  readonly sessionType: SessionType
  readonly title: string
  readonly estimatedMinutes: number
  readonly exercises: readonly Exercise[]
}

export interface SessionLog {
  readonly id: string
  readonly completedAt: string
  readonly stageId: StageId
  readonly sessionType: SessionType
  readonly completedExerciseIds: readonly string[]
  readonly painReported: boolean
  readonly notes?: string
}

export interface ProgressState {
  readonly currentStage: StageId
  readonly onboardingCompleted: boolean
  readonly logs: readonly SessionLog[]
  readonly preferredSessionRotation: SessionType
  readonly showSafetyReminder: boolean
  readonly displayName: string
}
