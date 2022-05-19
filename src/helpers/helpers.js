export const CollisionBox = (x, y, w, h) => ({ x, y, width: w, height: h });

function createAdjustedCollisionBox(box, adjustment) {
  return CollisionBox(
    box.x + adjustment.x,
    box.y + adjustment.y,
    box.width,
    box.height
  );
}

function drawCollisionBoxes(canvasCtx, tRexBox, obstacleBox) {
  canvasCtx.save();
  canvasCtx.strokeStyle = "#f00";
  canvasCtx.strokeRect(tRexBox.x, tRexBox.y, tRexBox.width, tRexBox.height);

  canvasCtx.strokeStyle = "#0f0";
  canvasCtx.strokeRect(
    obstacleBox.x,
    obstacleBox.y,
    obstacleBox.width,
    obstacleBox.height
  );
  canvasCtx.restore();
}

function boxCompare(tRexBox, obstacleBox) {
  let crashed = false;
  // Axis-Aligned Bounding Box method.
  if (
    tRexBox.x < obstacleBox.x + obstacleBox.width &&
    tRexBox.x + tRexBox.width > obstacleBox.x &&
    tRexBox.y < obstacleBox.y + obstacleBox.height &&
    tRexBox.height + tRexBox.y > obstacleBox.y
  ) {
    crashed = true;
  }
  return crashed;
}

export const vibrate = (duration, IS_MOBILE) => {
  if (IS_MOBILE && window.navigator.vibrate) {
    window.navigator.vibrate(duration);
  }
};

export const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createCanvas = (
  container,
  width,
  height,
  opt_classname,
  Runner
) => {
  let canvas = document.createElement("canvas");
  canvas.className = opt_classname
    ? Runner.classes.CANVAS + " " + opt_classname
    : Runner.classes.CANVAS;
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
};

export const getTimeStamp = () => {
  return new Date().getTime();
};
