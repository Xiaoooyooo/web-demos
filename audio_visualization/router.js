const Router = require('koa-router')

const router = new Router

const index = require('./routes/index')
const notfound = require('./routes/notfound')
const static = require('./routes/static')

router.all('(.*)', async (ctx, next) => {
  console.log(ctx.path)
  await next()
})

//主页路由
router.use(index.routes(), index.allowedMethods())
//静态资源路由
router.use(static.routes(), static.allowedMethods())
//错误请求路由
router.use(notfound.routes(), notfound.allowedMethods())

module.exports = router