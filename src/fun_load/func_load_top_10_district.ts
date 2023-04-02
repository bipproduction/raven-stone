import { gSelectedCandidate } from '@/g_state/g_map_state';
import { gSelectedEmotion } from './../g_state/g_selected_emotion';
import { gTop10DistrictCount } from '@/g_state/top_10_district/g_top_10_district_take';
import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { api } from "@/lib/api";
import _ from 'lodash';
import { gSelectedDate } from '@/g_state/g_map_state';

export const funcLoadTop10District = () => fetch(api.apiSummaryGetTop10DistrictByConversation + `?date=${gSelectedDate.value}&emotion=${gSelectedEmotion.value}&candidateId=${gSelectedCandidate.value}`)
    .then(async(v) => {
        if (v.status == 200) {
            const data = await v.json()
            gTop10District.set(data);
            gTop10DistrictCount.set(_.take(data, 10));
        }
    });