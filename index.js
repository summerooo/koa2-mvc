const Koa = require('koa')
var bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
var staticServer = require('koa-static')
const Router = require('koa-router')
var path = require('path')
var fs = require('fs')
const relativeRouter = require('./config/router')

const app = new Koa()
const router = Router()
app.use(bodyParser())
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return '*'
      }
      return 'http://localhost:9527'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))
app.use(staticServer(path.join(__dirname)))
// app.use(relativeRouter(__dirname)) = .use(router.routes())
app.use(relativeRouter(__dirname))
app.use(router.allowedMethods())
// router.post('/', async (ctx, next) => {
//   console.log(ctx)
//   ctx.body = await Promise.resolve(questions)
// })
// // var hash, keylist
// router.post('/g', async (ctx, next) => {
//   console.log(ctx.query)
//   console.log(ctx.request.body)
//   ctx.body = await Promise.resolve(questions)
// })
app.listen(3000)