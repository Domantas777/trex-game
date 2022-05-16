function HorizonLine(canvas, spritePos, Runner) {
    let horizonLineObj = {
        spritePos,
        canvas,
        canvasCtx: canvas.getContext('2d'),
        sourceDimensions: {},
        dimensions: {
            WIDTH: 600,
            HEIGHT: 12,
            YPOS: 127
        },
        sourceXPos: [spritePos.x, spritePos.x + 600],
        xPos: [],
        yPos: 0,
        bumpThreshold: 0.5,
        /**
         * Set the source dimensions of the horizon line.
         */
        setSourceDimensions: function () {
            for (let dimension in this.dimensions) {
                if (Runner.IS_HIDPI) {
                    if (dimension !== 'YPOS') {
                        this.sourceDimensions[dimension] = this.dimensions[dimension] * 2;
                    }
                } else {
                    this.sourceDimensions[dimension] = this.dimensions[dimension];
                }
                this.dimensions[dimension] = this.dimensions[dimension];
            }

            this.xPos = [0, this.dimensions.WIDTH];
            this.yPos = this.dimensions.YPOS;
        },

        /**
         * Return the crop x position of a type.
         */
        getRandomType: function () {
            return Math.random() > this.bumpThreshold ? this.dimensions.WIDTH : 0;
        },

        /**
         * Draw the horizon line.
         */
        draw: function () {
            this.canvasCtx.drawImage(Runner.imageSprite, this.sourceXPos[0],
                this.spritePos.y,
                this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
                this.xPos[0], this.yPos,
                this.dimensions.WIDTH, this.dimensions.HEIGHT);

            this.canvasCtx.drawImage(Runner.imageSprite, this.sourceXPos[1],
                this.spritePos.y,
                this.sourceDimensions.WIDTH, this.sourceDimensions.HEIGHT,
                this.xPos[1], this.yPos,
                this.dimensions.WIDTH, this.dimensions.HEIGHT);
        },

        /**
         * Update the x position of an indivdual piece of the line.
         * @param {number} pos Line position.
         * @param {number} increment
         */
        updateXPos: function (pos, increment) {
            let line1 = pos;
            let line2 = pos === 0 ? 1 : 0;

            this.xPos[line1] -= increment;
            this.xPos[line2] = this.xPos[line1] + this.dimensions.WIDTH;

            if (this.xPos[line1] <= -this.dimensions.WIDTH) {
                this.xPos[line1] += this.dimensions.WIDTH * 2;
                this.xPos[line2] = this.xPos[line1] - this.dimensions.WIDTH;
                this.sourceXPos[line1] = this.getRandomType() + this.spritePos.x;
            }
        },

        /**
         * Update the horizon line.
         * @param {number} deltaTime
         * @param {number} speed
         */
        update: function (deltaTime, speed) {
            let increment = Math.floor(speed * (Runner.FPS / 1000) * deltaTime);

            if (this.xPos[0] <= 0) {
                this.updateXPos(0, increment);
            } else {
                this.updateXPos(1, increment);
            }
            this.draw();
        },

        /**
         * Reset horizon to the starting position.
         */
        reset: function () {
            this.xPos[0] = 0;
            this.xPos[1] = this.dimensions.WIDTH;
        }
    };

    horizonLineObj.setSourceDimensions();
    horizonLineObj.draw();

    return horizonLineObj;
};

export default HorizonLine;