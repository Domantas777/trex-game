import { CollisionBox, getRandomNum } from '../helpers/helpers';

/**
 * Obstacle definitions.
 * minGap: minimum pixel space betweeen obstacles.
 * multipleSpeed: Speed at which multiples are allowed.
 * speedOffset: speed faster / slower than the horizon.
 * minSpeed: Minimum speed which the obstacle can make an appearance.
 */

function Obstacle(canvasCtx, type, spriteImgPos, dimensions, gapCoefficient, speed, opt_xOffset, Runner) {
    let obstacleObject = {
        MAX_OBSTACLE_LENGTH: 3,
        MAX_GAP_COEFFICIENT: 1.5,
        canvasCtx,
        spritePos: spriteImgPos,
        typeConfig: type,
        gapCoefficient,
        size: getRandomNum(1, 3),
        dimensions,
        remove: false,
        xPos: dimensions.WIDTH + (opt_xOffset || 0),
        yPos: 0,
        width: 0,
        collisionBoxes: [],
        gap: 0,
        speedOffset: 0,
        currentFrame: 0,
        timer: 0,
        types: [
            {
                type: 'CACTUS_SMALL',
                width: 17,
                height: 35,
                yPos: 105,
                multipleSpeed: 4,
                minGap: 120,
                minSpeed: 0,
                collisionBoxes: [
                    CollisionBox(0, 7, 5, 27),
                    CollisionBox(4, 0, 6, 34),
                    CollisionBox(10, 4, 7, 14)
                ]
            },
            {
                type: 'CACTUS_LARGE',
                width: 25,
                height: 50,
                yPos: 90,
                multipleSpeed: 7,
                minGap: 120,
                minSpeed: 0,
                collisionBoxes: [
                    CollisionBox(0, 12, 7, 38),
                    CollisionBox(8, 0, 7, 49),
                    CollisionBox(13, 10, 10, 38)
                ]
            },
            {
                type: 'PTERODACTYL',
                width: 46,
                height: 40,
                yPos: [100, 75, 50], // Variable height.
                yPosMobile: [100, 50], // Variable height mobile.
                multipleSpeed: 999,
                minSpeed: 8.5,
                minGap: 150,
                collisionBoxes: [
                    CollisionBox(15, 15, 16, 5),
                    CollisionBox(18, 21, 24, 6),
                    CollisionBox(2, 14, 4, 3),
                    CollisionBox(6, 10, 4, 7),
                    CollisionBox(10, 8, 6, 9)
                ],
                numFrames: 2,
                frameRate: 1000 / 6,
                speedOffset: .8
            }
        ],
        init: function (speed) {
            this.cloneCollisionBoxes();

            // Only allow sizing if we're at the right speed.
            if (this.size > 1 && this.typeConfig.multipleSpeed > speed) {
                this.size = 1;
            }

            this.width = this.typeConfig.width * this.size;

            // Check if obstacle can be positioned at various heights.
            if (Array.isArray(this.typeConfig.yPos)) {
                let yPosConfig = Runner.IS_MOBILE ? this.typeConfig.yPosMobile : this.typeConfig.yPos;
                this.yPos = yPosConfig[getRandomNum(0, yPosConfig.length - 1)];
            } else {
                this.yPos = this.typeConfig.yPos;
            }

            this.draw();

            // Make collision box adjustments,
            // Central box is adjusted to the size as one box.
            //      ____        ______        ________
            //    _|   |-|    _|     |-|    _|       |-|
            //   | |<->| |   | |<--->| |   | |<----->| |
            //   | | 1 | |   | |  2  | |   | |   3   | |
            //   |_|___|_|   |_|_____|_|   |_|_______|_|
            //
            if (this.size > 1) {
                this.collisionBoxes[1].width = this.width - this.collisionBoxes[0].width - this.collisionBoxes[2].width;
                this.collisionBoxes[2].x = this.width - this.collisionBoxes[2].width;
            }

            // For obstacles that go at a different speed from the horizon.
            if (this.typeConfig.speedOffset) {
                this.speedOffset = Math.random() > 0.5 ? this.typeConfig.speedOffset : -this.typeConfig.speedOffset;
            }

            this.gap = this.getGap(this.gapCoefficient, speed);
        },

        /**
         * Draw and crop based on size.
         */
        draw: function () {
            let sourceWidth = this.typeConfig.width;
            let sourceHeight = this.typeConfig.height;

            if (Runner.IS_HIDPI) {
                sourceWidth = sourceWidth * 2;
                sourceHeight = sourceHeight * 2;
            }

            // X position in sprite.
            let sourceX = (sourceWidth * this.size) * (0.5 * (this.size - 1)) + this.spritePos.x;

            // Animation frames.
            if (this.currentFrame > 0) {
                sourceX += sourceWidth * this.currentFrame;
            }

            this.canvasCtx.drawImage(
                Runner.imageSprite,
                sourceX, this.spritePos.y,
                sourceWidth * this.size, sourceHeight,
                this.xPos, this.yPos,
                this.typeConfig.width * this.size, this.typeConfig.height
            );
        },

        /**
         * Obstacle frame update.
         * @param {number} deltaTime
         * @param {number} speed
         */
        update: function (deltaTime, speed) {
            if (!this.remove) {
                if (this.typeConfig.speedOffset) {
                    speed += this.speedOffset;
                }
                this.xPos -= Math.floor((speed * Runner.FPS / 1000) * deltaTime);

                // Update frame
                if (this.typeConfig.numFrames) {
                    this.timer += deltaTime;
                    if (this.timer >= this.typeConfig.frameRate) {
                        this.currentFrame = this.currentFrame === this.typeConfig.numFrames - 1 ? 0 : this.currentFrame + 1;
                        this.timer = 0;
                    }
                }
                this.draw();

                if (!this.isVisible()) {
                    this.remove = true;
                }
            }
        },

        /**
         * Calculate a random gap size.
         * - Minimum gap gets wider as speed increses
         */
        getGap: function (gapCoefficient, speed) {
            let minGap = Math.round(this.width * speed + this.typeConfig.minGap * gapCoefficient);
            let maxGap = Math.round(minGap * this.MAX_GAP_COEFFICIENT);
            return getRandomNum(minGap, maxGap);
        },

        /**
         * Check if obstacle is visible.
         * @return {boolean} Whether the obstacle is in the game area.
         */
        isVisible: function () {
            return this.xPos + this.width > 0;
        },

        /**
         * Make a copy of the collision boxes, since these will change based on
         * obstacle type and size.
         */
        cloneCollisionBoxes: function () {
            let collisionBoxes = this.typeConfig.collisionBoxes;

            for (let i = collisionBoxes.length - 1; i >= 0; i--) {
                this.collisionBoxes[i] = CollisionBox(collisionBoxes[i].x, collisionBoxes[i].y, collisionBoxes[i].width, collisionBoxes[i].height);
            }
        }
    }

    obstacleObject.init(speed);

    return obstacleObject;
};

export default Obstacle;