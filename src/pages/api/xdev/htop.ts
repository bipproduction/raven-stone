import { spawn } from 'child_process';
import { NextApiRequest, NextApiResponse } from 'next';

export function streamHandler(req: NextApiRequest, res: NextApiResponse) {
    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
        'X-Content-Type-Options': 'nosniff',
    });

    const htopProcess = spawn('htop', ['--no-color']);

    htopProcess.stdout.pipe(res);

    htopProcess.on('close', (code) => {
        res.end();
    });

    htopProcess.stdout.on("data", (data) => {
        res.write(data);
    })

    req.on('close', () => {
        htopProcess.kill();
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        streamHandler(req, res);
    } else {
        res.status(405).end();
    }
}