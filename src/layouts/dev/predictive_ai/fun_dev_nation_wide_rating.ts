import { api } from "@/lib/api";

export async function _fun_loadNationWideRating({
    setListNationWideRating,
}: {
    setListNationWideRating: any;
}) {
    fetch(api.apiDevDevNationWideRatingV2Get).then(async (v) => {
        if (v.status == 200) {
            const data: any[] = await v.json();
            setListNationWideRating(data);
        }
    });
}