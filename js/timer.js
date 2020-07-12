export default class Timer {
    constructor(el) {
        this._minutes = 0;
        this._seconds = 0;
        this._timer = undefined;
        this._element = el;
    }

    static formatTimeToStr(t) {
        return t.toString().padStart(2, 0);
    }

    _updateEl() {
        const min = Timer.formatTimeToStr(this._minutes);
        const sec = Timer.formatTimeToStr(this._seconds);
        this._element.innerText = `${min}:${sec}`;
    }

    start() {
        this._timer = setInterval(() => {
            this._seconds++;
            if (this._seconds >= 60) {
                this._seconds = 0;
                this._minutes++;
            }
            if (this._element) {
                this._updateEl();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this._timer);
        this._timer = undefined;
    }

    reset() {
        this._seconds = 0;
        this._minutes = 0;
        this._timer = undefined;
        this._updateEl();
    }
}
