import * as cs from './constants.js';
import Deck from './deck.js';
import Card from './card.js';
import Timer from './timer.js';

export default class Game {
    constructor(n) {
        // TODO: ensure n is even
        this._initialize();
        this._setDimensions(n);
        this._restartStats();
        this._paused = false;
        this._visibileCards = [];
        this._timer = new Timer(document.getElementById('time'));
        this._deck = new Deck(n * n);
        this._createBoard();
        this._styleBoard();
    }

    static changeCardsStatus(cards, status) {
        cards.forEach((card) => {
            card.setStatus(status);
            card.update();
        });
    }

    _initialize() {
        this._movesEl = document.getElementById('moves');
        this._scoreEl = document.getElementById('score');
        this._boardEl = document.getElementById('board');
    }

    _setDimensions(n) {
        if (n % 2 === 1) {
            this._width = n + 1;
            this._height = n + 1;
        } else {
            this._width = n;
            this._height = n;
        }
    }

    _createBoard() {
        this._deck.resetDeck();
        this._board = [];
        for (let i = 0; i < this._width; i++) {
            const row = [];
            for (let j = 0; j < this._height; j++) {
                row.push(this._deck.getCard(i * this._width + j));
            }
            this._board.push(row);
        }
    }

    _styleBoard() {
        document.body.style.minWidth = `${(this._width * cs.CARD_SIZE + this._width * cs.CARD_MARGINS).toString()}px`;
        const gameContainer = document.getElementsByClassName('game-container')[0];
        gameContainer.style.minWidth = `${(this._width * cs.CARD_SIZE).toString()}px`;
        gameContainer.style.minHeight = `${(this._width * cs.CARD_SIZE).toString()}px`;

        this._boardEl = document.getElementById('board');
        const template = {
            num: this._width,
            size: cs.CARD_SIZE,
        };
        this._boardEl.style.gridTemplateColumns = cs.GRID_TEMPLATE(template);
        this._boardEl.style.gridTemplateRows = cs.GRID_TEMPLATE(template);
    }

    _incrementMoves() {
        this._movesEl.innerText = ++this._numMoves;
    }

    _incrementScore() {
        this._scoreEl.innerText = ++this._numMatches;
    }

    _restartStats() {
        this._numMoves = 0;
        this._movesEl.innerText = this._numMoves;

        this._numMatches = 0;
        this._scoreEl.innerText = this._numMatches;
    }

    _bindCard(card) {
        card.bindEvent('click', () => {
            if (this._paused || this._visibileCards.includes(card) || !(card instanceof Card)) {
                return;
            }

            this._incrementMoves();
            if (this._numMoves === 1) {
                this._timer.start();
            }

            this._visibileCards.push(card);
            card.toggleVisibility();
            card.flipCard();
            if (this._visibileCards.length === cs.MAX_ATTEMPTS) {
                this._processVisibleCards();
            }
        });
    }

    _checkMatch() {
        if (this._visibileCards.length === 0) {
            return false;
        }

        const value = this._visibileCards[0].getValue();
        for (let i = 1; i < this._visibileCards.length; i++) {
            if (this._visibileCards[i].getValue() !== value) {
                return false;
            }
        }
        return true;
    }

    // TODO insert 'you won!' text
    _checkWin() {
        if (this._numMatches * 2 === this._deck.getLength()) {
            console.log('you won!');
            this._timer.stop();
        }
    }

    // TODO add game over at one hour
    _processVisibleCards() {
        this._paused = true;
        setTimeout(() => {
            if (this._checkMatch()) {
                Game.changeCardsStatus(this._visibileCards, cs.MATCHED_STATUS);
                this._incrementScore();
                this._checkWin();
            } else {
                this._visibileCards.forEach((card) => {
                    card.flipCard();
                });
                Game.changeCardsStatus(this._visibileCards, cs.HIDDEN_STATUS);
            }
            this._visibileCards.length = 0;
            this._paused = false;
        }, 500);
    }

    render() {
        const gameDiv = document.getElementById('board');
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                const card = this._board[i][j];
                gameDiv.appendChild(card.render());
                this._bindCard(card);
            }
        }
        return gameDiv;
    }

    restart() {
        this._restartStats();
        this._timer.reset();
        this.delete();
        this._createBoard();
        this.render();
    }

    delete() {
        this._board = document.getElementById('board');
        this._board.innerHTML = '';
    }

    // TODO: remove
    printBoard() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                const card = this._board[i][j];
                console.log(`Board: ${i} - ${j} card: ${card.getValue()}`);
            }
        }
    }
}
