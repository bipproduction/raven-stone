export interface ModelEmotionalViewViaProvinceCity {
    city: string
    provinceId: number
    provinceName: string
    value: number
    emotion: ModelEmotion
    total: number
  }
  
  export interface ModelEmotion {
    anger: number
    anticipation: number
    disgust: number
    fear: number
    joy: number
    sadness: number
    surprise: number
    trust: number
  }