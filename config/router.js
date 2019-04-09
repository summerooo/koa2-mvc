const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

const router = Router()
module.exports = (dir) => {
    let relativePath = dir || path.resolve(__dirname, '..')
    const files = fs.readdirSync(relativePath + '/api')
    const js_files = files.filter( f => f.endsWith('.js'))
    js_files.map(x => {
      let mapping = require(relativePath + '/api/' + x)
      if ('get' in mapping) {
        for (let g in mapping.get) {
          let path = '/' + x.substr(0, x.length - 3) + '/' + g
          router.get(path, mapping.get[g])
        }
      } else console.log(x + '并没有GET')
      if ('post' in mapping) {
        for (let p in mapping.post) {
          console.log(p, 'pppp', mapping.config)
          let path = '/' + x.substr(0, x.length - 3) + '/' + p
          if (mapping.config && mapping.config[p]) router.post(path, mapping.config[p], mapping.post[p])
          else router.post(path, mapping.post[p])
        }
      } else console.log(x + '并没有post')
    })
    return router.routes()
  }
