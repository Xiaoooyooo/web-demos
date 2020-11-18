'use strict'
//鼠标动效
let body = document.querySelector('body')
let bg = document.querySelector('.bg')

let bgCenter = {
  X: body.clientWidth / 2,
  Y: body.clientHeight / 2,
  reset: function (x, y) {
    this.X = x / 2
    this.Y = y / 2
  }
}
window.onresize = function () {
  bgCenter.reset(body.clientWidth, body.clientHeight)
}
body.onmouseenter = function (e) {
  let xx = e.clientX < bgCenter.X,
    xxx = false,
    yy = e.clientY < bgCenter.Y,
    yyy = false
  this.onmousemove = function (e) {
    let dx = e.clientX - bgCenter.X,
      dy = e.clientY - bgCenter.Y
    if (!xxx) xxx = (e.clientX < bgCenter.X) == xx ? false : true
    if (!yyy) yyy = (e.clientY < bgCenter.Y) == yy ? false : true
    bg.style = `background-position: ${xxx ? 50 + 5 * dx / bgCenter.X : 50}% ${yyy ? 50 + 5 * dy / bgCenter.Y : 50}%`
  }
}
body.onmouseleave = function () {
  bg.classList.add('bg-reset')
  bg.style = `background-position: center;`
  this.onmousemove = null
  setTimeout(() => {
    bg.classList.remove('bg-reset')
  }, 500)
}

//播放列表
const root = 'https://xiaoooyooo.site/sonder/music/'
let music = {
  list: ['你那边还好吗.mp3', 'RainySeason.mp3'],
  current: 0
}
//播放器对象
let playerControler = {
  audio: document.getElementById('audio'),
  playPause: document.getElementById('play-pause'),
  prevSong: document.getElementById('prev'),
  nextSong: document.getElementById('next'),
  volumeBtn: document.querySelector('input[type="range"]'),
  volume: 0.5,
  changeVolume: function () {
    this.audio.volume = this.volume
  },
  progressBar: document.querySelector('.current'),
  continue: true,
  loop: false
}

//播放暂停点击
let timer
playerControler.playPause.onclick = function () {
  let audio = playerControler.audio
  if (timer) {
    clearInterval(timer)
  }
  if (this.classList.contains('play')) {
    this.classList.remove('play')
    timer = setInterval(() => {
      if (audio.volume - 0.05 <= 0) {
        audio.pause()
        clearInterval(timer)
      } else {
        audio.volume -= 0.05
      }
    }, 50);
  } else {
    this.classList.add('play')
    audio.play()
    timer = setInterval(() => {
      if (audio.volume + 0.05 >= playerControler.volume) {
        clearInterval(timer)
      } else {
        audio.volume += 0.05
      }
    }, 50);
  }
}
/**
 * 切换音乐
 */
function changeMusic(type) {
  return function () {
    if (type == 1) {
      //下一首
      if (music.current + 1 > music.list.length - 1) {
        music.current = 0
      } else {
        music.current++
      }
    } else if (type == -1) {
      //上一首
      if (music.current - 1 < 0) {
        music.current = music.list.length - 1
      } else {
        music.current--
      }
    }
    playerControler.audio.src = `${root}${music.list[music.current]}`
    playerControler.audio.play()
  }
}
//上一首
playerControler.prevSong.onclick = changeMusic(-1)
//下一首
playerControler.nextSong.onclick = changeMusic(1)
//播放开始时
playerControler.audio.onplay = function () {
  playerControler.playPause.classList.add('play')
}
//播放暂停时
playerControler.audio.onpause = function () {
  playerControler.playPause.classList.remove('play')
}
//播放完毕后
playerControler.audio.onended = function () {
  if (playerControler.loop) {
    this.play()
    return
  }
  playerControler.playPause.classList.remove('play')
  if (playerControler.continue) {
    if (music.current + 1 > music.list.length - 1) {
      music.current = 0
    } else {
      music.current += 1
    }
    this.src = `${root}${music.list[music.current]}`
    //连续播放
    this.play()
  }
}

//播放进度
playerControler.audio.ontimeupdate = function () {
  playerControler.progressBar.style.width = `${100 * this.currentTime / this.duration}%`
}
//点击更改播放进度
document.querySelector('.duration').onclick = function (e) {
  playerControler.audio.currentTime = playerControler.audio.duration * e.offsetX / this.clientWidth
}
//音量
playerControler.volumeBtn.onmousedown = function () {
  this.onmousemove = function () {
    playerControler.volume = this.value / 100
    playerControler.changeVolume()
  }
}
playerControler.volumeBtn.onmouseup = function () {
  this.onmousemove = null
}
playerControler.volumeBtn.onchange = function () {
  playerControler.volume = this.value / 100
  playerControler.changeVolume()
}
playerControler.audio.src = `${root}${music.list[music.current]}`
playerControler.audio.volume = playerControler.volume