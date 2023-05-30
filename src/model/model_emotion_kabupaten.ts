export interface ModelEmotionKabupaten {
    trust: number
    joy: number
    surprise: number
    anticipation: number
    sadness: number
    fear: number
    anger: number
    disgust: number
    City: City
}

interface City {
    id: number
    name: string
    CityContextDirection: CityContextDirection[]
    CityLeaderPersonaPrediction: CityLeaderPersonaPrediction[]
    CityValue: CityValue[]
}

interface CityContextDirection {
    content: Content[]
}

interface Content {
    name: string
    value: number
}

interface CityLeaderPersonaPrediction {
    data: Data
}

interface Data {
    content: Content2[]
}

interface Content2 {
    title: string
    value: number
}

interface CityValue {
    value: number
}
