import '@/scripts/nav/index.ts'
import '@/scripts/footer/index.ts'
import {advertisingData} from "@/constants/data.ts";
import {CardList} from "@/classes/card/CardList.ts";
import {signal} from "@preact/signals-core";
import {createElement} from "@/functions/dom.ts";


function retrieveUrlParams(key: string) {
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get(key)

    return decodeURIComponent(value || "")
}

function render() {

    const currentSectionLink = document.getElementById("current-section-link") as HTMLAnchorElement
    let currentSectionValue = retrieveUrlParams("section") || "All Products"
    currentSectionValue = currentSectionValue.charAt(0).toUpperCase() + currentSectionValue.slice(1)
    currentSectionLink.innerText = currentSectionValue

    const bigTitleContainer = document.getElementById("big-title-container") as HTMLElement

    const titleElement = bigTitleContainer.querySelector("h1") as HTMLElement
    titleElement.innerText = currentSectionValue

    const paragraphElement = bigTitleContainer.querySelector("p") as HTMLElement
    paragraphElement.innerText = "Checkout out the latest release of Basic Tees, new and improved with four openings!"


    const productsList = new CardList(advertisingData);
    const sectionProducts = document.getElementById("products-List") as HTMLElement;
    productsList.appendTo(sectionProducts)

}

function handleFilter() {
    const colorFilterData = signal<string[]>([])
    const colorFilter = document.getElementById("color-filter") as HTMLFormElement;
    const colorFilterOptions = colorFilter.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>
    colorFilterOptions.forEach((input) => {
        input.addEventListener("change", () => {
            if (!input.checked) {
                colorFilterData.value = colorFilterData.value.filter((color) => color !== input.value)
            } else {
                colorFilterData.value = [...colorFilterData.value, input.value]
            }
            const checkedValues = colorFilterData.value

            const sectionProducts = document.getElementById("products-List") as HTMLElement;
            const dataFiltered = advertisingData.filter((product) => checkedValues.some((color) => product?.colorList?.includes(color)))

            if (dataFiltered.length === 0 && checkedValues.length > 0) {
                const elementNotFound = createElement("div", {
                    id: "not-found-products",
                    class: "h-[50vh] w-full"
                })

                elementNotFound.className = "h-[50vh] w-full  flex justify-center items-center"
                elementNotFound.innerHTML = `  <h1 class="text-center">No products found</h1>`

                sectionProducts.before(elementNotFound)
                sectionProducts.classList.add("hidden")
                return
            }

            document.getElementById("not-found-products")?.remove()
            sectionProducts.classList.remove("hidden")


            const filteredProducts = checkedValues.length > 0 ? dataFiltered : advertisingData
            const productsList = new CardList(filteredProducts);

            sectionProducts.innerHTML = ""
            productsList.appendTo(sectionProducts)
        })
    });
}

render()
handleFilter()
