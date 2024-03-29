import {FormattedResponse} from "@/models/api-response.model.ts";
import {get, post} from "@/helpers/ky.helper.ts";
import {ProductModel} from "@/models/product.model.ts";

export abstract class ProductService {
  private static basePath: string = 'products';

  static async createProducts(
    event: Partial<ProductModel>,
  ): Promise<FormattedResponse<ProductModel>> {
    return await post<ProductModel>(`${this.basePath}`, event);
  }

  static async getProducts(): Promise<FormattedResponse<ProductModel[]>> {
    return await get<ProductModel[]>(`${this.basePath}`);
  }

  static async getProductsBySections(sections:string[],limit?:number): Promise<FormattedResponse<ProductModel[]>> {
    const sectionsParams=new URLSearchParams()
    sectionsParams.set("list",sections.join(","))

    if (limit) sectionsParams.set("limit",limit.toString())

    return await get<ProductModel[]>(`${this.basePath}/section?${sectionsParams.toString()}`);
  }

}
