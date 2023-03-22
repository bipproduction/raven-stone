import { gTop10DistrictCount } from '@/g_state/top_10_district/g_top_10_district_take';
import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { api } from "@/lib/api";
import _ from 'lodash';

export const funcLoadTop10District = () => fetch(api.apiSummaryGetTop10DistrictByConversation)
    .then((v) => v.json())
    .then((v) => {
        gTop10District.set(v);
        gTop10DistrictCount.set(_.take(v, 10));
    });