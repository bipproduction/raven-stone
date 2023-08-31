import client from "@/lib/prisma_db"
import _ from "lodash"



const main = () => {
    const kandidat_1: any = {
        anger: 30,
        anticipation: 4,
        disgust: 99,
        fear: 2,
        joy: 90,
        sadness: 23,
        trust: 49,
        surprise: 1
      };
      
      const potensi_kandidat_1: any = { 
        presiden: 90, 
        wakil_presiden: 30 
      };
      
      const kandidat_2: any = {
        anger: 100,
        anticipation: 90,
        disgust: 400,
        fear: 79,
        joy: 40,
        sadness: 20,
        trust: 72,
        surprise: 2
      };
      
      const potensi_kandidat_2: any = { 
        presiden: 40, 
        wakil_presiden: 60 
      };
      
      // Calculate the total sum of emotions for each candidate
      const total_emotions_kandidat_1: any = Object.values(kandidat_1).reduce((acc, val) => Number(acc) + Number(val));
      const total_emotions_kandidat_2: any = Object.values(kandidat_2).reduce((acc, val) => Number(acc) + Number(val));
      
      // Create a new object to store the combined values with proportional adjustments
      const combinedObject: any = {};
      
      // Loop through each emotion item and calculate the proportional adjustment
      for (let emotion in kandidat_1) {
        const adjustedValue: any = ((kandidat_1[emotion] / total_emotions_kandidat_1) * potensi_kandidat_1.presiden) + ((kandidat_2[emotion] / total_emotions_kandidat_2) * potensi_kandidat_2.presiden);
        combinedObject[emotion] = adjustedValue;
      }
      
      // Calculate the total sum of emotions in the combined object
      const total_emotions_combined: any = Object.values(combinedObject).reduce((acc, val) => Number(acc) + Number(val));
      
      // Check if the total sum of emotions is not equal to 100, and adjust the values accordingly
      if (total_emotions_combined !== 100) {
        const adjustmentFactor = 100 / total_emotions_combined;
        for (let emotion in combinedObject) {
          combinedObject[emotion] *= adjustmentFactor;
        }
      }
      
      console.log(combinedObject);
}

main()



export { }