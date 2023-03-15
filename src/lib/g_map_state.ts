import { hookstate } from '@hookstate/core'
export const glistCandidate = hookstate<any[]>([])
export const gSelectedCandidate = hookstate<string>("1")