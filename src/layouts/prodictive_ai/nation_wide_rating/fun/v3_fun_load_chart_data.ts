import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";
import toast from "react-simple-toasts";

export async function v3_fun_load_chart_data({ selectedCandidate, start, end, setDataChart }: { selectedCandidate: any, start: string; end: string, setDataChart: any }) {
    fetch(
        api.apiV3NationWideRatingChartDataGet +
        `?candidate1Id=${selectedCandidate.candidate1Id}&candidate2Id=${selectedCandidate.candidate2Id}&start=${start}&end=${end}`
    ).then(async (res) => {
        if (res.status != 200) {
            return toast("empty data");
        }

        const data = await res.json();
        setDataChart(data);
    });
}
