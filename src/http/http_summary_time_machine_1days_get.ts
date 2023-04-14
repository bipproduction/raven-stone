import { api } from "@/lib/api";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";

export const httpSummaryTimeMachine1DayGet = () => fetch(api.apiSummarySummaryTimeMachineGetDay + `?candidateId=${sSelectedCandidate.value}`)