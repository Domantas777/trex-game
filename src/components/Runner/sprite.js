import { castArray, sample } from 'lodash'
import * as React from 'react'
import loadImg from './getImage';

class Sprite extends React.Component {
  canvas;
  canvasCtx;
  xPos = 0
  yPos = 0
  remove = false
  speed = 0
  _img;

  get img() {
    if (this._img) {
      return this._img
    }
    this.config.IMG_SRC = castArray(this.config.IMG_SRC)
    const sampleSrc = sample(this.config.IMG_SRC)
    this._img = loadImg(sampleSrc)
    return this._img
  }

  config = {
    IMG_SRC: null,
    X_POS: 0,
    Y_POS: 0,
  }

  constructor(canvas, options = {}) {
    super(canvas, options)
    if (!canvas) {
      throw new Error('need parameter canvas')
    }
    this.canvas = canvas
    this.canvasCtx = this.canvas.getContext('2d')
  }

  draw(img = this.img) {
    if (typeof img === 'string') {
      img = loadImg(img)
    }
    this.canvasCtx.save()
    this.canvasCtx.drawImage(img, this.xPos, this.yPos)
    this.canvasCtx.restore()
  }

  update() {
    if (!this.isVisible()) {
      this.remove = true
      return
    }
    this.draw()
  }

  isVisible() {
    return (
      this.xPos + this.img.width >= 0 &&
      this.xPos <= this.canvas.width &&
      this.yPos + this.img.height >= 0 &&
      this.yPos <= this.canvas.height
    )
  }

  isOverlap(sprite) {
    return (
      this.xPos < sprite.xPos + sprite.img.width - 5 &&
      this.xPos + this.img.width + 5 > sprite.xPos &&
      this.yPos < sprite.yPos + sprite.img.height - 5 &&
      this.yPos + this.img.height + 5 > sprite.yPos
    )
  }
}

export default Sprite