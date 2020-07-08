import Card from './card';
import * as cs from './constants';

export default class Deck {
    #cards;

    constructor(n) {
        this.#cards = this.createDeck(n);
    }

    static createDeck(n) {
        const cards = [];
        for (let i = 0; i < Math.floor(n / 2); i++) {
            cards.push(new Card(i));
            cards.push(new Card(i));
        }
        return cards;
    }

    shuffle() {
        // Fisher-Yates Algorithm
        for (let i = this.#cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.#cards[j];
            this.#cards[i] = this.#cards[j];
            this.#cards[j] = temp;
        }
    }

    render() {
        const div = document.createElement('div');
        div.classList.add(cs.DECK_CLASS);
        for (let i = 0; i < this.#cards.length; i++) {
            const card = this.#cards[i].render();
            div.appendChild(card);
        }
        return div;
    }

    getCard(i) {
        return this.#cards[i];
    }
}
