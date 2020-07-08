import Card from "./card.js";
import * as cs from "./constants.js";

export default class Deck {
    constructor(n) {
        this._cards = this._createDeck(n);        
    }

    _createDeck(n) {
        let cards = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
            cards.push(new Card(i));
            cards.push(new Card(i));
        }
        return cards;
    }

    shuffle() {
        // Fisher-Yates Algorithm
        for (let i = this._cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this._cards[j];
            this._cards[i] = this._cards[j];
            this._cards[j] = temp;
        }
    }

    render() {
        let div = document.createElement("div");
        div.classList.add(cs.DECK_CLASS);
        for (let i = 0; i < this._cards.length; i++) {
            let card = this._coards[i].render();
            div.appendChild(card);
        }
        return div;
    }

    getCard(i) {
        return this._cards[i];
    }
}