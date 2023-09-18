const kandidat_a: any = {
    "trust": 151567863,
    "anger": 28032220,
    "anticipation": 64306245,
    "disgust": 88202613,
    "fear": 36485325,
    "joy": 113108523,
    "sadness": 47805349,
    "surprise": 85178566
  }
  
  const kandidat_b: any = {
    "trust": 75035605,
    "anger": 13718203,
    "anticipation": 31493375,
    "disgust": 49655958,
    "fear": 17998034,
    "joy": 55102129,
    "sadness": 23111496,
    "surprise": 41228577
  }
  
  // Menghitung P(A U B)
  const keys = Object.keys(kandidat_a);
  const union: any = {};
  let totalUnion = 0;
  keys.forEach((key) => {
    union[key] = kandidat_a[key] + kandidat_b[key];
    totalUnion += union[key];
  });
  
  // Menghitung P(A ∩ B)
  const intersection:any = {};
  let totalIntersection = 0;
  keys.forEach((key) => {
    intersection[key] = Math.min(kandidat_a[key], kandidat_b[key]);
    totalIntersection += intersection[key];
  });
  
  // Menghitung hasil prosentase kemenangan
  const hasil_prosentase_penggabungan:any = {};
  keys.forEach((key) => {
    const pA = kandidat_a[key] / totalUnion;
    const pB = kandidat_b[key] / totalUnion;
    const pAB = intersection[key] / totalUnion;
    const pAU = pA + pB - pAB;
    hasil_prosentase_penggabungan[key] = Math.round((pA - pB) / pAU * 100);
  });
  
  console.log(hasil_prosentase_penggabungan);
  export {}