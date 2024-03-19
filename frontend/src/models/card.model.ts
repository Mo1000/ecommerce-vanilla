export interface CardDataModel {
    title: string
    finalPrice: number
    previousPrice?: number
    image: string
    reductionPrice?: number
    stars: {
        number: number
        total: number
    }
    colorList?: string[]
    [key: string]: any
}
