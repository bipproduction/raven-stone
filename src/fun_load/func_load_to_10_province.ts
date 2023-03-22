import { gTop10ProvinceTake } from '@/g_state/top_10_province/g_top_10_province_take';
import { gTop10Province } from '../g_state/top_10_province/g_top_10_province';
import { api } from "@/lib/api";
import _ from 'lodash';

export const funcLoadTop10Province = () => fetch(
    api.apiSummaryGetTop10ProvinceByConversation + "?date=2023-03-16"
).then(async (res) => {
    if (res.status === 200) {
        const data = await res.json();
        gTop10Province.set(data);
        gTop10ProvinceTake.set(_.take(data, 10));
    }
})