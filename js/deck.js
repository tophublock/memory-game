import Card from "./card.js";

export default class Deck {
    constructor(n) {
        this.cards = this._createDeck(n);        
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
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.cards[j];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    }

    getCard(i) {
        return this._cards[i];
    }
}