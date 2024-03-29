import {createElement} from "@/functions/dom.ts";
import {createSVGElement, optimizeUrl} from "@/utils";
import {FaEyeIconSolid, FaHeartIconSolid, heartIconOutline, MdOutlineShoppingCart} from "@/constants/icons.ts";
import {signal} from "@preact/signals-core";
import {ProductModel} from "@/models/product.model.ts";


export class CardItem {
    private _cardData: ProductModel;

    constructor(cardData: ProductModel) {
        this._cardData = cardData
        this._render()
        this._handleEvents()
    }

    private _card: HTMLElement = createElement("div")

    get card(): HTMLElement {
        return this._card;
    }

    private _handleEvents() {
        const divAddToCart = this._card.querySelector(".add-to-card-section") as HTMLElement
        this._card.addEventListener("mouseenter", () => {
            divAddToCart.classList.remove("hidden")
            divAddToCart.classList.add("flex")

        })
        this._card.addEventListener("mouseleave", () => {
            divAddToCart.classList.add("hidden")
            divAddToCart.classList.remove("flex")

        })
    }

    private _render() {

        // Append the card to the sales
        this._card.innerHTML = `   <div>
            <div class="card-icons-img h-[250px] w-[270px] bg-gray-100 flex items-center justify-center relative">
                <div class="absolute  right-2 top-3 space-y-3 z-10">
                    <div class="heart-icon bg-white rounded-full w-8 h-8 flex justify-center items-center">
                    </div>

                    <div class="eye-icon bg-white rounded-full w-8 h-8 flex justify-center items-center">
                    </div>
                </div>
                <div class="reduction-price absolute left-2 top-3 rounded px-3 py-1 bg-red-500 text-white text-sm">
                </div>

                <div class="add-to-card-section absolute cursor-pointer bottom-0 hidden w-full h-11 bg-black text-white text-xl hover:text-red-100  justify-center items-center gap-3 ">
                
                   <span> Add To Cart</span>
                </div>

            </div>
            <div class="text-price-Container space-y-3 my-4">
                <div class="text-card text-base"></div>
                <div class="flex gap-3">
                    <span class="final-price-card text-red-500"></span>
                    <span class="previous-price-card line-through text-gray-400"></span>
                </div>
                <div class="star-container flex gap-2">
                    <picture class="flex gap-2">
                    </picture>
                    <span class="text-gray-400"></span>
                </div>
            </div>
        </div>`;


        const contentIconsAndImg = this._card.querySelector('.card-icons-img') as HTMLElement;

        // Create the SVG element heartIcon
        const heartIconContainer = contentIconsAndImg.querySelector('.heart-icon') as HTMLElement;
        let heartIcon = createSVGElement(heartIconOutline);

        const isClickedHeartIcon = signal(false)
        isClickedHeartIcon.subscribe((value) => {
            if (value) {
                heartIcon = createSVGElement(FaHeartIconSolid);
                heartIcon.setAttribute('fill', 'red')
                heartIconContainer.replaceChildren(heartIcon)
            } else {
                heartIcon = createSVGElement(heartIconOutline);
                heartIcon.setAttribute('color', 'black')
                heartIconContainer.replaceChildren(heartIcon)
            }

        })
        heartIconContainer.addEventListener('click', () => {
            isClickedHeartIcon.value = !isClickedHeartIcon.value
        })

        // Create the SVG element eyeIcon
        const eyeIconContainer = contentIconsAndImg.querySelector('.eye-icon') as HTMLElement;
        const eyeIcon = createSVGElement(FaEyeIconSolid);

        const isClickedEyeIcon = signal(false)
        isClickedEyeIcon.subscribe((value) => {
            if (value) {
                eyeIcon.setAttribute('fill', 'red')
            } else {
                eyeIcon.setAttribute('fill', 'black')
            }

        })
        eyeIconContainer.addEventListener('click', () => {
            isClickedEyeIcon.value = !isClickedEyeIcon.value
        })
        eyeIconContainer.appendChild(eyeIcon)

        const reductionPrice = contentIconsAndImg.querySelector('.reduction-price') as HTMLElement

        if (this._cardData?.reductionPrice && this._cardData.reductionPrice !== 0) {
            reductionPrice.innerHTML = `-${this._cardData.reductionPrice}%`
        } else {
            reductionPrice.remove()
        }

        //img
        const imgCard = createElement("img", {
            alt: "card",
            class: "w-2/3 hover:opacity-75",
            src:optimizeUrl(this._cardData.image).toURL()
        })

        contentIconsAndImg.appendChild(imgCard)


        const divAddToCart = this._card.querySelector(".add-to-card-section") as HTMLElement
        divAddToCart.prepend(createSVGElement(MdOutlineShoppingCart,{
            class:"hover:fill-red-100"
        }))


        //text and price
        const textAndPriceContainer = this._card.querySelector('.text-price-Container') as HTMLElement

        // Title
        const textCard = textAndPriceContainer.querySelector('.text-card') as HTMLElement
        textCard.innerText = this._cardData.title

        const finalPrice = textAndPriceContainer.querySelector('.final-price-card') as HTMLElement
        finalPrice.innerText = `$${this._cardData.finalPrice}`

        const previousPrice = textAndPriceContainer.querySelector('.previous-price-card') as HTMLElement
        if (this._cardData?.previousPrice && this._cardData.previousPrice !== 0) {
            previousPrice.innerText = `$${this._cardData.previousPrice}`
        } else {
            previousPrice.remove()
        }

        // stars
        const starContainer = this._card.querySelector('.star-container') as HTMLElement

        // Create the SVG element starIcon
        const starContent = starContainer.querySelector("picture") as HTMLElement
        const starIcon = createElement("img", {
            alt: "star",
            height: "20",
            src: "/images/card/star.png",
            width: "20"
        })
        Array.from({length: this._cardData.stars.total}).forEach(() => starContent.appendChild(starIcon.cloneNode(true)))

        // Add text stars
        const textStars = starContainer.querySelector("span") as HTMLElement
        textStars.innerText = `(${this._cardData.stars.number})`

        if (this._cardData?.colorList && this._cardData.colorList.length !== 0) {
            const colorList = createElement('div', {
                class: "flex gap-2 items-center"
            })

            this._cardData.colorList.forEach((color) => {
                colorList.appendChild(createElement('div', {
                    class: "w-4 h-4 rounded-full hover:ring-1 ring-black  cursor-pointer ",
                    style: `background-color:${color}`
                }))
            })

            textAndPriceContainer.appendChild(colorList)
        }
    }
}
