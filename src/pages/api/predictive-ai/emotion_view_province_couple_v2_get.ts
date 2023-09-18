import { _api_handler_emotion_couple_get } from "@/layouts/prodictive_ai/emotion_couple/api/api_handler_emotion_couple_get";
import client from "@/lib/prisma_db";
import 'colors'
import _ from "lodash";

export default async function handler(req: any, res: any) {
    return _api_handler_emotion_couple_get(req, res)
}