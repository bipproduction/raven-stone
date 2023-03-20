
import { ModelNationWideRating } from '@/model/nation_wide_rating';
import { hookstate } from '@hookstate/core';
export const gNationWideRating = hookstate<ModelNationWideRating[]>([])