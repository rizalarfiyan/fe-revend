import { SelectValue } from '@/@types'

export type HistoryResponse = {
  id: string
  success: number
  failed: number
  user: HistoryUserResponse
  device: HistoryDeviceResponse
  date: string
}

export interface HistoryDeviceResponse {
  id: string
  name: string
}

export interface HistoryUserResponse {
  id: string
  first_name: string
  last_name: string
}

export interface FilterHistory {
  user: SelectValue | null
  device: SelectValue | null
  status: SelectValue | null
}
