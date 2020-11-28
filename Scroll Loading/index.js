//模拟文章
let posts = [],
  pages = 1

function loadPosts() {
  let postsContainer = document.querySelector('.posts-container')
  fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5&_page=${pages}`)
    .then(res => {
      if(res.ok){
        document.querySelector('.loading').classList.remove('show')
        return res.json()
      }
    })
    .then(json => {
      // posts.push(json)
      json.forEach(post => {
        let div = document.createElement('div')
        div.classList.add('post')
        div.innerHTML = `
        <div class="title">${post.title}</div>
        <div class="content">${post.body}</div>
        `
        postsContainer.appendChild(div)
      })
      pages++
    })
}
//初始化页面
loadPosts()

//加载动画
function showLoading(){
  document.querySelector('.loading').classList.add('show')
  loadPosts()
}
//滚动到底部加载新数据
function windowScroll(){
  let { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if(scrollTop + clientHeight > scrollHeight - 1){
      showLoading()
    }
}
document.getElementById('filter').onblur = function(){
  window.onscroll = windowScroll
}
document.getElementById('filter').onfocus = function(){
  window.onscroll = null
}
window.onscroll = windowScroll

//筛选
document.getElementById('filter').oninput = function(){
  document.querySelectorAll('.post').forEach(post => {
    if(post.innerText.indexOf(this.value) != -1){
      post.style.display = 'block'
    }else{
      post.style.display = 'none'
    }
  })
}