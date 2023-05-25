import { api } from "@/lib/api"

export async function global_fun_load_list_province({
    provinceId
}: {
    provinceId: number
}) {
    const data = await fetch(api.apiGlobalApiListProvinceGet + `?provinceId=${provinceId}`).then(v => v.json())
    return data
}