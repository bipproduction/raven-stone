import { sSelectedDate } from '../s_state/s_selectedDate';
import { sSelectedCandidate } from '../s_state/s_selected_candidate';
import { sTop10ProvinceTake } from '../s_state/s_top_10_province_take';
// import { gSelectedCandidate } from '@/g_state/g_map_state';
// import { gTop10ProvinceTake } from '@/g_state/top_10_province/g_top_10_province_take';
// import { gTop10Province } from '../g_state/top_10_province/g_top_10_province';
import { api } from "@/lib/api";
import _ from 'lodash';
// import { gSelectedDate } from '@/g_state/g_map_state';
// import { gSelectedEmotion } from '@/g_state/g_selected_emotion';
import { sTop10Province } from '@/s_state/s_top_10_province';
import { sSelectedEmotion } from '@/s_state/s_selected_emotion';
import { sSearchDistrict } from '@/s_state/s_search_district';
import { sSearchProvince } from '@/s_state/s_search_province';

export const funcLoadTop10Province = () => fetch(
    api.apiSummaryGetTop10ProvinceByConversation + `?date=${sSelectedDate.value}&emotion=${sSelectedEmotion.value}&candidateId=${sSelectedCandidate.value}&search=${sSearchProvince.value}`
).then(async (res) => {
    if (res.status === 200) {
        const data = await res.json();
        sTop10Province.value = data
        sTop10ProvinceTake.value = _.take(data, 10)

    }
})