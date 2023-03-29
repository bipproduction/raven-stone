import { api } from "@/lib/api";

export const funcSendnotification = (body: any) => fetch(api.apiUtilNotificationPost, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
}).then(v => v.status == 201)