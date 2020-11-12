let btnAdd = document.getElementById('btn-add')
let btnConfirm = document.getElementById('btn-confirm')
let btnCancel = document.getElementById('btn-cancel')

let mainPage = document.getElementById('main')
let editPage = document.getElementById('edit')

let removeBtn = document.querySelector('.remove')

let cardItem = document.querySelector('.card-item')
let info = document.querySelector('.info')

let QCard = document.getElementById('card-question')
let ACard = document.getElementById('card-answer')
let btnPrev = document.getElementById('btn-prev')
let btnNext = document.getElementById('btn-next')

let btnRemoveAll = document.querySelector('.remove')

let current = -1

let memories = [{
  Q: 'Who are you?',
  A: 'Zichen Nan Gong'
}, {
  Q: 'How old are you?',
  A: 21
}]

window.onload = function () {
  if (memories == []) return
  current = 0
  info.innerHTML = `1 of ${memories.length}`
}

btnAdd.onclick = function () {
  mainPage.classList.add('main-hide')
  removeBtn.classList.add('remove-hide')
  editPage.classList.remove('edit-hide')
}
btnConfirm.onclick = function () {
  let question = document.getElementById('question')
  let answer = document.getElementById('answer')
  let Q = question.value
  let A = answer.value
  memories.push({
    Q,
    A
  })
  current = memories.length - 1
  updateCard()
  mainPage.classList.remove('main-hide')
  removeBtn.classList.remove('remove-hide')
  editPage.classList.add('edit-hide')
  question.value = ''
  answer.value = ''
}
btnCancel.onclick = function () {
  mainPage.classList.remove('main-hide')
  removeBtn.classList.remove('remove-hide')
  editPage.classList.add('edit-hide')
}

cardItem.onclick = function () {
  this.classList.toggle('show-answer')
}

function updateCard() {
  info.innerText = `${current + 1} of ${memories.length}`
  if (memories.length == 0) {
    document.getElementById('card-box').classList.add('no-card')
    return
  } else {
    document.getElementById('card-box').classList.remove('no-card')
  }
  QCard.innerText = memories[current].Q
  ACard.innerText = memories[current].A
}
btnPrev.onclick = function () {
  if (current <= 0) {
    return
  } else {
    current -= 1
    cardItem.classList.add('card-hide')
    setTimeout(() => {
      cardItem.classList.add('card-reset')
      updateCard()
      cardItem.classList.remove('show-answer')
      cardItem.classList.remove('card-hide')
      setTimeout(() => {
        cardItem.classList.remove('card-reset')
      }, 10);
    }, 300);
  }
}
btnNext.onclick = function () {
  if (current == memories.length - 1) {
    return
  } else {
    current += 1
    cardItem.classList.add('card-hide')
    setTimeout(() => {
      cardItem.classList.add('card-reset')
      updateCard()
      cardItem.classList.remove('show-answer')
      cardItem.classList.remove('card-hide')
      setTimeout(() => {
        cardItem.classList.remove('card-reset')
      }, 10);
    }, 300);
  }
}

btnRemoveAll.onclick = function () {
  memories = []
  current = -1
  updateCard()
}