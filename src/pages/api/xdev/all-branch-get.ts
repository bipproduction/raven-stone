import { NextApiRequest, NextApiResponse } from "next";
import { execSync, spawn } from 'child_process'


export default function allBranchNameGet(req: NextApiRequest, res: NextApiResponse) {

    const allBranchName: any = {
        remote_branch: [],
        local_branch: [],
        current_branch: execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
    };

    const branches = execSync('git branch -a | sed \'s/^[* ] //\'').toString().split('\n').filter(Boolean);

    branches.forEach((branch: any) => {
        if (branch.startsWith('* ')) {
            branch = branch.slice(2);
            allBranchName.current_branch = branch;
        }
        else if (branch.startsWith('remotes/')) {
            branch = branch.replace('remotes/', '');
            allBranchName.remote_branch.push(branch);
        } else {
            allBranchName.local_branch.push(branch);
        }
    });

    const htopProcess = spawn('htop');
    let output = '';

    htopProcess.stdout.on('data', (data) => {
        output += data;
    });

    htopProcess.on('close', (code) => {
        res.end(`<pre>${output}</pre>`);
    });

    res.status(200).json(allBranchName)
}