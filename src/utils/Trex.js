import { getTimeStamp } from '../helpers/helpers';
import { CollisionBox } from '../helpers/helpers';

function Trex(canvas, spritePos, Runner) {
    let trexObject = {
        canvas,
        canvasCtx: canvas.getContext('2d'),
        spritePos,
        xPos: 0,
        yPos: 0,
        groundYPos: 0,
        currentFrame: 0,
        currentAnimFrames: [],
        blinkDelay: 0,
        blinkCount: 0,
        animStartTime: 0,
        timer: 0,
        msPerFrame: 1000 / Runner.FPS,
        config: {
            DROP_VELOCITY: -5,
            GRAVITY: 0.6,
            HEIGHT: 47,
            HEIGHT_DUCK: 25,
            INITIAL_JUMP_VELOCITY: -10,
            INTRO_DURATION: 1500,
            MAX_JUMP_HEIGHT: 30,
            MIN_JUMP_HEIGHT: 30,
            SPEED_DROP_COEFFICIENT: 3,
            SPRITE_WIDTH: 262,
            START_X_POS: 50,
            WIDTH: 44,
            WIDTH_DUCK: 59
        },
        collisionBoxes: {
            DUCKING: [
                CollisionBox(1, 18, 55, 25)
            ],
            RUNNING: [
                CollisionBox(22, 0, 17, 16),
                CollisionBox(1, 18, 30, 9),
                CollisionBox(10, 35, 14, 8),
                CollisionBox(1, 24, 29, 5),
                CollisionBox(5, 30, 21, 4),
                CollisionBox(9, 34, 15, 4)
            ]
        },
        statuses: {
            CRASHED: 'CRASHED',
            DUCKING: 'DUCKING',
            JUMPING: 'JUMPING',
            RUNNING: 'RUNNING',
            WAITING: 'WAITING'
        },
        status: 'WAITING',
        jumping: false,
        ducking: false,
        jumpVelocity: 0,
        reachedMinHeight: false,
        speedDrop: false,
        jumpCount: 0,
        jumpspotX: 0,
        BLINK_TIMING: 7000,
        animFrames: {
            WAITING: {
                frames: [44, 0],
                msPerFrame: 1000 / 3
            },
            RUNNING: {
                frames: [88, 132],
                msPerFrame: 1000 / 12
            },
            CRASHED: {
                frames: [220],
                msPerFrame: 1000 / 60
            },
            JUMPING: {
                frames: [0],
                msPerFrame: 1000 / 60
            },
            DUCKING: {
                frames: [264, 323],
                msPerFrame: 1000 / 8
            }
        },
        /**
         * T-rex player initaliser.
         * Sets the t-rex to blink at random intervals.
         */
        init: function () {
            this.groundYPos = Runner.defaultDimensions.HEIGHT - this.config.HEIGHT - Runner.config.BOTTOM_PAD;
            this.yPos = this.groundYPos;
            this.minJumpHeight = this.groundYPos - this.config.MIN_JUMP_HEIGHT;

            this.draw(0, 0);
            this.update(0, this.status.WAITING);
        },

        /**
         * Setter for the jump velocity.
         * The approriate drop velocity is also set.
         */
        setJumpVelocity: function (setting) {
            this.config.INITIAL_JUMP_VELOCITY = -setting;
            this.config.DROP_VELOCITY = -setting / 2;
        },

        /**
         * Set the animation status.
         * @param {!number} deltaTime
         * @param {this.statuses} status Optional status to switch to.
         */
        update: function (deltaTime, opt_status) {
            this.timer += deltaTime;

            // Update the status.
            if (opt_status) {
                this.status = opt_status;
                this.currentFrame = 0;
                this.msPerFrame = this.animFrames[opt_status].msPerFrame;
                this.currentAnimFrames = this.animFrames[opt_status].frames;

                if (opt_status == this.statuses.WAITING) {
                    this.animStartTime = getTimeStamp();
                    this.setBlinkDelay();
                }
            }

            // Game intro animation, T-rex moves in from the left.
            if (this.playingIntro && this.xPos < this.config.START_X_POS) {
                this.xPos += Math.round((this.config.START_X_POS / this.config.INTRO_DURATION) * deltaTime);
            }

            if (this.status == this.statuses.WAITING) {
                this.blink(getTimeStamp());
            } else {
                this.draw(this.currentAnimFrames[this.currentFrame], 0);
            }

            // Update the frame position.
            if (this.timer >= this.msPerFrame) {
                this.currentFrame = this.currentFrame === this.currentAnimFrames.length - 1 ? 0 : this.currentFrame + 1;
                this.timer = 0;
            }

            // Speed drop becomes duck if the down key is still being pressed.
            if (this.speedDrop && this.yPos === this.groundYPos) {
                this.speedDrop = false;
                this.setDuck(true);
            }
        },

        /**
         * Draw the t-rex to a particular position.
         * @param {number} x
         * @param {number} y
         */
        draw: function (x, y) {
            let sourceX = x;
            let sourceY = y;
            let sourceWidth = this.ducking && this.status != this.statuses.CRASHED ? this.config.WIDTH_DUCK : this.config.WIDTH;
            let sourceHeight = this.config.HEIGHT;

            if (Runner.IS_HIDPI) {
                sourceX *= 2;
                sourceY *= 2;
                sourceWidth *= 2;
                sourceHeight *= 2;
            }

            // Adjustments for sprite sheet position.
            sourceX += this.spritePos.x;
            sourceY += this.spritePos.y;

            // Ducking.
            if (this.ducking && this.status !== this.statuses.CRASHED) {
                this.canvasCtx.drawImage(Runner.imageSprite, sourceX, sourceY,
                    sourceWidth, sourceHeight,
                    this.xPos, this.yPos,
                    this.config.WIDTH_DUCK, this.config.HEIGHT);
            } else {
                // Crashed whilst ducking. Trex is standing up so needs adjustment.
                if (this.ducking && this.status == this.statuses.CRASHED) {
                    this.xPos++;
                }
                // Standing / running
                this.canvasCtx.drawImage(Runner.imageSprite, sourceX, sourceY,
                    sourceWidth, sourceHeight,
                    this.xPos, this.yPos,
                    this.config.WIDTH, this.config.HEIGHT);
            }
        },

        /**
         * Sets a random time for the blink to happen.
         */
        setBlinkDelay: function () {
            this.blinkDelay = Math.ceil(Math.random() * this.BLINK_TIMING);
        },

        /**
         * Make t-rex blink at random intervals.
         * @param {number} time Current time in milliseconds.
         */
        blink: function (time) {
            let deltaTime = time - this.animStartTime;

            if (deltaTime >= this.blinkDelay) {
                this.draw(this.currentAnimFrames[this.currentFrame], 0);

                if (this.currentFrame == 1) {
                    // Set new random delay to blink.
                    this.setBlinkDelay();
                    this.animStartTime = time;
                    this.blinkCount++;
                }
            }
        },

        /**
         * Initialise a jump.
         * @param {number} speed
         */
        startJump: function (speed) {
            if (!this.jumping) {
                this.update(0, this.statuses.JUMPING);
                // Tweak the jump velocity based on the speed.
                this.jumpVelocity = this.config.INITIAL_JUMP_VELOCITY - (speed / 10);
                this.jumping = true;
                this.reachedMinHeight = false;
                this.speedDrop = false;
            }
        },

        /**
         * Jump is complete, falling down.
         */
        endJump: function () {
            if (this.reachedMinHeight &&
                this.jumpVelocity < this.config.DROP_VELOCITY) {
                this.jumpVelocity = this.config.DROP_VELOCITY;
            }
        },

        /**
         * Update frame for a jump.
         * @param {number} deltaTime
         * @param {number} speed
         */
        updateJump: function (deltaTime, speed) {
            let msPerFrame = this.animFrames[this.status].msPerFrame;
            let framesElapsed = deltaTime / msPerFrame;

            // Speed drop makes Trex fall faster.
            if (this.speedDrop) {
                this.yPos += Math.round(this.jumpVelocity * this.config.SPEED_DROP_COEFFICIENT * framesElapsed);
            } else {
                this.yPos += Math.round(this.jumpVelocity * framesElapsed);
            }

            this.jumpVelocity += this.config.GRAVITY * framesElapsed;

            // Minimum height has been reached.
            if (this.yPos < this.minJumpHeight || this.speedDrop) {
                this.reachedMinHeight = true;
            }

            // Reached max height
            if (this.yPos < this.config.MAX_JUMP_HEIGHT || this.speedDrop) {
                this.endJump();
            }

            // Back down at ground level. Jump completed.
            if (this.yPos > this.groundYPos) {
                this.reset();
                this.jumpCount++;
            }

            this.update(deltaTime);
        },

        /**
         * Set the speed drop. Immediately cancels the current jump.
         */
        setSpeedDrop: function () {
            this.speedDrop = true;
            this.jumpVelocity = 1;
        },

        /**
         * @param {boolean} isDucking.
         */
        setDuck: function (isDucking) {
            if (isDucking && this.status != this.statuses.DUCKING) {
                this.update(0, this.statuses.DUCKING);
                this.ducking = true;
            } else if (this.status == this.statuses.DUCKING) {
                this.update(0, this.statuses.RUNNING);
                this.ducking = false;
            }
        },

        /**
         * Reset the t-rex to running at start of game.
         */
        reset: function () {
            this.yPos = this.groundYPos;
            this.jumpVelocity = 0;
            this.jumping = false;
            this.ducking = false;
            this.update(0, this.statuses.RUNNING);
            this.midair = false;
            this.speedDrop = false;
            this.jumpCount = 0;
        }
    };

    trexObject.init();

    return trexObject;
};

export default Trex;