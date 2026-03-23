import { z } from 'zod'

const stageIdSchema = z.enum(['stage1', 'stage2', 'stage3'])

const sessionTypeSchema = z.enum(['A', 'B'])

export const sessionLogSchema = z.object({
  id: z.string().min(1),
  completedAt: z.string().datetime(),
  stageId: stageIdSchema,
  sessionType: sessionTypeSchema,
  completedExerciseIds: z.array(z.string()),
  painReported: z.boolean(),
  notes: z.string().optional(),
})

export const progressStateSchema = z.object({
  currentStage: stageIdSchema,
  onboardingCompleted: z.boolean(),
  logs: z.array(sessionLogSchema),
  preferredSessionRotation: sessionTypeSchema,
  showSafetyReminder: z.boolean(),
  displayName: z.string(),
})

export type ValidatedProgressState = z.infer<typeof progressStateSchema>

export function validateProgressState(data: unknown): ValidatedProgressState | null {
  const result = progressStateSchema.safeParse(data)
  if (result.success) {
    return result.data
  }
  console.error('ProgressState validation failed:', result.error.format())
  return null
}
