import { api } from "@/lib/api";

/**
 * Loads emotional data for a specific candidate in a province's kabupaten.
 *
 * @param provinceId The ID of the province to get data from.
 * @param date The date for which to get data.
 * @param candidateId The ID of the candidate to get data for.
 * @param setListEmotionalKabupaten Optional callback function to set emotional data.
 * @returns A Promise that resolves to the emotional data for the given parameters.
 */
export async function funLoadEmotionKabupaten({
    provinceId,
    date,
    candidateId,
    setListEmotionalKabupaten,
}: {
    provinceId: number;
    date: string;
    candidateId: number;
    setListEmotionalKabupaten?: (data: any) => void;
}): Promise<any> {
    const data = await fetch(
        `${api.apiApiEmotionalProvinceKabupatenGet}?provinceId=${provinceId}&date=${date}&candidateId=${candidateId}`
    ).then((v) => v.json());
    if (setListEmotionalKabupaten) {
        setListEmotionalKabupaten(data);
    }
    return data;
}
