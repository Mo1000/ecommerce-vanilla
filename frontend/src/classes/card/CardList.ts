import {CardDataModel} from "@/models/card.model.ts";
import {CardItem} from "@/classes/card/CardItem.ts";

export class CardList{
    private  _cardList: CardDataModel[] = []
    constructor(cardList:CardDataModel[]){
        this._cardList=cardList
    }

    appendTo(parent:HTMLElement){
        this._cardList.forEach((cardData,index)=>{
            const cardItem=new CardItem(cardData)
            cardItem.card.id=`card-${index}`
            parent.appendChild(cardItem.card)
        })
    }




}
