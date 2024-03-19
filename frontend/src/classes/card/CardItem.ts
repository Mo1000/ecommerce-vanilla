import {cloneTemplate, createElement} from "@/functions/dom.ts";
import {createSVGElement} from "@/scripts/globals.ts";
import {FaEyeIconSolid, FaHeartIconSolid, heartIconOutline} from "@/constants/icons.ts";
import {signal} from "@preact/signals-core";
import {CardDataModel} from "@/models/card.model.ts";


export class CardItem {
    private _cardData: CardDataModel;

    constructor(cardData: CardDataModel) {
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

        const cloneTemplateCard = cloneTemplate('sales-card-template')

        // Append the card to the sales
        this._card.appendChild(cloneTemplateCard);


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

       if(this._cardData?.reductionPrice && this._cardData.reductionPrice !== 0){
           reductionPrice.innerHTML = `-${this._cardData.reductionPrice}%`
       }
       else {
           reductionPrice.remove()
       }

        //img
        const imgCard = createElement("img", {
            alt: "card",
            class: "w-2/3",
            src: this._cardData.image
        })

        contentIconsAndImg.appendChild(imgCard)


        //text and price
        const textAndPriceContainer = this._card.querySelector('.text-price-Container') as HTMLElement

        // Title
        const textCard = textAndPriceContainer.querySelector('.text-card') as HTMLElement
        textCard.innerText = this._cardData.title

        const finalPrice = textAndPriceContainer.querySelector('.final-price-card') as HTMLElement
        finalPrice.innerText = `$${this._cardData.finalPrice}`

        const previousPrice = textAndPriceContainer.querySelector('.previous-price-card') as HTMLElement
        if(this._cardData?.previousPrice  && this._cardData.previousPrice !== 0){
             previousPrice.innerText = `$${this._cardData.previousPrice}`
        }
        else {
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

        if(this._cardData?.colorList && this._cardData.colorList.length!==0){
            const colorList=createElement('div',{
                class:"flex gap-2 items-center"
            })

            this._cardData.colorList.forEach((color)=>{
                colorList.appendChild(createElement('div',{
                    class:"w-5 h-5 rounded-full hover:ring-2 ring-black  cursor-pointer ",
                    style:`background-color:${color}`
                }))
            })

            textAndPriceContainer.appendChild(colorList)
        }
    }
}
