import {createElement} from "@/functions/dom.ts";
import {CategoryModel} from "@/models/category.model.ts";

export class CategoryItem {
    private _categoryData: CategoryModel

    constructor(categoryData: CategoryModel) {
        this._categoryData = categoryData
        this._render()
    }

    private _category: HTMLElement = createElement("button",{
        class:"ring-1 ring-[rgba(0,0,0,0.3)]  rounded w-[170px] h-[145px] flex flex-col justify-center items-center hover:bg-red-500 hover:text-white"
    })

    get category(): HTMLElement {
        return this._category;
    }

    private _render() {
     this._category.appendChild(createElement("img",{
         src:this._categoryData.img,
         alt:`category ${this._categoryData.title}`,
         class:"w-12 h-14"
     } ))
     this._category.appendChild(createElement("span",{
         class:"mt-5 font-light"
     }, this._categoryData.title))
    };
}
