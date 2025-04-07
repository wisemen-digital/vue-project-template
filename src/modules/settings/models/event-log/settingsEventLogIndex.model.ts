export interface SettingsEventLogIndex {
  uuid: string
  createdAt: Date
  content: unknown
  message: string
  topic: string
  type: string
}
