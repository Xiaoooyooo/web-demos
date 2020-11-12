let username = document.querySelector('#username')
let email = document.querySelector('#email')
let passwd1 = document.querySelector('#passwd1')
let passwd2 = document.querySelector('#passwd2')
let submit = document.querySelector('#submit')
let isSuccess = [0, 0, 0, 0]

// username
username.addEventListener('focus', function () {
  this.classList.remove('err-input')
  this.classList.remove('success-input')
})
username.onblur = function () {
  this.nextElementSibling.classList.remove('tips')
  if (this.value == '') return
  if (this.value.length >= 3) {
    this.classList.add('success-input')
    isSuccess[0] = 1
  } else {
    this.classList.add('err-input')
    this.nextElementSibling.classList.add('tips')
    isSuccess[0] = 0
  }
}

//email
email.onfocus = function () {
  this.classList.remove('err-input')
  this.classList.remove('success-input')
}
email.onblur = function () {
  this.nextElementSibling.classList.remove('tips')
  if (this.value == '') return
  if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.value)) {
    this.classList.add('success-input')
    isSuccess[1] = 1
  } else {
    this.classList.add('err-input')
    this.nextElementSibling.classList.add('tips')
    isSuccess[1] = 0
  }
}

//password
passwd1.onfocus = function () {
  this.classList.remove('err-input')
  this.classList.remove('success-input')
}
passwd1.onblur = function () {
  this.nextElementSibling.classList.remove('tips')
  if (this.value == '') return
  if (this.value.length >= 6 && !/ /.test(this.value)) {
    this.classList.add('success-input')
    isSuccess[2] = 1
  } else {
    this.classList.add('err-input')
    this.nextElementSibling.classList.add('tips')
    isSuccess[2] = 0
  }
}

passwd2.onfocus = function () {
  this.classList.remove('err-input')
  this.classList.remove('success-input')
}
passwd2.onblur = function () {
  this.nextElementSibling.classList.remove('tips')
  if (passwd1.value === '' && this.value === '') return
  if (this.value === passwd1.value) {
    this.classList.add('success-input')
    isSuccess[3] = 1
  } else {
    this.classList.add('err-input')
    this.nextElementSibling.classList.add('tips')
    isSuccess[3] = 0
  }
}

//submit
submit.onclick = function () {
  if (isSuccess.toString() != '1,1,1,1') {
    return
  } else {
    alert('Hello World!')
  }
}