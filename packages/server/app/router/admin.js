module.exports = (app) => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get("/admin/index", controller.admin.main.index);
  router.post("/admin/checkLogin", controller.admin.main.checkLogin);
  router.get(
    "/admin/getTypeInfo",
    adminauth,
    controller.admin.main.getTypeInfo
  );
  router.post("/admin/addArticle", adminauth, controller.admin.main.addArticle);
  router.post(
    "/admin/updateArticle",
    adminauth,
    controller.admin.main.updateArticle
  );
  router.get(
    "/admin/getAriticleList",
    adminauth,
    controller.admin.main.getAriticleList
  );
  router.get(
    "/admin/deleteArticle/:id",
    adminauth,
    controller.admin.main.deleteArticle
  );
  router.get("/admin/getArticleById/:id", controller.admin.main.getArticleById);
};
