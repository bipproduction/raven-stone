import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const val_selected_province_id = atomWithStorage<number | null>("val_selected_province_id",null)