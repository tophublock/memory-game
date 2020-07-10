import * as cs from './constants.js';

export default class Card {
    constructor(value) {
        this._value = value;
        this._status = cs.HIDDEN_STATUS;
        this._element = undefined;
    }

    _updateElement() {
        const card = this._element.querySelector(`.${cs.CARD_CLASS}`);
        if (this._status === cs.MATCHED_STATUS) {
            card.classList.add(cs.MATCHED_STATUS);
            const front = card.querySelector(`.${cs.CARD_FRONT}`);
            front.classList.add(cs.MATCHED_STATUS);
        }
    }

    _renderParentElement() {
        this._element = document.createElement('div');
        this._element.classList.add(cs.CARD_CONTAINER_CLASS);
        return this._element;
    }

    _renderCardElement() {
        const card = document.createElement('div');
        card.classList.add(cs.CARD_CLASS);
        const front = document.createElement('div');
        front.classList.add(cs.CARD_FRONT);
        front.innerText = this._value;
        const back = document.createElement('div');
        back.classList.add(cs.CARD_BACK);

        card.appendChild(front);
        card.appendChild(back);
        return card;
    }

    render() {
        this._element = this._renderParentElement();
        const card = this._renderCardElement();
        this._element.appendChild(card);
        this.flipCard();
        return this._element;
    }

    // TODO refactor card updating/flip card
    toggleVisibility() {
        if (this._status === cs.HIDDEN_STATUS) {
            this._status = cs.DEFAULT_STATUS;
        } else {
            this._status = cs.HIDDEN_STATUS;
        }
        this._updateElement();
    }

    flipCard() {
        const card = this._element.querySelector(`.${cs.CARD_CLASS}`);
        if (card.classList.contains(cs.CARD_FLIP)) {
            card.classList.remove(cs.CARD_FLIP);
        } else {
            card.classList.add(cs.CARD_FLIP);
        }
    }

    update() {
        this._updateElement();
    }

    bindEvent(event, func) {
        if (this._element) {
            this._element.addEventListener(event, func);
        }
    }

    setStatus(status) {
        this._status = status;
    }

    setValue(value) {
        this._value = value;
    }

    getStatus() {
        return this._status;
    }

    getValue() {
        return this._value;
    }
}
