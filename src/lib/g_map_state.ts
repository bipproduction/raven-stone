import { hookstate } from '@hookstate/core'
import { DateValue } from '@mantine/dates'
import moment from 'moment'
export const glistCandidate = hookstate<any[]>([])
export const gSelectedCandidate = hookstate<string>("1")
export const gSelectedDate = hookstate<string>("2023-03-15")
export const gListKabupaten = hookstate<any[]>([])
