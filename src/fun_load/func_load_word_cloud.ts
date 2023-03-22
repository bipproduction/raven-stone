
import { gLiistWordCloud } from '@/g_state/g_word_cloud';
import { api } from '@/lib/api';
export const funcLoadWordCloud = () => fetch(api.apiSummaryGetWordCloud)
    .then((v) => v.json())
    .then(gLiistWordCloud.set);