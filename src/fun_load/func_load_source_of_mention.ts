import { gListSourceOfMention } from "@/g_state/g_source_of_mention";
import { api } from "@/lib/api";

export const funcLoadSourceOfmention = () => fetch(api.apiSummaryGetSourceOfMention)
    .then((v) => v.json())
    .then(gListSourceOfMention.set);