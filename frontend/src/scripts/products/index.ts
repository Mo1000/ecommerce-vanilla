import '@/scripts/nav/index.ts'
import '@/scripts/footer/index.ts'
import {CardList} from "@/classes/card/CardList.ts";
import {Signal, signal} from "@preact/signals-core";
import {createElement} from "@/functions/dom.ts";
import {ProductModel} from "@/models/product.model.ts";
import {ProductService} from "@/services/product.service.ts";
import {transformEnumJsToEnumJava} from "@/utils";


function retrieveUrlParams(key: string) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key)

    return decodeURIComponent(value || "")
}

function render(products: ProductModel[], sectionParam: string) {

    const currentSectionLink = document.getElementById("current-section-link") as HTMLAnchorElement

    const currentSectionValue = sectionParam.charAt(0).toUpperCase() + sectionParam.slice(1)
    currentSectionLink.innerText = currentSectionValue

    const bigTitleContainer = document.getElementById("big-title-container") as HTMLElement

    const titleElement = bigTitleContainer.querySelector("h1") as HTMLElement
    titleElement.innerText = currentSectionValue

    const paragraphElement = bigTitleContainer.querySelector("p") as HTMLElement
    paragraphElement.innerText = "Checkout out the latest release of Basic Tees, new and improved with four openings!"


    const productsList = new CardList(products);
    const sectionProducts = document.getElementById("products-List") as HTMLElement;
    productsList.appendTo(sectionProducts)


}

// Function to check if all entries in the object are not empty
function areAllEntriesNotEmpty(obj: any) {
    // Iterate over each property in the object
    for (const key in obj) {
        // Check if the property value is an array and if it is not empty
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            return false; // If any array is empty, return false
        }
    }
    return true; // If all arrays are not empty, return true
}

// Function to check if at least one entry in the object is not empty
function isAtLeastOneEntryNotEmpty(obj: any) {
    // Iterate over each property in the object
    for (const key in obj) {
        // Check if the property value is an array and if it is not empty
        if (Array.isArray(obj[key]) && obj[key].length > 0) {
            return true; // If any array is not empty, return true
        }
    }
    return false; // If all arrays are empty, return false
}


type FilterDataModel = {
    colors: string[]
    sizes: string[]

}

function updateFilterData(filterElement: HTMLFormElement, filterData: Signal<FilterDataModel>, key: string) {
    const filterOptions = filterElement.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>
    filterOptions.forEach((input) => {
        input.addEventListener("change", () => {
            if (!input.checked) {
                filterData.value = {
                    ...filterData.value,
                    // @ts-ignore
                    [key]: filterData.value[key].filter((data) => data !== input.value)
                }
            } else {
                // @ts-ignore
                filterData.value = {...filterData.value, [key]: [...filterData.value[key], input.value]}

            }
        })
    });
    return filterData.value
}

function handleFilter(data: ProductModel[]) {
    const filterData = signal<FilterDataModel>(
        {
            colors: [],
            sizes: []
        }
    )
    const filterColor = document.getElementById("color-filter") as HTMLFormElement;
    filterData.value = updateFilterData(filterColor, filterData, "colors")

    const filterSize = document.getElementById("size-filter") as HTMLFormElement;
    filterData.value = updateFilterData(filterSize, filterData, "sizes")


    filterData.subscribe(value => {
        const sectionProducts = document.getElementById("products-List") as HTMLElement;
        const dataFiltered = data.filter((product) => {
            return value.colors.some((color) => product.colorList?.includes(color)) || value.sizes.some((size) => product.sizeList?.includes(size))
        })

    

        if (dataFiltered.length === 0 && isAtLeastOneEntryNotEmpty(value)) {
            const elementNotFound = createElement("div", {
                id: "not-found-products",
                class: "h-[50vh] w-full"
            })

            elementNotFound.className = "h-[50vh] w-full  flex justify-center items-center"
            elementNotFound.innerHTML = `<h1 class="text-center">No products found</h1>`

            sectionProducts.before(elementNotFound)
            sectionProducts.classList.add("hidden")
            return
        }

        document.getElementById("not-found-products")?.remove()
        sectionProducts.classList.remove("hidden")


        const filteredProducts = isAtLeastOneEntryNotEmpty(value) ? dataFiltered : data
        const productsList = new CardList(filteredProducts);

        sectionProducts.innerHTML = ""
        productsList.appendTo(sectionProducts)
    })
}

const sectionParam = retrieveUrlParams("section") || "All Products"
const productsFetch = await ProductService.getProductsBySections([
    transformEnumJsToEnumJava(sectionParam)
])
const products = productsFetch.data

render(products, sectionParam)
handleFilter(products)


