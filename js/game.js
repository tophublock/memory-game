import Deck from './deck.js';

export default class Game {
    constructor(n) {
        // TODO: ensure n is even
        this._width = n;
        this._height = n;
        this._deck = new Deck(n * n);
        this._deck.shuffle();
        this.createBoard();
        console.log('I was created');
    }

    createBoard() {
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
        const deck = this._deck.render();
        const gameDiv = document.getElementById('board');
        gameDiv.appendChild(deck);
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
