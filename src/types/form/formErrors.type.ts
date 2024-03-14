import type { z } from 'zod'

export type FormErrors = null | undefined | z.ZodFormattedError<string>
