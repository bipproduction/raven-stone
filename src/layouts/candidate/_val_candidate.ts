import { atomWithStorage } from "jotai/utils";

export const _val_list_candidate = atomWithStorage<any[] | undefined>('_val_list_candidate', undefined);