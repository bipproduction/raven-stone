import { hookstate } from '@hookstate/core';
export const gUser = hookstate<{ [key: string]: any } | undefined>(undefined)