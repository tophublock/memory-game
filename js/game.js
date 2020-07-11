import * as cs from './constants.js';
import Deck from './deck.js';
import Card from './card.js';

function formatTimeToStr(t) {
    return t.toString().padStart(2, 0);
}

export default class Game {
    constructor(n) {
        // TODO: ensure n is even
        this._width = n;
        this._height = n;
        this._numMatches = 0;
        this._numMoves = 0;
        this._paused = false;
        this._visibileCards = [];
        this._timer = undefined;
        this._minutes = 0;
        this._seconds = 0;
        this._deck = new Deck(n * n);
        this.createBoard();
        this.setResetButton();
    }

    createBoard() {
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

    render() {
        const gameDiv = document.getElementById('board');
        for (let i = 0; i < this._board.length; i++) {
            for (let j = 0; j < this._board[i].length; j++) {
                const card = this._board[i][j];
                gameDiv.appendChild(card.render());
                this.bindCard(card);
            }
        }
        return gameDiv;
    }

    bindCard(card) {
        card.bindEvent('click', () => {
            // TODO: if first card clicked, start timer
            console.log('clicked');
            if (this.paused || this._visibileCards.includes(card) || !(card instanceof Card)) {
                return;
            }

            this._visibileCards.push(card);
            card.toggleVisibility();
            card.flipCard();
            this.incrementMoves();
            if (this._numMoves === 1) {
                this.startTimer();
            }

            if (this._visibileCards.length === cs.MAX_ATTEMPTS) {
                this.processVisibleCards();
            }
        });
    }

    // Assume plays up to one hour
    // TODO add game over at one hour
    startTimer() {
        this._timer = setInterval(() => {
            this._seconds++;
            if (this._seconds >= 60) {
                this._seconds = 0;
                this._minutes++;
            }

            this._updateMinutesEl();

            this._updateSecondsEl();
        }, 1000);
    }

    _updateSecondsEl() {
        const secondsStr = formatTimeToStr(this._seconds);
        const secondsEl = document.getElementById('seconds');
        secondsEl.innerText = secondsStr;
    }

    _updateMinutesEl() {
        const minutesStr = formatTimeToStr(this._minutes);
        const minutesEl = document.getElementById('minutes');
        minutesEl.innerText = minutesStr;
    }

    stopTimer() {
        clearInterval(this._timer);
        this._timer = undefined;
    }

    resetTimer() {
        this._timer = undefined;
        this._seconds = 0;
        this._minutes = 0;
        this._updateMinutesEl();
        this._updateSecondsEl();
    }

    processVisibleCards() {
        this.paused = true;
        setTimeout(() => {
            if (this.checkMatch()) {
                this.changeVisibleCardsStatus(cs.MATCHED_STATUS);
                this.incrementScore();
                this.checkWin();
            } else {
                this._visibileCards.forEach((card) => {
                    card.flipCard();
                });
                this.changeVisibleCardsStatus(cs.HIDDEN_STATUS);
            }
            this._visibileCards.length = 0;
            this.paused = false;
        }, 500);
    }

    checkMatch() {
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

    checkWin() {
        if (this._numMatches * 2 === this._deck.getLength()) {
            console.log('you won!');
            this.stopTimer();
        }
    }

    changeVisibleCardsStatus(status) {
        this._visibileCards.forEach((card) => {
            card.setStatus(status);
            card.update();
        });
    }

    setResetButton() {
        const resetButton = document.getElementById('restart-button');
        resetButton.addEventListener('click', () => {
            console.log('reset');
            this.restart();
        });
    }

    incrementMoves() {
        const moves = document.getElementById('moves');
        moves.innerText = ++this._numMoves;
    }

    incrementScore() {
        const score = document.getElementById('score');
        score.innerText = ++this._numMatches;
    }

    _restartStats() {
        this._numMoves = 0;
        const moves = document.getElementById('moves');
        moves.innerText = this._numMoves;

        this._numMatches = 0;
        const score = document.getElementById('score');
        score.innerText = this._numMatches;
    }

    restart() {
        this._restartStats();
        const gameDiv = document.getElementById('board');
        gameDiv.innerHTML = '';
        this.createBoard();
        this.render();
    }

    printBoard() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                const card = this._board[i][j];
                console.log(`Board: ${i} - ${j} card: ${card.getValue()}`);
            }
        }
    }
}
