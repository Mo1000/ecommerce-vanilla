import {CategoryItem} from "@/classes/category/categoryItem.ts";
import {CategoryModel} from "@/models/category.model.ts";

export class CategoriesList {
    private _categoryList: CategoryModel[]

    constructor(categoryList:CategoryModel[]) {
        this._categoryList = categoryList;
    }

    appendTo(parent:HTMLElement) {
        this._categoryList.forEach((categoryData, index) => {
            const categoryItem = new CategoryItem(categoryData);
            categoryItem.category.id = `category-${index}`;
            parent.appendChild(categoryItem.category);
        });
    }
}
