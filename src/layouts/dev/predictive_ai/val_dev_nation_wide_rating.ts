import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const _val_listNation = atomWithStorage<any[] | undefined>("_val_listNation", undefined);