import { ModelNationWideRating } from '@/model/predictive_ai/nation_wide_rating';
import { signal } from '@preact/signals-react';
export const sNationWide = signal<ModelNationWideRating[]>([])