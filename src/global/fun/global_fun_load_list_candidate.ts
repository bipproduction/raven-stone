import { global_api_list_candidate_get } from '@/global/api/global_api_list_candidate_get';
import { api } from '@/lib/api';
export function gloobal_fun_load_list_candidate({ setListCandidate }: { setListCandidate: (v: any) => void }) {
    fetch(api.apiGlobalApiListCandidateGet).then(v => v.json()).then(setListCandidate)
}