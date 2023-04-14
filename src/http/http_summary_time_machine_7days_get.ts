import { api } from "@/lib/api";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";

export const httpSummaryTimeMachine7DayGet = () => fetch(api.apiSummarySummaryTimeMachineGet7Day + `?candidateId=${sSelectedCandidate.value}`)