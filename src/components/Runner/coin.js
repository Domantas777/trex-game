import { random } from 'lodash'
import defaultCoinImg from '../../assets/coin.png'
import Sprite from './sprite'

class Coin extends Sprite {
    config = {
        IMG_SRC: defaultCoinImg,
        X_POS: null,
        Y_POS: null,
        MAX_COIN_LEVEL: 20,
        MIN_COIN_LEVEL: 60,
        SPEED: 0,
        RATIO: 1,
    }

    remove = false

    constructor(canvas, options = {}) {
        super(canvas)
        this.config = {
            ...this.config,
            ...options,
        }
        // isNumber(this.config.MAX_COIN_LEVEL) ||
        //   (this.config.MAX_COIN_LEVEL = this.img.height)
        // isNumber(this.config.MIN_COIN_LEVEL) ||
        //   (this.config.MIN_COIN_LEVEL =
        //     this.canvas.height / 2 - this.img.height)

        this.xPos = this.config.X_POS || this.canvas.width
        this.yPos =
            this.config.Y_POS ||
            random(this.config.MAX_COIN_LEVEL, this.config.MIN_COIN_LEVEL);
    }

    draw() {
        this.canvasCtx.save()
        this.canvasCtx.drawImage(this.img, this.xPos, this.yPos)
        this.canvasCtx.restore()
    }

    update(deltaTime = 1 / 16, speed = 0) {
        if (this.remove) {
            return
        }
        // calc coin movement distance
        const distance =
            deltaTime * speed * this.config.RATIO +
            deltaTime * this.config.SPEED

        this.xPos -= distance
        if (!this.isVisible()) {
            this.remove = true
            return
        }
        this.draw()
    }
}

export default Coin
