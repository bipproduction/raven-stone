import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const _isVerficationCode = atom(false)
export const _isCodeOtp = atom(0);
export const _isDataUser = atom(<any>{})
export const _isMaxTimeOut = atomWithStorage<any>("_time", undefined);