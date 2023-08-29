import { useShallowEffect } from "@mantine/hooks"
import { useState } from "react"

export default function Trs({ children, text, lang }: { children?: any, text: string | any[], lang: string }) {
    const [textNya, setTextNya] = useState("")
    useShallowEffect(() => {
        load()
    })

    async function load() {
        fetch('/api/trs', {
            method: "POST",
            body: JSON.stringify({
                text: text,
                from: lang === "id" ? "en" : "id",
                to: lang
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (res) => {
            if (res.status == 201) {
                const hasil = await res.json()
                return setTextNya(hasil.trans)
            }
            console.log("error translate my_main")
        })
    }

    return (<>
        <div>
            {children(textNya)}
        </div>
    </>)
}