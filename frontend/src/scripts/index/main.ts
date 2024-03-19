import {CardList} from "@/classes/card/CardList.ts";
import {createSVGElement} from "@/scripts/globals.ts";
import {FaArrowLeft, FaArrowRight} from "@/constants/icons.ts";
import {CategoriesList} from "@/classes/category/categoriesList.ts";
import {signal} from "@preact/signals-core";
import {categories, listOfTodaySection} from "@/constants/data.ts";
import {createElement} from "@/functions/dom.ts";

function handleScroll(scrollElement: HTMLElement, controlLeft: HTMLElement, controlRight: HTMLElement) {

    const showLeftControl = signal(false);
    const showRightControl = signal(true);
    const widthWindow = window.matchMedia('(min-width:720px)')

    const onScroll = () => {
        if (scrollElement && widthWindow.matches) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollElement;
            const isNearEnd = scrollLeft + clientWidth >= scrollWidth;
            showRightControl.value = scrollLeft==0?true:!isNearEnd;

            showLeftControl.value = scrollLeft !== 0;

        }
    };


    showRightControl.subscribe((value) => {
        if (value) {
            controlRight.classList.remove('hidden')
        } else {
            controlRight.classList.add('hidden')
        }
    })

    showLeftControl.subscribe((value) => {
        if (value) {
            controlLeft.classList.remove('hidden')
        } else {
            controlLeft.classList.add('hidden')
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
    const controlLeft = todaySales?.querySelector('#control-left') as HTMLElement
    controlLeft.appendChild(createSVGElement(FaArrowLeft))

    // Add the SVG element to the control-right
    const controlRight = todaySales?.querySelector('#control-right') as HTMLElement
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
    const controlLeft = categoriesSection?.querySelector('#control-left-categories') as HTMLElement
    controlLeft.appendChild(createSVGElement(FaArrowLeft))

    // Add the SVG element to the control-right
    const controlRight = categoriesSection?.querySelector('#control-right-categories') as HTMLButtonElement
    controlRight.appendChild(createSVGElement(FaArrowRight))
    controlRight.classList.add("hidden")

    const categoriesListContainer = categoriesSection.querySelector('#categories-list') as HTMLElement

    handleScroll(categoriesListContainer, controlLeft, controlRight)



    const categoriesElement = new CategoriesList(categories)

    categoriesElement.appendTo(categoriesListContainer)


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
        createElement("img",{
            src:"/images/displaying/jbl.png",
            alt:"jbl",
            width:"600",
            class:"pl-10 pr-5",
            height:"350"
        })
    )

    const timeArticleAdvertising=advertising?.querySelector('#time-article-advertising ') as HTMLElement
    const dataTime=[
        {
            time:"05",
            period:"Days"
        },

        {
            time:"23",
            period:"Hours"
        },
        {
            time:"59",
            period:"Minutes"
        },
        {
            time:"59",
            period:"Seconds"
        }
    ]
    dataTime.forEach((data)=>{
        const divTime=createElement("div",{
            class:"bg-white rounded-full w-[75px] h-[75px] text-sm flex flex-col items-center justify-center text-black "
        })
        divTime.appendChild(createElement("span",{
            class:"font-semibold"
        },data.time))
        divTime.appendChild(createElement("span",{},data.period))
        timeArticleAdvertising.appendChild(divTime)
    })
}



renderTodaySales()
displayCategories()
renderCurrentMonthSection()
renderAdvertising()
