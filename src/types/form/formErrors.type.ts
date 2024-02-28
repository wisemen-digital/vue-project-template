import type { z } from 'zod'

export type FormErrors = z.ZodFormattedError<string> | null | undefined
