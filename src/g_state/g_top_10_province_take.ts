
import { ModelTop10Province } from '@/model/top_10_province';
import { hookstate } from '@hookstate/core';
export const gTop10ProvinceTake = hookstate<ModelTop10Province[]>([])