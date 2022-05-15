import { getRandomNum } from '../helpers/helpers';

function Cloud(canvas, spritePos, containerWidth, Runner) {
    let cloudObject = {
        canvas,
        canvasCtx: canvas.getContext('2d'),
        spritePos,
        containerWidth,
        xPos: containerWidth,
        yPos: 0,
        remove: false,
        config: {
            HEIGHT: 14,
            MAX_CLOUD_GAP: 400,
            MAX_SKY_LEVEL: 30,
            MIN_CLOUD_GAP: 100,
            MIN_SKY_LEVEL: 71,
            WIDTH: 46
        },
        cloudGap: getRandomNum(100, 400),
        init: function () {
            this.yPos = getRandomNum(this.config.MAX_SKY_LEVEL, this.config.MIN_SKY_LEVEL);
            this.draw();
        },

        /**
         * Draw the cloud.
         */
        draw: function () {
            this.canvasCtx.save();
            let sourceWidth = this.config.WIDTH;
            let sourceHeight = this.config.HEIGHT;

            if (Runner.IS_HIDPI) {
                sourceWidth = sourceWidth * 2;
                sourceHeight = sourceHeight * 2;
            }

            this.canvasCtx.drawImage(
                Runner.imageSprite, this.spritePos.x,
                this.spritePos.y,
                sourceWidth, sourceHeight,
                this.xPos, this.yPos,
                this.config.WIDTH, this.config.HEIGHT
            );

            this.canvasCtx.restore();
        },

        /**
         * Update the cloud position.
         * @param {number} speed
         */
        update: function (speed) {
            if (!this.remove) {
                this.xPos -= Math.ceil(speed);
                this.draw();

                // Mark as removeable if no longer in the canvas.
                if (!this.isVisible()) {
                    this.remove = true;
                }
            }
        },

        /**
         * Check if the cloud is visible on the stage.
         * @return {boolean}
         */
        isVisible: function () {
            return this.xPos + this.config.WIDTH > 0;
        }
    };

    cloudObject.init();

    return cloudObject;
};

export default Cloud;