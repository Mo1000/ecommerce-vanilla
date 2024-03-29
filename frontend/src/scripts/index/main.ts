import '@/scripts/nav/index.ts'
import '@/scripts/footer/index.ts'
import {CardList} from "@/classes/card/CardList.ts";
import {createSVGElement} from "@/utils";
import {FaArrowLeft, FaArrowRight} from "@/constants/icons.ts";
import {CategoriesList} from "@/classes/category/categoriesList.ts";
import {signal} from "@preact/signals-core";
import {advertisingData, categories, listOfTodaySection} from "@/constants/data.ts";
import {createElement} from "@/functions/dom.ts";

function handleScroll(scrollElement: HTMLElement, controlLeft: HTMLButtonElement, controlRight: HTMLButtonElement) {

    const showLeftControl = signal(false);
    const showRightControl = signal(true);
    const widthWindow = window.matchMedia('(min-width:720px)')

    const onScroll = () => {
        if (scrollElement && widthWindow.matches) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollElement;
            const isNearEnd = scrollLeft + clientWidth >= scrollWidth;
            showRightControl.value = scrollLeft == 0 ? true : !isNearEnd;

            showLeftControl.value = scrollLeft !== 0;

        }
    };


    showRightControl.subscribe((value) => {
        const nameAttribute = "disabled"
        const nameClass = "opacity-20"
        if (value) {
            controlRight.removeAttribute(nameAttribute)
            controlRight.classList.remove(nameClass)

        } else {
            controlRight.classList.add(nameClass)
            controlRight.setAttribute(nameAttribute, "")
        }
    })

    showLeftControl.subscribe((value) => {
        const nameAttribute = "disabled"
        const nameClass = "opacity-20"
        if (value) {
            controlLeft.removeAttribute(nameAttribute)
            controlLeft.classList.remove(nameClass)
        } else {
            controlLeft.removeAttribute(nameAttribute)
            controlLeft.classList.add(nameClass)
        }
    })

    // run it at mounting once
    onScroll();

    scrollElement.addEventListener('scrollend', onScroll);


    const scrollByClick = (isLeft: boolean) => {
        if (isLeft) {
            scrollElement.scrollBy({
                top: 0,
                left: -600,
                behavior: 'smooth',
            });
        } else {
            scrollElement.scrollBy({
                top: 0,
                left: 600,
                behavior: 'smooth',
            });
        }
    };
    controlLeft.addEventListener('click', () => {
        scrollByClick(true)
    })

    controlRight.addEventListener('click', () => {
        scrollByClick(false)
    })


}

function renderTodaySales() {
    const todaySales = document.getElementById('today-sales');

    // Add the SVG element to the control-left
    const controlLeft = todaySales?.querySelector('#control-left') as HTMLButtonElement
    controlLeft.appendChild(createSVGElement(FaArrowLeft))

    // Add the SVG element to the control-right
    const controlRight = todaySales?.querySelector('#control-right') as HTMLButtonElement
    controlRight.appendChild(createSVGElement(FaArrowRight))

    // Add the card in the today sales
    const divCardContainer = todaySales?.querySelector('#today-sales-card') as HTMLElement
    divCardContainer.className = "flex flex-row md:gap-10 gap-10 w-full overflow-x-scroll md:overflow-hidden items-center px-4"

    handleScroll(divCardContainer, controlLeft, controlRight)


    const cardList = new CardList(listOfTodaySection)
    cardList.appendTo(divCardContainer)


}

function displayCategories() {
    const categoriesSection = document.getElementById('categories-section') as HTMLElement

    // Add the SVG element to the control-left
    const controlLeft = categoriesSection?.querySelector('#control-left-categories') as HTMLButtonElement
    controlLeft.appendChild(createSVGElement(FaArrowLeft))
    controlLeft.remove()

    // Add the SVG element to the control-right
    const controlRight = categoriesSection?.querySelector('#control-right-categories') as HTMLButtonElement
    controlRight.appendChild(createSVGElement(FaArrowRight))
    controlRight.setAttribute("disabled", "")
    controlRight.classList.add("opacity-20")


    const categoriesListContainer = categoriesSection.querySelector('#categories-list') as HTMLElement

    const categoriesElements = new CategoriesList(categories)

    categoriesElements.appendTo(categoriesListContainer)


}

function renderCurrentMonthSection() {
    const currentMonth = document.getElementById('current-month-section');


    // Add the card in the today sales
    const divCardContainer = currentMonth?.querySelector('#current-month-list') as HTMLElement


    const cardList = new CardList(listOfTodaySection.slice(0, 4))
    cardList.appendTo(divCardContainer)
}

function renderAdvertising() {
    const advertising = document.getElementById('advertising-section');

    const textArticleAdvertising = advertising?.querySelector('#text-article-advertising ') as HTMLElement
    textArticleAdvertising.innerText = "Enhance Your Music Experience"


    const imgArticleAdvertising = advertising?.querySelector('#img-article-advertising ') as HTMLElement
    imgArticleAdvertising.appendChild(
        createElement("img", {
            src: "/images/displaying/jbl.png",
            alt: "jbl",
            width: "600",
            class: "pl-10 pr-5",
            height: "350"
        })
    )

    const timeArticleAdvertising = advertising?.querySelector('#time-article-advertising ') as HTMLElement
    const dataTime = [
        {
            time: "05",
            period: "Days"
        },

        {
            time: "23",
            period: "Hours"
        },
        {
            time: "59",
            period: "Minutes"
        },
        {
            time: "59",
            period: "Seconds"
        }
    ]
    dataTime.forEach((data) => {
        const divTime = createElement("div", {
            class: "bg-white rounded-full w-[75px] h-[75px] text-sm flex flex-col items-center justify-center text-black "
        })
        divTime.appendChild(createElement("span", {
            class: "font-semibold"
        }, data.time))
        divTime.appendChild(createElement("span", {}, data.period))
        timeArticleAdvertising.appendChild(divTime)
    })
}


function renderExplorationSection() {

    const explorationSection = document.getElementById('exploration-section');

    // Add the SVG element to the control-left
    const controlLeft = explorationSection?.querySelector('#control-left-exploration') as HTMLElement
    controlLeft.remove()

    // Add the SVG element to the control-right
    const controlRight = explorationSection?.querySelector('#control-right-exploration') as HTMLElement
    controlRight.appendChild(createSVGElement(FaArrowRight))
    controlRight.setAttribute("disabled", "")
    controlRight.classList.add("opacity-20")

    // Add the card in the today sales
    const explorationContainer = explorationSection?.querySelector('#exploration-list') as HTMLElement


    const cardList = new CardList(advertisingData)
    cardList.appendTo(explorationContainer)
}

function renderNewArrivals() {
    const newArrivals = document.getElementById('new-arrivals-section')
    const divCardContainer = newArrivals?.querySelector('#new-arrivals-list') as HTMLElement

    const dataNewArrivals = [
        {
            img: "/images/new_arrival/ps5.svg",
            details: {
                span: "PlayStation 5",
                p: "Black and White version of the PS5 coming out on sale.",
                aHref: "#"
            }
        },
        {
            img: "/images/new_arrival/woman.png",
            details: {
                span: "Women’s Collections",
                p: "Featured woman collections that give you another vibe.",
                aHref: "#"
            }
        },
        {
            img: "/images/new_arrival/enceinte.svg",
            details: {
                span: "Speakers",
                p: "Amazon wireless speakers",
                aHref: "#"
            }
        },
        {
            img: "/images/new_arrival/parfum.svg",
            details: {
                span: "Perfume",
                p: "GUCCI INTENSE OUD EDP",
                aHref: "#"
            }
        }
    ]

    dataNewArrivals.forEach((data, index) => {
        const element = divCardContainer.querySelector(`#side-new-arrivals-${index + 1}`) as HTMLElement
        element.style.backgroundImage = `url(${data.img})`

        const childElement = createElement("div", {
            class: `text-white ml-10 mb-10 ${index <= 1 ? "w-1/2" : ""}`
        })

        childElement.appendChild(createElement("span", {
            class: "font-semibold"
        }, data.details.span))
        childElement.appendChild(createElement("p", {}, data.details.p))
        childElement.appendChild(createElement("a", {
            href: data.details.aHref,
            class: "border-0 border-b border-solid border-white/80 text-white font-semibold w-fit cursor-pointer hover:text-red-500"
        }, "Shop Now"))

        element.appendChild(childElement)
    })

}

renderTodaySales()
displayCategories()
renderCurrentMonthSection()
renderAdvertising()
renderExplorationSection()
renderNewArrivals()
