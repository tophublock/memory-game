class Game {
    constructor(n) {
        this._width = n;
        this._height = n;
    }

    _createBoard() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j< this._height; j++) {

            }
        }
    }
}

module.exports = {
    Game: Game
}