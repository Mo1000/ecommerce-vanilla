import {BaseModel} from "@/models/base.model.ts";

export interface ProductModel extends BaseModel{
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
    sizeList?: string[]
    [key: string]: any
}
