let days = document.getElementById('day')
let hours = document.getElementById('hour')
let minutes = document.getElementById('minute')
let seconds = document.getElementById('second')

let newYear = new Date(`january 01 ${new Date().getFullYear() + 1} 00:00:00`)

function updateTime(){
  let now = new Date
  let diff = newYear - now

  let d = Math.floor(diff / 1000 / 60 / 60 / 24)
  let h = Math.floor(diff / 1000 / 60 / 60) % 24
  let m = Math.floor(diff / 1000 / 60) % 60
  let s = Math.floor(diff / 1000) % 60

  days.innerText = d < 10 ? '0' + d : d
  hours.innerText = h < 10 ? '0' + h : h
  minutes.innerText = m < 10 ? '0' + m : m
  seconds.innerText = s < 10 ? '0' + s : s
}
setTimeout(()=>{
  document.querySelector('.title').classList.remove('title-hide')
}, 1000)
setTimeout(()=>{
  document.querySelector('.timer').classList.remove('timer-hide')
}, 1300)
setInterval(()=>{
  updateTime()
}, 1000)