const url = 'https://xiaoooyooo.site/sonder/music/Strings For A Queen.mp3'

var ac = new AudioContext
var source = ac.createBufferSource()
var analyser = ac.createAnalyser()
var gain = ac.createGain()
source.connect(analyser)
analyser.connect(gain)
gain.connect(ac.destination)
gain.gain.value = 0.1

var promise = new Promise((resolve, reject) => {
    Xhr()
    resolve()
}).then((data) => {
    Analyser()
})



function Xhr() {
    var xhr = new XMLHttpRequest
    xhr.open('get', url)
    xhr.responseType = 'arraybuffer'
    xhr.send()
    xhr.onload = function () {
        ac.decodeAudioData(xhr.response, (arraybuffer) => {
            console.log('Success!')
            source.buffer = arraybuffer
            console.log(source.buffer)
        }, (err) => {
            console.log('Failed!')
        })
        source.start()
    }
}

function Analyser() {
    analyser.fftSize = 512
    var arr = new Uint8Array(analyser.frequencyBinCount)
    console.log('Analyser:', arr)

    function visualization() {
        analyser.getByteFrequencyData(arr)
        draw(arr)
        requestAnimationFrame(visualization)
    }
    requestAnimationFrame(visualization)
}

var canvas = document.querySelector('canvas')
var ctx = canvas.getContext('2d')
// ctx.strokeStyle = 'green'
var line = ctx.createLinearGradient(0, 0, 0, 400)
line.addColorStop(0, 'red')
line.addColorStop(0.5, 'yellow')
line.addColorStop(1, 'green')
ctx.fillStyle = line

function draw(arr) {
    var fbc = analyser.frequencyBinCount
    ctx.clearRect(0, 0, 800, 400)
    ctx.beginPath()
    ctx.lineJoin = 'round'
    ctx.moveTo(0,400)
    for (var i = 0; i < arr.length; i++)
    {
        var y = arr[i] / fbc * 400
        var x = i * 800 / fbc + 400 / fbc
        ctx.lineTo(x,400 - y)
    }
    ctx.closePath()
    ctx.fill()
}
