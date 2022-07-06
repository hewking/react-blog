"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/default/index", controller.default.home.index);
  // 配置id query 参数
  router.get(
    "/default/getArticleById/:id",
    controller.default.home.getArticleById
  );
  router.get(
    "/default/getAriticleList",
    controller.default.home.getAriticleList
  );
  router.get("/default/getTypeInfo", controller.default.home.getTypeInfo);
  router.get("/default/getListById/:id", controller.default.home.getListById);
};
