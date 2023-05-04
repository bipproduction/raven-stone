import { NextApiRequest, NextApiResponse } from "next";
import { execSync } from 'child_process'


async function allBranch() {
    const allBranchName: any = [];
    const stdout = execSync('git branch -a | sed \'s/^[* ] //\'');
    const branches = stdout.toString().split('\n').filter(Boolean);

    branches.forEach(branch => {
        if (branch.indexOf('remotes/') !== -1) {
            branch = branch.replace('remotes/', '');
        }
        allBranchName.push(branch);
    });
}

export default function xdev(req: NextApiRequest, res: NextApiResponse) {

    res.status(200).json(allBranch())
}