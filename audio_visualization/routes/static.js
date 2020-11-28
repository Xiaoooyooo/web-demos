const Router = require('koa-router')

const static = new Router({
  prefix: '/static'
})
const {
  getFile
} = require('../functions')

static.get('(.*)', async (ctx, next) => {
  let path = ctx.path
  if (path.endsWith('js')) {
    ctx.set("Content-Type", "application/javascript")
    ctx.body = await getFile(`.${path}`)
  } else if (path.endsWith('css')) {
    ctx.set('Content-Type', 'text/css')
    ctx.body = await getFile(`.${path}`)
  } else if (path.endsWith('mp3') || path.endsWith('flac')) {
    if(path.endsWith('mp3')){
      ctx.set("content-type", "audio/mpeg")
    }else if(path.endsWith('flac')){
      ctx.set("content-type", "audio/x-flac")
    }
    ctx.body = await getFile(`.${decodeURI(path)}`)
  }else if(path.endsWith('jpg') || path.endsWith('jpeg')){
    ctx.set('content-type','image/jpg')
    ctx.body = await getFile(`.${path}`)
  }
})

module.exports = static