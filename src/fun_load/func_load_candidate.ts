import { gCandidate } from '@/g_state/g_candidate';
import { api } from '@/lib/api';
export const funcLoadCandidate = () => fetch(api.apiUtilGetCandidate)
    .then((v) => v.json())
    .then(gCandidate.set);