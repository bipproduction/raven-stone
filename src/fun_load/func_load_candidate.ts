import { sCandidate } from './../s_state/s_candidate';
// import { gCandidate } from '@/g_state/g_candidate';
import { api } from '@/lib/api';
export const funcLoadCandidate = () => fetch(api.apiUtilGetCandidate)
    .then((v) => v.json())
    .then(v => {
        sCandidate.value = v
        
    });