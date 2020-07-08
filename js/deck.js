let cardModule = require('./card.js');
let Card = cardModule.Card;

class Deck {
    constructor(n) {
        this.cards = this._createDeck(n);        
    }

    _createDeck(n) {
        let cards = [];
        // TODO: make 2 of every value
        // Make sure n is even when creating new Deck
        for (let i = 0; i < n; i++) {
            cards.push(Card(i));
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
}