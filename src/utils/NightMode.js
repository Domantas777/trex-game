import { getRandomNum } from '../helpers/helpers';

function NightMode(canvas, spritePos, containerWidth, Runner) {
    let nightModeObj = {
        spritePos,
        canvas,
        canvasCtx: canvas.getContext('2d'),
        xPos: containerWidth - 50,
        yPos: 30,
        currentPhase: 0,
        opacity: 0,
        containerWidth,
        stars: [],
        drawStars: false,
        config: {
            FADE_SPEED: 0.035,
            HEIGHT: 40,
            MOON_SPEED: 0.25,
            NUM_STARS: 2,
            STAR_SIZE: 9,
            STAR_SPEED: 0.3,
            STAR_MAX_Y: 70,
            WIDTH: 20
        },
        phases: [140, 120, 100, 60, 40, 20, 0],
        update: function (activated, delta) {
            // Moon phase.
            if (activated && this.opacity === 0) {
                this.currentPhase++;

                if (this.currentPhase >= this.phases.length) {
                    this.currentPhase = 0;
                }
            }

            // Fade in / out.
            if (activated && (this.opacity < 1 || this.opacity === 0)) {
                this.opacity += this.config.FADE_SPEED;
            } else if (this.opacity > 0) {
                this.opacity -= this.config.FADE_SPEED;
            }

            // Set moon positioning.
            if (this.opacity > 0) {
                this.xPos = this.updateXPos(this.xPos, this.config.MOON_SPEED);

                // Update stars.
                if (this.drawStars) {
                    for (let i = 0; i < this.config.NUM_STARS; i++) {
                        this.stars[i].x = this.updateXPos(this.stars[i].x, this.config.STAR_SPEED);
                    }
                }
                this.draw();
            } else {
                this.opacity = 0;
                this.placeStars();
            }
            this.drawStars = true;
        },

        updateXPos: function (currentPos, speed) {
            if (currentPos < -this.config.WIDTH) {
                currentPos = this.containerWidth;
            } else {
                currentPos -= speed;
            }
            return currentPos;
        },

        draw: function () {
            let moonSourceWidth = this.currentPhase == 3 ? this.config.WIDTH * 2 : this.config.WIDTH;
            let moonSourceHeight = this.config.HEIGHT;
            let moonSourceX = this.spritePos.x + this.phases[this.currentPhase];
            let moonOutputWidth = moonSourceWidth;
            let starSize = this.config.STAR_SIZE;
            let starSourceX = Runner.spriteDefinition.LDPI.STAR.x;

            if (Runner.IS_HIDPI) {
                moonSourceWidth *= 2;
                moonSourceHeight *= 2;
                moonSourceX = this.spritePos.x + (this.phases[this.currentPhase] * 2);
                starSize *= 2;
                starSourceX = Runner.spriteDefinition.HDPI.STAR.x;
            }

            this.canvasCtx.save();
            this.canvasCtx.globalAlpha = this.opacity;

            // Stars.
            if (this.drawStars) {
                for (let i = 0; i < this.config.NUM_STARS; i++) {
                    this.canvasCtx.drawImage(Runner.imageSprite,
                        starSourceX, this.stars[i].sourceY, starSize, starSize,
                        Math.round(this.stars[i].x), this.stars[i].y,
                        this.config.STAR_SIZE, this.config.STAR_SIZE);
                }
            }

            // Moon.
            this.canvasCtx.drawImage(Runner.imageSprite, moonSourceX,
                this.spritePos.y, moonSourceWidth, moonSourceHeight,
                Math.round(this.xPos), this.yPos,
                moonOutputWidth, this.config.HEIGHT);

            this.canvasCtx.globalAlpha = 1;
            this.canvasCtx.restore();
        },

        // Do star placement.
        placeStars: function () {
            let segmentSize = Math.round(this.containerWidth / this.config.NUM_STARS);

            for (let i = 0; i < this.config.NUM_STARS; i++) {
                this.stars[i] = {};
                this.stars[i].x = getRandomNum(segmentSize * i, segmentSize * (i + 1));
                this.stars[i].y = getRandomNum(0, this.config.STAR_MAX_Y);

                if (Runner.IS_HIDPI) {
                    this.stars[i].sourceY = Runner.spriteDefinition.HDPI.STAR.y + this.config.STAR_SIZE * 2 * i;
                } else {
                    this.stars[i].sourceY = Runner.spriteDefinition.LDPI.STAR.y + this.config.STAR_SIZE * i;
                }
            }
        },

        reset: function () {
            this.currentPhase = 0;
            this.opacity = 0;
            this.update(false);
        }
    }

    nightModeObj.placeStars();

    return nightModeObj;
};

export default NightMode;