import { api } from "@/lib/api";
import { sCandidateValue } from "@/s_state/s_candidate_value";

export const funcLoadCandidateValue = () => fetch(api.apiCandidateCandidateValueGet).then(v => v.json()).then(v => (sCandidateValue.value = v))