import { api } from "@/lib/api";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";

export const httpSummaryTimeMachineGetSebulan = () => fetch(api.apiSummarySummaryTimeMachineGetSebulan + `?candidateId=${sSelectedCandidate.value}`)