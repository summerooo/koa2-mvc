import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import staticServer from 'koa-static'
import Router from 'koa-router'
import { resolve } from 'path'
import relativeRouter from './config/router.js'
import { url, port } from './dev.js'

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
const relativePath = resolve('./')
// 设置服务目录
app.use(staticServer(relativePath))
// 自动匹配status
app.use(router.allowedMethods())
// 设置接口
app.use(relativeRouter(relativePath))

app.listen(port, url)
