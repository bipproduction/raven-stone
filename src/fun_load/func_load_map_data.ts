import { sSelectedDate } from '@/s_state/s_selectedDate';
import { sSelectedCandidate } from '@/s_state/s_selected_candidate';
import { sListKabupaten } from './../s_state/s_list_kabupaten';

export const funLoadMapData = async () => {
  const resNamaKabupaten = await fetch(
    `/api/get-data-by-candidate?candidateId=${sSelectedCandidate.value}&date=${sSelectedDate.value}`
  );

  if (resNamaKabupaten.status != 200) return console.log("error get nama kabupaten");
  const dataNamaKabupaten = await resNamaKabupaten.json();

  // sListKabupaten.set(dataNamaKabupaten);
  sListKabupaten.value = dataNamaKabupaten
};