import * as React from "react";
import loadImg from "./getImage";

import scoreNumberImg from "../../assets/score_number.png";

class DistanceMeter extends React.Component {
  canvas;
  get canvasCtx() {
    return this.canvas.getContext("2d");
  }

  score = 0;
  img;
  highestScore;

  config = {
    IMG_SRC: scoreNumberImg,
    RATIO: 0.05,
    MAX_DISTANCE_UNITS: 5,
    DIGIT_WIDTH: 10,
    DIGIT_HEIGHT: 13,
    DIGIT_DEST_WIDTH: 11,
    Y_POS: 0,
  };

  constructor(canvas, options = {}) {
    super(canvas, options);
    this.canvas = canvas;
    this.config = {
      ...this.config,
      ...options,
    };
    this.img = loadImg(this.config.IMG_SRC);
    this.highestScore = options.highestScore;
  }

  update(num) {
    this.score = Math.floor(num * this.config.RATIO);
    this.draw();
  }

  updateHighScore(setHighScore) {
    if (this.score > this.highestScore) {
      this.highestScore = this.score;
      setHighScore(this.highestScore);
    }
    this.draw();
  }

  drawScore(score = 0, x = 0, y = 0) {
    const scoreStr = score
      .toString()
      .padStart(this.config.MAX_DISTANCE_UNITS, "0");
    const sourceY = 0;

    this.canvasCtx.save();
    this.canvasCtx.globalAlpha = 0.8;
    for (let i = 0; i < scoreStr.length; i++) {
      const c = scoreStr[i];
      const val = Number.parseInt(c, 10);
      const sourceX = this.config.DIGIT_WIDTH * val;
      this.canvasCtx.drawImage(
        this.img,
        sourceX,
        sourceY,
        this.config.DIGIT_WIDTH,
        this.config.DIGIT_HEIGHT,
        x + i * this.config.DIGIT_DEST_WIDTH,
        y,
        this.config.DIGIT_WIDTH,
        this.config.DIGIT_HEIGHT
      );
    }
    this.canvasCtx.restore();
  }

  draw() {
    if (this.score.toString().length > this.config.MAX_DISTANCE_UNITS) {
      this.score = 10 ** this.config.MAX_DISTANCE_UNITS - 1;
    }
    const scoreWidth =
      this.config.DIGIT_DEST_WIDTH * this.config.MAX_DISTANCE_UNITS;
    this.drawScore(
      this.score,
      this.canvas.width - scoreWidth,
      this.config.Y_POS
    );
  }

  reset() {
    this.highestScore = 0;
  }
}

export default DistanceMeter;
