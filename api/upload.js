const multer = require('koa-multer') //加载koa-multer模块
//文件上传
const dirPath = 'public/uploads/'
var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, dirPath)
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split('.')
    cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})
var upload = multer({ storage: storage })
module.exports = {
  config: {
    saveFile: upload.single('file')
  },
  post: {
    async saveFile(ctx, next) {
      ctx.body = { filename: ctx.req.file.filename, url: `http://localhost:3000/${ctx.req.file.path}` }
    }
  }
}
