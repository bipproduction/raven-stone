export interface ModelContextualContent {
    id: number
    data: ModelData
}

export interface ModelData {
    title: string
    emotion: ModelEmotion[]
    audiences: number
}

export interface ModelEmotion {
    name: string
    value: number
    cluster: ModelCluster[]
}

export interface ModelCluster {
    data: ModelDaum[]
    name: string
}

export interface ModelDaum {
    name: string
    value: number
}