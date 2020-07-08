import Card from './card.js';
import * as cs from './constants.js';

export default class Deck {
    constructor(n) {
        this._cards = Deck.createDeck(n);
    }

    static createDeck(n) {
        const cards = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
            cards.push(new Card(i));
            cards.push(new Card(i));
            console.log(cards[i-1].getValue());
            console.log(cards[i].getValue());
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
        const div = document.createElement('div');
        div.classList.add(cs.DECK_CLASS);
        for (let i = 0; i < this._cards.length; i++) {
            const card = this._cards[i].render();
            div.appendChild(card);
        }
        return div;
    }

    getCard(i) {
        return this._cards[i];
    }
}
