// 路由守卫
module.exports = (options) => {
  return async function adminauth(ctx, next) {
    console.log("session: ", ctx.session);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = {
        data: "没有登录",
      };
    }
  };
};
