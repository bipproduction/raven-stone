export interface ModelEmotionProvince {
    no: number
    id: number
    name: string
    value: number
    total: number
    emotion: Emotion
  }
  
  export interface Emotion {
    trust: number
    joy: number
    surprise: number
    anticipation: number
    sadness: number
    fear: number
    anger: number
    disgust: number
  }