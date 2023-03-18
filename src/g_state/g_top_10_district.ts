import { ModelTop10District } from './../model/top_10_district';
import { hookstate } from '@hookstate/core';
export const gTop10District = hookstate<ModelTop10District[]>([])