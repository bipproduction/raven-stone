import { atomWithStorage } from "jotai/utils";
import { atom } from 'jotai'
import moment from "moment";

export const mc_list_candidate = atomWithStorage<any[]>("mc_list_candidate", []);
export const mc_selected_candidate = atomWithStorage("mc_selected_candidate", "1");

export const mc_batas_atas = atomWithStorage("mc_batas_atas", 1000);
export const mc_batas_bawah = atomWithStorage("mc_batas_bawah", 500);

export const mc_selected_tool = atomWithStorage("mc_selected_tool", "1");

export const mc_list_hasil_random_data = atom<any[] | undefined>(undefined);

export const mc_selected_candidate_random = atom("1");
export const mc_selected_date_random = atom(moment().format("YYYY-MM-DD"));