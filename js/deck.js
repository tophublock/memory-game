import Card from "./card.js";

export default class Deck {
    constructor(n) {
        this._cards = this._createDeck(n);        
    }

    _createDeck(n) {
        let _cards = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
            _cards.push(new Card(i));
            _cards.push(new Card(i));
        }
        return _cards;
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

    getCard(i) {
        return this._cards[i];
    }
}