import { sSelectedDate } from './../s_state/s_selectedDate';
import { sSelectedCandidate } from './../s_state/s_selected_candidate';
import { sTop10DistrictCount } from './../s_state/s_top_10_district_count';
// import { gSelectedCandidate } from '@/g_state/g_map_state';
// import { gSelectedEmotion } from './../g_state/g_selected_emotion';
// import { gTop10DistrictCount } from '@/g_state/top_10_district/g_top_10_district_take';
// import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { api } from "@/lib/api";
import _ from 'lodash';
// import { gSelectedDate } from '@/g_state/g_map_state';
import { sTop10District } from '@/s_state/s_top_10_district';
import { sSelectedEmotion } from '@/s_state/s_selected_emotion';

export const funcLoadTop10District = () => fetch(api.apiSummaryGetTop10DistrictByConversation + `?date=${sSelectedDate.value}&emotion=${sSelectedEmotion.value}&candidateId=${sSelectedCandidate.value}`)
    .then(async (v) => {
        if (v.status == 200) {
            const data = await v.json()
            // gTop10District.set(data);
            // gTop10DistrictCount.set(_.take(data, 10));
            sTop10District.value = _.take(data, 10)
            sTop10DistrictCount.value = _.take(data, 10)
        }
    });