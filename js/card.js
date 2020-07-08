import * as cs from "./constants.js";

export default class Card {
    constructor(value) {
        this._value = value;
    }

    render() {
        let div = document.createElement("div");
        div.classList.add(cs.CARD_CLASS);
        let p = document.createElement("p");
        p.textContent = this._value;
        div.appendChild(p);
        return div;
    }

    getValue() {
        return this._value;
    }
}
