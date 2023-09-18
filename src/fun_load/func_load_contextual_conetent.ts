import { sContextualContent } from './../s_state/s_contextual_content';
import { api } from "@/lib/api";

export const funcloadContextualContent = () => fetch(api.apiPredictiveAiContsextualContentGet).then(v => v.json()).then((v) => (sContextualContent.value = v))