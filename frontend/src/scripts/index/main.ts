import {CardDataModel} from "@/models/card.model.ts";
import {CardList} from "@/classes/card/CardList.ts";

function addCardInTodaySales() {
    const todaySales = document.getElementById('today-sales');
    const divCardContainer = todaySales?.querySelector('#today-sales-card') as HTMLElement
    const cardDataList: CardDataModel[] = [
        {
            title: "HAVIT HV-G92 Gamepad",
            finalPrice: 120,
            previousPrice: 150,
            image: "/images/card/img.png",
            reductionPrice: 40,
            stars: {
                number: 88,
                total: 5
            }

        },
        {
            title: "AK-900 Wired Keyboard",
            finalPrice: 960,
            previousPrice: 1160,
            image: "/images/card/img_1.png",
            reductionPrice: 35,
            stars: {
                number: 75,
                total: 4
            }

        },
        {
            title: "IPS LCD Gaming Monitor",
            finalPrice: 370,
            previousPrice: 400,
            image: "/images/card/img_2.png",
            reductionPrice: 30,
            stars: {
                number: 99,
                total: 5
            }

        },
        {
            title: "S-Series Comfort Chair ",
            finalPrice: 375,
            previousPrice: 400,
            image: "/images/card/img_3.png",
            reductionPrice: 25,
            stars: {
                number: 99,
                total: 5
            }

        }

    ]

    const cardList = new CardList(cardDataList)
    cardList.appendTo(divCardContainer)

}


addCardInTodaySales()
