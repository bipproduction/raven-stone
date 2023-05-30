import { atom } from "jotai";
import moment from "moment";

export const v3_selected_date = atom(moment().format("YYYY-MM-DD"))