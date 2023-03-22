

import { gListKabupaten, gSelectedCandidate, gSelectedDate } from '../g_state/g_map_state';
export const funLoadMapData = async () => {
    const resNamaKabupaten = await fetch(
      `/api/get-data-by-candidate?candidateId=${gSelectedCandidate.value}&date=${gSelectedDate.value}`
    );

    if (resNamaKabupaten.status != 200) return console.log("error get nama kabupaten");
    const dataNamaKabupaten = await resNamaKabupaten.json();

    gListKabupaten.set(dataNamaKabupaten);
  };