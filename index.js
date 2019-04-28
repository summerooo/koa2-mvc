const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const staticServer = require('koa-static')
const Router = require('koa-router')
const path = require('path')
const relativeRouter = require('./config/router')
let { url, port } = require('./dev')

const app = new Koa()
const router = Router()
// http请求解析
app.use(bodyParser())
// 设置允许的跨域访问
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
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'multipart/form-data']
}))
// 设置服务目录
app.use(staticServer(path.join(__dirname)))
// 自动匹配status
app.use(router.allowedMethods())
// 设置接口
app.use(relativeRouter(__dirname))

app.listen(port, url)
