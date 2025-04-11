import type {
  JobStatus,
  QueueName,
} from '@/client'

export interface SettingsJobsIndex {
  id: string
  completedAt: Date | null
  createdAt: Date | null
  jobName: string
  queueName: QueueName
  status: JobStatus
}
