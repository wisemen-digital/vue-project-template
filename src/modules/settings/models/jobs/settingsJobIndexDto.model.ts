import type {
  JobStatus,
  QueueName,
} from '@/client'

export interface SettingsJobIndex {
  id: string
  completedAt: Date | null
  createdAt: Date | null
  name: string
  queueName: QueueName
  status: JobStatus
}
