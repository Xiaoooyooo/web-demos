const Koa = require('koa')

const app = new Koa

const router = require('./router')
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    throw (err)
  }
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(8888, () => {
  console.log('App is running at port 8888.')
})