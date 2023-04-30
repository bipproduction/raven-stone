interface EmotionObject {
    [key: string]: number;
}

interface ScoreObject {
    president: number;
    vice_president: number;
}

function calculateNewEmotionPercentage(
    candidate1: EmotionObject,
    score1: ScoreObject,
    candidate2: EmotionObject,
    score2: ScoreObject
): EmotionObject {
    const totalScore = score1.president + score2.vice_president;
    const result: EmotionObject = {};
    let totalPercentage = 0;
    for (const emotion in candidate1) {
        const percentage =
            ((candidate1[emotion] * score1.president) / totalScore +
                (candidate2[emotion] * score2.vice_president) / totalScore) /
            2;
        // Bulatkan setiap nilai persentase menjadi 2 angka di belakang koma
        result[emotion] = Number(percentage == null ? 0 : percentage.toFixed(2));
        totalPercentage += result[emotion];
    }
    // Sesuaikan nilai persentase agar jumlah semua emosi menjadi 100%
    if (totalPercentage !== 100) {
        const factor = 100 / totalPercentage;
        for (const emotion in result) {
            result[emotion] *= factor;
            // Bulatkan setiap nilai persentase yang telah disesuaikan menjadi 2 angka di belakang koma
            result[emotion] = Number(result[emotion] == null ? 0 : result[emotion].toFixed(2));
        }
    }
    return result;
}

const emotion_percentage_candidate_1_as_president = calculateNewEmotionPercentage(
    {
        "anger": 45,
        "anticipation": 30,
        "disgust": 132,
        "fear": 2,
        "joy": 70,
        "sadness": 124,
        "surprise": 976,
        "trust": 1510
    },
    {
        president: 90,
        vice_president: 10
    },
    {
        "anger": 450,
        "anticipation": 77,
        "disgust": 1324,
        "fear": 245,
        "joy": 70,
        "sadness": 124,
        "surprise": 197,
        "trust": 1510
    },
    {
        president: 30,
        vice_president: 70
    }
);

const emotion_percentage_candidate_2_as_president = calculateNewEmotionPercentage(
    {
        "anger": 450,
        "anticipation": 77,
        "disgust": 1324,
        "fear": 245,
        "joy": 70,
        "sadness": 124,
        "surprise": 197,
        "trust": 1510
    },
    {
        president: 30,
        vice_president: 70
    },
    {
        "anger": 45,
        "anticipation": 30,
        "disgust": 132,
        "fear": 2,
        "joy": 70,
        "sadness": 124,
        "surprise": 976,
        "trust": 1510
    },
    {
        president: 90,
        vice_president: 10
    }
);

console.log(emotion_percentage_candidate_1_as_president);
console.log(emotion_percentage_candidate_2_as_president);


export { }