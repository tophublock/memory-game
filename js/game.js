import Deck from './deck.js';

export default class Game {
    #width = 0;
    #height = 0;
    #deck = undefined;
    #board = undefined;

    constructor(n) {
        // TODO: ensure n is even
        this.#width = n;
        this.#height = n;
        this.#deck = new Deck(n * n);
        this.#deck.shuffle();
        this.createBoard();
        console.log('I was created');
    }

    createBoard() {
        this.#board = [];
        for (let i = 0; i < this.#width; i++) {
            const row = [];
            for (let j = 0; j < this.#height; j++) {
                row.push(this.#deck.getCard(i * this.#width + j));
            }
            this.#board.push(row);
        }
    }

    render() {
        const deck = this.#deck.render();
        const gameDiv = document.getElementById('board');
        gameDiv.appendChild(deck);
    }

    printBoard() {
        for (let i = 0; i < this.#width; i++) {
            for (let j = 0; j < this.#height; j++) {
                const card = this.#board[i][j];
                console.log(`Board: ${i} - ${j} card: ${card.getValue()}`);
            }
        }
    }
}
