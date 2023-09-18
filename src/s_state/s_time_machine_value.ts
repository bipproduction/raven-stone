import { signal } from "@preact/signals-react";
import moment from "moment";

export const sTimeMachineValue = signal({
    candidate: 1,
    date: moment("2023-03-16").format("YYYY-MM-DD"),
    time: Array.from(new Array(24), (x, i) => i + 1).map((v) => {
        return {
            value: v,
            label: `${v}:00`,
            isManual: false,
            sentiment: {
                positive: 0,
                negative: 0,
                neutral: 0
            }
        };
    })
})