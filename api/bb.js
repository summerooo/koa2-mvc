export default {
  get: {
    async gg (ctx, next) {
      ctx.body = {'blackblackblackblackblack': ctx.query, 'b': ctx.request.body}
      console.log(ctx.query)
      console.log(ctx.request.body)
    }
  },
  post: {
    async pp (ctx, next) {
      ctx.body = {'redredredredredredred': ctx.query, 'b' : ctx.request.body}
      console.log('redredredredredredred')
      console.log(ctx.query)
      console.log(ctx.request.body)
    }
  }
}