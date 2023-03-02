const fs = require('fs')
const Path = require('path')
const Router = require('koa-router')

const router = Router()
module.exports = dir => {
  const relativePath = dir || Path.resolve(__dirname, '..')
  const files = fs.readdirSync(relativePath + '/api')
  const jsFiles = files.filter( f => f.endsWith('.js'))
  jsFiles.map(file => {
    let mapping = require(relativePath + '/api/' + file)
    for (let way in mapping) {
      if (way !== 'config') {
        for (let method in mapping[way]) {
          let path = '/' + file.substr(0, file.length - 3) + '/' + method
          if (mapping.config && mapping.config[method]) router[way](path, mapping.config[method], mapping[way][method])
          else router[way](path, mapping[way][method])
          console.log(path)
        }
      }
    }
  })
  return router.routes()
}
