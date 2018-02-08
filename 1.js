const Koa = require('koa')
const cors = require('koa2-cors')
var staticServer = require('koa-static')
const Router = require('koa-router')
var path = require('path')

const app = new Koa()
const router = Router()

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
var questions=[
  {
    data:213,
    num:444,
    age:12
  },
  {
    data:456,    
    num:678,
    age:13
  }
]
router.post('/', async (ctx, next) => {
  await ctx.render('aaa', {
    title: 'Hello Koa 2!'
  })
})
// var hash, keylist
router.post('/g', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
app
.use(router.routes())
.use(router.allowedMethods())
app.listen(3000)