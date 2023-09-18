import { api } from "@/lib/api"
import { NextApiRequest, NextApiResponse } from "next"


const get = async ({ contentId }: { contentId: string }) => await fetch(api.apiMapControllMapControllTimeContentGet + `?contentId=${contentId}`)

const getByDateAndCandidateId = ({ date, candidateId }: { date: string, candidateId: string }) => fetch(api.apiDevDevTimeMachineGet + `?date=${date}&candidateId=${candidateId}`)

const post = async (body: string) => fetch(api.apiDevDevTimeMachinePost, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: body
})

export const httpDevTimeMachine = { get, post, getByDateAndCandidateId }