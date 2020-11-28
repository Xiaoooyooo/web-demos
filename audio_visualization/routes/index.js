const Router = require('koa-router')

const index = new Router({
  prefix: '/'
})

const {
  getFile
} = require('../functions')

index.get('/', async (ctx, next) => {
  ctx.set("Content-Type", "text/html")
  ctx.body = await getFile('pages/index.html')
})
index.get('favicon.ico', async (ctx, next) => {
  ctx.set("content-type",'image/x-icon')
  ctx.body = await getFile('pages/favicon.ico')
})

module.exports = index