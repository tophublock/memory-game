import * as cs from './constants.js';
import Game from './game.js';

const difficultySelect = document.getElementById('difficulty');
let currentDifficulty = difficultySelect.value;

let game = new Game(4);
game.printBoard();
game.render();

const restartBtn = document.getElementById('restart-button');
restartBtn.addEventListener('click', () => {
    game.restart();
});

difficultySelect.addEventListener('change', () => {
    console.log('changing');
    const difficulty = difficultySelect.value;
    if (difficulty === currentDifficulty) {
        game.restart();
        return;
    }

    game.delete();
    switch (difficulty) {
    case cs.EASY_DIFFICULTY:
        game = new Game(cs.EASY_SIZE);
        break;
    case cs.MEDIUM_DIFFICULTY:
        game = new Game(cs.MEDIUM_SIZE);
        break;
    case cs.HARD_DIFFICULTY:
        game = new Game(cs.HARD_SIZE);
        break;
    default:
        game = new Game(cs.EASY_SIZE);
    }
    currentDifficulty = difficulty;
    game.render();
});

// const buttons = document.getElementsByTagName('button');
// buttons.forEach((button) => {
//     button.classList.add(cs.ROUNDED_TAILWIND);
// });
