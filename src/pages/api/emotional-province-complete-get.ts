import { _api_handler_emotion_couple_get } from '@/layouts/prodictive_ai/emotion_couple/api/api_handler_emotion_couple_get';
import { api_emotional_province_complete_get } from '@/layouts/prodictive_ai/emotion_view_province/api/api_emotional_province_complete_get';
import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const emotionalProvinceCompleteGet = async (req: NextApiRequest, res: NextApiResponse) => {
    return api_emotional_province_complete_get(req, res)
}

export default emotionalProvinceCompleteGet