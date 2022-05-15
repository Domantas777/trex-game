import NightMode from './NightMode';
import Cloud from './Cloud';
import HorizonLine from './HorizonLine';
import Obstacle from './Obstacle';
import { getRandomNum, CollisionBox } from '../helpers/helpers';

/**
 * Horizon background class.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} spritePos Sprite positioning.
 * @param {Object} dimensions Canvas dimensions.
 * @param {number} gapCoefficient
 * @constructor
 */
function Horizon(canvas, spritePos, dimensions, gapCoefficient, Runner) {
    let horizonObj = {
        canvas,
        canvasCtx: canvas.getContext('2d'),
        config: {
            BG_CLOUD_SPEED: 0.2,
            BUMPY_THRESHOLD: .3,
            CLOUD_FREQUENCY: .5,
            HORIZON_HEIGHT: 16,
            MAX_CLOUDS: 6
        },
        obstacleTypes: [
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
        dimensions,
        gapCoefficient,
        obstacles: [],
        obstacleHistory: [],
        horizonOffsets: [0, 0],
        cloudFrequency: .5,
        spritePos: spritePos,
        nightMode: null,
        clouds: [],
        cloudSpeed: 0.2,
        horizonLine: null,
        /**
         * Initialise the horizon. Just add the line and a cloud. No obstacles.
         */
        init: function () {
            this.addCloud();
            this.horizonLine = HorizonLine(this.canvas, this.spritePos.HORIZON, Runner);
            this.nightMode = NightMode(this.canvas, this.spritePos.MOON, this.dimensions.WIDTH, Runner);
        },

        /**
         * @param {number} deltaTime
         * @param {number} currentSpeed
         * @param {boolean} updateObstacles Used as an override to prevent
         *     the obstacles from being updated / added. This happens in the
         *     ease in section.
         * @param {boolean} showNightMode Night mode activated.
         */
        update: function (deltaTime, currentSpeed, updateObstacles, showNightMode) {
            this.runningTime += deltaTime;
            this.horizonLine.update(deltaTime, currentSpeed);
            this.nightMode.update(showNightMode);
            this.updateClouds(deltaTime, currentSpeed);

            if (updateObstacles) {
                this.updateObstacles(deltaTime, currentSpeed);
            }
        },

        /**
         * Update the cloud positions.
         * @param {number} deltaTime
         * @param {number} currentSpeed
         */
        updateClouds: function (deltaTime, speed) {
            let cloudSpeed = this.cloudSpeed / 1000 * deltaTime * speed;
            let numClouds = this.clouds.length;

            if (numClouds) {
                for (let i = numClouds - 1; i >= 0; i--) {
                    this.clouds[i].update(cloudSpeed);
                }

                let lastCloud = this.clouds[numClouds - 1];

                // Check for adding a new cloud.
                if (numClouds < this.config.MAX_CLOUDS &&
                    (this.dimensions.WIDTH - lastCloud.xPos) > lastCloud.cloudGap && this.cloudFrequency > Math.random()) {
                    this.addCloud();
                }

                // Remove expired clouds.
                this.clouds = this.clouds.filter(function (obj) {
                    return !obj.remove;
                });
            } else {
                this.addCloud();
            }
        },

        /**
         * Update the obstacle positions.
         * @param {number} deltaTime
         * @param {number} currentSpeed
         */
        updateObstacles: function (deltaTime, currentSpeed) {
            // Obstacles, move to Horizon layer.
            let updatedObstacles = this.obstacles.slice(0);

            for (let i = 0; i < this.obstacles.length; i++) {
                let obstacle = this.obstacles[i];
                obstacle.update(deltaTime, currentSpeed);

                // Clean up existing obstacles.
                if (obstacle.remove) {
                    updatedObstacles.shift();
                }
            }
            this.obstacles = updatedObstacles;

            if (this.obstacles.length > 0) {
                let lastObstacle = this.obstacles[this.obstacles.length - 1];

                if (lastObstacle && !lastObstacle.followingObstacleCreated &&
                    lastObstacle.isVisible() && (lastObstacle.xPos + lastObstacle.width + lastObstacle.gap) < this.dimensions.WIDTH) {
                    this.addNewObstacle(currentSpeed);
                    lastObstacle.followingObstacleCreated = true;
                }
            } else {
                // Create new obstacles.
                this.addNewObstacle(currentSpeed);
            }
        },

        removeFirstObstacle: function () {
            this.obstacles.shift();
        },

        /**
         * Add a new obstacle.
         * @param {number} currentSpeed
         */
        addNewObstacle: function (currentSpeed) {
            // TODO
            let obstacleTypeIndex = getRandomNum(0, this.obstacleTypes.length - 1);
            let obstacleType = this.obstacleTypes[obstacleTypeIndex];

            // Check for multiples of the same type of obstacle.
            // Also check obstacle is available at current speed.
            if (this.duplicateObstacleCheck(obstacleType.type) || currentSpeed < obstacleType.minSpeed) {
                this.addNewObstacle(currentSpeed);
            } else {
                let obstacleSpritePos = this.spritePos[obstacleType.type];

                this.obstacles.push(Obstacle(this.canvasCtx, obstacleType, obstacleSpritePos, this.dimensions,
                    this.gapCoefficient, currentSpeed, obstacleType.width, Runner));

                this.obstacleHistory.unshift(obstacleType.type);

                if (this.obstacleHistory.length > 1) {
                    this.obstacleHistory.splice(Runner.config.MAX_OBSTACLE_DUPLICATION);
                }
            }
        },

        /**
         * Returns whether the previous two obstacles are the same as the next one.
         * Maximum duplication is set in config value MAX_OBSTACLE_DUPLICATION.
         * @return {boolean}
         */
        duplicateObstacleCheck: function (nextObstacleType) {
            let duplicateCount = 0;

            for (let i = 0; i < this.obstacleHistory.length; i++) {
                duplicateCount = this.obstacleHistory[i] == nextObstacleType ? duplicateCount + 1 : 0;
            }
            return duplicateCount >= Runner.config.MAX_OBSTACLE_DUPLICATION;
        },

        /**
         * Reset the horizon layer.
         * Remove existing obstacles and reposition the horizon line.
         */
        reset: function () {
            this.obstacles = [];
            this.horizonLine.reset();
            this.nightMode.reset();
        },

        /**
         * Update the canvas width and scaling.
         * @param {number} width Canvas width.
         * @param {number} height Canvas height.
         */
        resize: function (width, height) {
            this.canvas.width = width;
            this.canvas.height = height;
        },

        /**
         * Add a new cloud to the horizon.
         */
        addCloud: function () {
            this.clouds.push(Cloud(this.canvas, this.spritePos.CLOUD, this.dimensions.WIDTH, Runner));
        }
    };

    horizonObj.init();

    return horizonObj;
};

export default Horizon;