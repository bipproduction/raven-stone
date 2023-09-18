
export interface ModelEmotionalViewViaProvince {
    no: number
    id: number
    name: string
    value: number
    emotion: ModelEmotion
    total: number
}

export interface ModelEmotion {
    trust: number
    anger: number
    anticipation: number
    disgust: number
    fear: number
    joy: number
    sadness: number
    surprise: number
}
