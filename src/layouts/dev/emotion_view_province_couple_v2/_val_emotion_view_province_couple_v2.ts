import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const _val_list_emotion_view_province_couple = atom<any[] | undefined>(undefined);
export const _val_selected_candidate1 = atom(1)
export const _val_selected_candidate2 = atom(2)
export const _val_list_candidate = atomWithStorage<any[]>(__filename, []);