const Router = require('koa-router')

const notfound = new Router({
  prefix: '(.*)'
})

const {
  getFile
} = require('../functions')

notfound.get('(.*)', async (ctx, next) => {
  ctx.set("Content-Type", 'text/html')
  ctx.status = 404
  ctx.body = await getFile('pages/notFound.html')
})

module.exports = notfound