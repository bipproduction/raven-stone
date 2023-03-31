import client from "@/lib/prisma_db"
import _ from "lodash"


const main = () => {
    const emotion_candidate_1: any = {
        anger: 3,
        anticipation: 4,
        disgust: 9,
        fear: 2,
        joy: 20,
        sadness: 2,
        trust: 49,
        surprise: 11
      }
      
      const emotion_candidate_2: any = {
        anger: 10,
        anticipation: 9,
        disgust: 4,
        fear: 7,
        joy: 40,
        sadness: 20,
        trust: 7,
        surprise: 20
      }
      
      const potensi_candidate_1: any = { president: 90, vice_president: 30 }
      const potensi_candidate_2: any = { president: 40, vice_president: 60 }
      
      // Gabungkan kedua kandidat menjadi satu objek baru
      const combined_emotions = { ...emotion_candidate_1, ...emotion_candidate_2 };
      
      // Hitung total nilai emosi untuk kandidat 1 dan kandidat 2
      const total_emotion_candidate_1:any = Object.values(emotion_candidate_1).reduce((a, b) => Number(a) + Number(b), 0);
      const total_emotion_candidate_2: any = Object.values(emotion_candidate_2).reduce((a, b) => Number(a) + Number(b), 0);
      
      // Hitung presentasi nilai emosi untuk kandidat 1 dan kandidat 2
      const percentage_emotion_candidate_1: any = Object.keys(emotion_candidate_1).reduce((acc: any, key) => {
        acc[key] = Math.round((emotion_candidate_1[key] / total_emotion_candidate_1) * potensi_candidate_1.president);
        return acc;
      }, {});
      
      const percentage_emotion_candidate_2 = Object.keys(emotion_candidate_2).reduce((acc: any, key) => {
        acc[key] = Math.round((emotion_candidate_2[key] / total_emotion_candidate_2) * potensi_candidate_2.president);
        return acc;
      }, {});
      
      // Gabungkan presentasi nilai emosi kedua kandidat menjadi satu objek baru
      const combined_percentage_emotions: any = { ...percentage_emotion_candidate_1, ...percentage_emotion_candidate_2 };
      
      // Hitung total presentasi nilai emosi untuk kedua kandidat
      const total_percentage_emotion: any = Object.values(combined_percentage_emotions).reduce((a, b) => Number(a) + Number(b), 0);
      
      // Hitung presentasi nilai untuk setiap emosi dalam objek baru
      const hasil_emotion_candidate1_dan_candidate2 = Object.keys(combined_percentage_emotions).reduce((acc: any, key) => {
        acc[key] = Math.round((combined_percentage_emotions[key] / total_percentage_emotion) * 100);
        return acc;
      }, {});
      
      console.log(hasil_emotion_candidate1_dan_candidate2);
      
}

main()



export { }