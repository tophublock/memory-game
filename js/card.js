import * as cs from './constants.js';

export default class Card {
    constructor(value) {
        this._value = value;
        this._status = cs.DEFAULT_STATUS;
        this._element = undefined;
    }

    _updateElement() {
        if (this._status === cs.HIDDEN_STATUS) {
            this._element.style.visibility = cs.HIDDEN_VISIBILITY;
            this._element.classList.add(cs.HIDDEN_STATUS);
        } else {
            this._element.style.visibility = cs.DEFAULT_VISIBILITY;
            this._element.classList.remove(cs.HIDDEN_STATUS);
        }
    }

    _renderParentElement() {
        this._element = document.createElement('div');
        this._element.classList.add(cs.CARD_CLASS);
        if (this._status === cs.HIDDEN_STATUS) {
            this._element.style.visibility = cs.HIDDEN_VISIBILITY;
            this._element.classList.add(cs.HIDDEN_STATUS);
        }

        this._element.addEventListener('click', () => {
            this.toggleStatus();
            this._renderParentElement();
        });
        return this._element;
    }

    render() {
        this._element = this._renderParentElement();
        const p = document.createElement('p');
        p.textContent = this._value;

        this._element.appendChild(p);
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
