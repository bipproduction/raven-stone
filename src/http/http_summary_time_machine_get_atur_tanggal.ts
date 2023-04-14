import { api } from "@/lib/api";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";

export const httpSummaryTimeMachineAturTanggalGet = ({ date1, date2 }: { date1: string, date2: string }) => fetch(api.apiSummarySummaryTimeMachineGetAturTanggal + `?candidateId=${sSelectedCandidate.value}&date1=${date1}&date2=${date2}`)