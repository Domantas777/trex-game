import { random } from 'lodash'

import * as React from 'react'
import Coin from './coin'

class CoinManager extends React.Component {
    canvas;
    canvasCtx;
    coinList;
    currentGap;
    lastCoin;

    config = {
        MIN_COIN_AMOUNT: 0,
        MAX_COIN_AMOUNT: Infinity,
        MAX_COIN_GAP: 0, // this.canvas.width * 4
        MIN_COIN_GAP: 0, // this.canvas.width / 1
        COIN_FREQUENCY: 0.1,
        COIN_CONFIG: {},
    }

    constructor(canvas, options = {}) {
        super(canvas, options)
        if (!canvas) {
            throw new Error('need parameter canvas')
        }
        this.canvas = canvas
        this.canvasCtx = this.canvas.getContext('2d')

        this.config.MAX_COIN_GAP = this.canvas.width / 1;
        this.config.MIN_COIN_GAP = this.canvas.width / 1;
        this.config = {
            ...this.config,
            ...options,
        }
    }

    update(deltaTime, speed) {
        if (this.needToAddCoin()) {
            this.addCoin(this.config.COIN_CONFIG)
        }
        this.coinList = this.coinList.filter(coin => coin && !coin.remove)
        this.coinList.forEach(coin => coin.update(deltaTime, speed))
    }

    needToAddCoin() {
        const num = this.coinList.length;
        // coin collision
        const gapDistance = this.lastCoin
            ? this.canvas.width - this.lastCoin.xPos + this.lastCoin.img.width
            : Infinity;
        if (gapDistance < 0) {
            return false
        }
        if (num < this.config.MIN_COIN_AMOUNT) {
            return true
        }
        if (num > this.config.MAX_COIN_AMOUNT) {
            return false
        }
        if (
            gapDistance > this.currentGap &&
            this.config.COIN_FREQUENCY > Math.random()
        ) {
            return true
        }
        return false
    }

    addCoin(options = {}) {
        const coin = new Coin(this.canvas, options);
        this.coinList.push(coin)
        this.lastCoin = coin
        this.currentGap = random(
            this.config.MIN_COIN_GAP,
            this.config.MAX_COIN_GAP
        );
    }

    reset() {
        this.coinList = []
        this.currentGap = 0
        this.lastCoin = null
    }
}

export default CoinManager;