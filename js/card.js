import * as cs from './constants.js';

export default class Card {
    constructor(value) {
        this._value = value;
        this._status = cs.HIDDEN_STATUS;
        this._element = undefined;
    }

    _updateElement() {
        const card = this._element.querySelector(`.${cs.CARD_CLASS}`);
        if (this._status === cs.HIDDEN_STATUS) {
            card.style.visibility = cs.HIDDEN_VISIBILITY;
            card.classList.add(cs.HIDDEN_STATUS);
        } else {
            card.style.visibility = cs.DEFAULT_VISIBILTY;
            card.classList.remove(cs.HIDDEN_STATUS);
        }
    }

    _renderParentElement() {
        this._element = document.createElement('div');
        this._element.classList.add(cs.CARD_CONTAINER_CLASS);
        this._element.addEventListener('click', () => {
            this.toggleStatus();
            this._updateElement();
        });
        return this._element;
    }

    _renderCardElement() {
        const card = document.createElement('div');
        card.classList.add(cs.CARD_CLASS);
        if (this._status === cs.HIDDEN_STATUS) {
            card.style.visibility = cs.HIDDEN_VISIBILITY;
            card.classList.add(cs.HIDDEN_STATUS);
        }
        return card;
    }

    render() {
        this._element = this._renderParentElement();
        const card = this._renderCardElement();
        const p = document.createElement('p');
        p.textContent = this._value;

        this._element.appendChild(card);
        card.appendChild(p);
        return this._element;
    }

    toggleStatus() {
        if (this._status === cs.HIDDEN_STATUS) {
            this._status = cs.DEFAULT_STATUS;
        } else {
            this._status = cs.HIDDEN_STATUS;
        }
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
