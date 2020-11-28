// 'use strict';
var audio = document.getElementById('audio');
var canvas = document.getElementById('canvas');

(function () {
  // audio.src = "static/music/Strings For A Queen.mp3"
  // audio.src = "static/music/关于你的失效反应.mp3"
  // audio.src = "static/music/钻石星尘.mp3"
  audio.src = "static/music/繁华之处.mp3"

  let ac = new AudioContext

  let source = ac.createMediaElementSource(audio)
  let analyer = ac.createAnalyser()
  let gainNode = ac.createGain()

  gainNode.gain.value = 0.5
  source.connect(analyer)
  analyer.connect(gainNode)
  gainNode.connect(ac.destination);

  analyer.fftSize = 512
  let data = new Uint8Array(analyer.frequencyBinCount);

  let instance = null
  window.onload = changeSize;
  window.onresize = changeSize;

  function changeSize() {
    canvas.height = window.innerHeight * 0.7;
    canvas.width = window.innerWidth;
    if (instance) {
      instance.height = canvas.height
      instance.width = canvas.width
      instance.centerX = canvas.width / 2
    }
  };

  document.getElementById('start').onclick = function () {
    if (instance) {
      instance.start()
    } else {
      instance = new Vusualazition(analyer, audio, canvas);
      instance.start();
      audio.onended = instance.pause.bind(instance)
    }
  }
  document.getElementById('pause').onclick = function () {
    if (!instance) return
    instance.pause()
  }
  class Vusualazition {
    constructor(analyer, audio, canvas) {
      this.id = null
      this.analyer = analyer
      this.audio = audio
      this.ctx = canvas.getContext('2d')
      this.height = canvas.height
      this.width = canvas.width
      this.centerX = canvas.width / 2
      this.centerY = canvas.height / 2
      this.transitionArr = new Uint8Array(analyer.frequencyBinCount)
    }
    start() {
      if (this.id) return
      this.audio.play()
      this.analyer.context.resume()
      this.draw()
    }
    pause() {
      this.analyer.context.suspend()
      if (!this.id) return
      cancelAnimationFrame(this.id)
      this.id = null
    }
    draw() {
      this.analyer.getByteFrequencyData(data)
      this.ctx.fillStyle = 'line'
      this.ctx.lineWidth = 3
      this.ctx.lineCap = 'round'
      this.ctx.strokeStyle = 'rgba(255,255,255,0.7)'
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.beginPath()
      for (let i = 0; i < this.analyer.frequencyBinCount; i++) {
        //缓降效果
        if (this.transitionArr[i] <= data[i]) {
          this.transitionArr[i] = data[i]
        } else {
          this.transitionArr[i] = this.transitionArr[i] - 2 < 0 ? 0 : this.transitionArr[i] - 2
        }
        //计算左右部分坐标
        let x1 = this.centerX + i * this.width / this.analyer.frequencyBinCount
        let x2 = this.centerX - i * this.width / this.analyer.frequencyBinCount
        let y1 = this.centerY - this.centerY * this.transitionArr[i] / 255
        let y2 = this.centerY + this.centerY * this.transitionArr[i] / 255
        //绘制右半部分
        this.ctx.moveTo(x1, y1)
        this.ctx.lineTo(x1, y2)
        //绘制左半部分
        this.ctx.moveTo(x2,y1)
        this.ctx.lineTo(x2,y2)
      }
      this.ctx.closePath()
      this.ctx.stroke()
      this.id = requestAnimationFrame(this.draw.bind(this));
    }
  }
})()