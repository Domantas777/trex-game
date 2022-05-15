export const CollisionBox = (x, y, w, h) => ({ x, y, width: w, height: h });

function createAdjustedCollisionBox(box, adjustment) {
    return CollisionBox(
        box.x + adjustment.x,
        box.y + adjustment.y,
        box.width,
        box.height
    );
};

function drawCollisionBoxes(canvasCtx, tRexBox, obstacleBox) {
    canvasCtx.save();
    canvasCtx.strokeStyle = '#f00';
    canvasCtx.strokeRect(tRexBox.x, tRexBox.y, tRexBox.width, tRexBox.height);

    canvasCtx.strokeStyle = '#0f0';
    canvasCtx.strokeRect(obstacleBox.x, obstacleBox.y, obstacleBox.width, obstacleBox.height);
    canvasCtx.restore();
};

function boxCompare(tRexBox, obstacleBox) {
    let crashed = false;
    // Axis-Aligned Bounding Box method.
    if (tRexBox.x < obstacleBox.x + obstacleBox.width &&
        tRexBox.x + tRexBox.width > obstacleBox.x &&
        tRexBox.y < obstacleBox.y + obstacleBox.height &&
        tRexBox.height + tRexBox.y > obstacleBox.y) {
        crashed = true;
    }
    return crashed;
};

export const vibrate = (duration, IS_MOBILE) => {
    if (IS_MOBILE && window.navigator.vibrate) {
        window.navigator.vibrate(duration);
    }
};

export const getRandomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const createCanvas = (container, width, height, opt_classname, Runner) => {
    let canvas = document.createElement('canvas');
    canvas.className = opt_classname ? Runner.classes.CANVAS + ' ' + opt_classname : Runner.classes.CANVAS;
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);

    return canvas;
};

export const decodeBase64ToArrayBuffer = (base64String) => {
    let len = (base64String.length / 4) * 3;
    let str = atob(base64String);
    let arrayBuffer = new ArrayBuffer(len);
    let bytes = new Uint8Array(arrayBuffer);

    for (let i = 0; i < len; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes.buffer;
}

export const getTimeStamp = () => {
    return new Date().getTime();
};

export const checkForCollision = (obstacle, tRex, opt_canvasCtx) => {
    // Adjustments are made to the bounding box as there is a 1 pixel white
    // border around the t-rex and obstacles.
    let tRexBox = CollisionBox(tRex.xPos + 1, tRex.yPos + 1, tRex.config.WIDTH - 2, tRex.config.HEIGHT - 2);
    let obstacleBox = CollisionBox(obstacle.xPos + 1, obstacle.yPos + 1, obstacle.typeConfig.width * obstacle.size - 2, obstacle.typeConfig.height - 2);

    // Debug outer box
    if (opt_canvasCtx) {
        drawCollisionBoxes(opt_canvasCtx, tRexBox, obstacleBox);
    }

    // Simple outer bounds check.
    if (boxCompare(tRexBox, obstacleBox)) {
        let collisionBoxes = obstacle.collisionBoxes;
        let tRexCollisionBoxes = tRex.ducking ? tRex.collisionBoxes.DUCKING : tRex.collisionBoxes.RUNNING;

        // Detailed axis aligned box check.
        for (let t = 0; t < tRexCollisionBoxes.length; t++) {
            for (let i = 0; i < collisionBoxes.length; i++) {
                // Adjust the box to actual positions.
                let adjTrexBox = createAdjustedCollisionBox(tRexCollisionBoxes[t], tRexBox);
                let adjObstacleBox = createAdjustedCollisionBox(collisionBoxes[i], obstacleBox);
                let crashed = boxCompare(adjTrexBox, adjObstacleBox);

                // Draw boxes for debug.
                if (opt_canvasCtx) {
                    drawCollisionBoxes(opt_canvasCtx, adjTrexBox, adjObstacleBox);
                }

                if (crashed) {
                    return [adjTrexBox, adjObstacleBox];
                }
            }
        }
    }
    return false;
};