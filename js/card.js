import * as cs from './constants';

export default class Card {
    #value = undefined;

    constructor(value) {
        this.#value = value;
    }

    render() {
        const div = document.createElement('div');
        div.classList.add(cs.CARD_CLASS);
        const p = document.createElement('p');
        p.textContent = this.#value;
        div.appendChild(p);
        return div;
    }

    getValue() {
        return this.#value;
    }
}
