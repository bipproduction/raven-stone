import { ModelCandidate } from './../model/candidate';
import { hookstate } from '@hookstate/core';
export const gCandidate = hookstate<ModelCandidate[]>([])