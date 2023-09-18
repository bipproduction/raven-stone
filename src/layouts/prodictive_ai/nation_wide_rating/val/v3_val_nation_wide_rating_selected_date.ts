import { atom } from "jotai";
import moment from "moment";

export const v3_val_nation_wide_rating_selected_date = atom({
    start: moment().subtract(1, "weeks").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD")
})