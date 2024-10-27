import { z } from 'zod'

export const loginStartSessionFormSchema = z.object({
  email: z.string().email(),
})

export type LoginStartSessionForm = z.infer<typeof loginStartSessionFormSchema>
