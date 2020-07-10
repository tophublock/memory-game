import Game from './game.js';

const game = new Game(4);
game.printBoard();
game.render();

// const moves = document.getElementById('moves');
// const score = document.getElementById('score');
const restartBtn = document.getElementById('restart-button');
restartBtn.addEventListener('click', () => {
    game.restart();
});
