import { api } from "@/lib/api";

export async function _func_candidate_get({ setListCandidate }: { setListCandidate: any }) {
    fetch(api.apiGetCandidate).then(async (v) => {
        if (v.status == 200) {
            const data: any[] = await v.json();
            setListCandidate(data);
        }
    });
}