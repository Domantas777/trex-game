
function GameOverPanel(canvas, textImgPos, restartImgPos, dimensions, Runner) {
    let gameOverPanelObj = {
        canvas: canvas,
        canvasCtx: canvas.getContext('2d'),
        canvasDimensions: dimensions,
        textImgPos: textImgPos,
        restartImgPos: restartImgPos,
        dimensions: {
            TEXT_X: 0,
            TEXT_Y: 13,
            TEXT_WIDTH: 191,
            TEXT_HEIGHT: 11,
            RESTART_WIDTH: 36,
            RESTART_HEIGHT: 32
        },
        updateDimensions: function (width, opt_height) {
            this.canvasDimensions.WIDTH = width;
            if (opt_height) {
                this.canvasDimensions.HEIGHT = opt_height;
            }
        },
        draw: function () {
            let dimensions = this.dimensions;

            let centerX = this.canvasDimensions.WIDTH / 2;

            // Game over text.
            let textSourceX = dimensions.TEXT_X;
            let textSourceY = dimensions.TEXT_Y;
            let textSourceWidth = dimensions.TEXT_WIDTH;
            let textSourceHeight = dimensions.TEXT_HEIGHT;

            let textTargetX = Math.round(centerX - (dimensions.TEXT_WIDTH / 2));
            let textTargetY = Math.round((this.canvasDimensions.HEIGHT - 25) / 3);
            let textTargetWidth = dimensions.TEXT_WIDTH;
            let textTargetHeight = dimensions.TEXT_HEIGHT;

            let restartSourceWidth = dimensions.RESTART_WIDTH;
            let restartSourceHeight = dimensions.RESTART_HEIGHT;
            let restartTargetX = centerX - (dimensions.RESTART_WIDTH / 2);
            let restartTargetY = this.canvasDimensions.HEIGHT / 2;

            if (Runner.IS_HIDPI) {
                textSourceY *= 2;
                textSourceX *= 2;
                textSourceWidth *= 2;
                textSourceHeight *= 2;
                restartSourceWidth *= 2;
                restartSourceHeight *= 2;
            }

            textSourceX += this.textImgPos.x;
            textSourceY += this.textImgPos.y;

            // Game over text from sprite.
            this.canvasCtx.drawImage(
                Runner.imageSprite,
                textSourceX, textSourceY, textSourceWidth, textSourceHeight,
                textTargetX, textTargetY, textTargetWidth, textTargetHeight
            );

            // Restart button.
            this.canvasCtx.drawImage(
                Runner.imageSprite,
                this.restartImgPos.x, this.restartImgPos.y,
                restartSourceWidth, restartSourceHeight,
                restartTargetX, restartTargetY, dimensions.RESTART_WIDTH,
                dimensions.RESTART_HEIGHT
            );
        }
    };

    gameOverPanelObj.draw();

    return gameOverPanelObj;
};

export default GameOverPanel;