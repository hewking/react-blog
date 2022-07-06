// let ipUrl = 'http://127.0.0.1:7001/admin/';
// let ipUrl = 'http://localhost:7001/admin/'
let ipUrl = "http://119.29.195.26:7001/admin/";

let servicePath = {
  checkLogin: ipUrl + "checkLogin",
  getTypeInfo: ipUrl + "getTypeInfo",
  addArticle: ipUrl + "addArticle",
  updateArticle: ipUrl + "updateArticle",
  getAriticleList: ipUrl + "getAriticleList",
  deleteArticle: ipUrl + "deleteArticle/",
  getArticleById: ipUrl + "getArticleById/",
};

export default servicePath;
