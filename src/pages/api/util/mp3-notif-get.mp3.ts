import { execSync } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs'
import path from 'path';
const notifMp3get = async (re: NextApiRequest, res: NextApiResponse) => {
    const mp3 = fs.readFileSync(path.join(__dirname, '../../../../../public/notif.mp3'))
    res.setHeader('Content-Type', 'audio/mpeg')
    res.setHeader('Content-Length', mp3.length)
    res.status(200).send(mp3)
}

export default notifMp3get