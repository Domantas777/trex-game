import cactusLargeImg from '../../assets/cactus_large.png'
import cactusSmallImg from '../../assets/cactus_small.png'
import cloudImg from '../../assets/cloud.png'
import coinImg from '../../assets/coin.png'
import gameoverTextImg from '../../assets/gameover_text.png'
import groundImg from '../../assets/ground.png'
import restartButtonImg from '../../assets/restart_button.png'
import scoreNumberImg from '../../assets/score_number.png'
import tRexImg from '../../assets/tRex.png'
import tRexCrashImg from '../../assets/trex_crash.png'
import tRexDuck1Img from '../../assets/trex_duck_1.png'
import tRexDuck2Img from '../../assets/trex_duck_2.png'
import tRexFistFrameImg from '../../assets/trex_first_frame.png'

const imageArray = [
  cloudImg,
  coinImg,
  tRexImg,
  tRexFistFrameImg,
  groundImg,
  cactusSmallImg,
  cactusLargeImg,
  tRexDuck1Img,
  tRexDuck2Img,
  tRexCrashImg,
  restartButtonImg,
  gameoverTextImg,
  scoreNumberImg,
]

const imageMap = new Map()

const promiseArray = imageArray.map(imgUrl => {
  const promise = new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = reject
    img.onload = () => {
      imageMap.set(imgUrl, img)
      resolve()
    }
    img.src = imgUrl
  })
  return promise
})

export function loadImages() {
  return Promise.all(promiseArray)
}

export default function getImg(src) {
  const img = imageMap.get(src)
  if (!img) {
    throw new Error(`load image fail! IMG_SRC: ${src}`)
  }
  return img
}