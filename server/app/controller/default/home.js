'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  
  async index() {
    const { ctx } = this;
    let result = await this.app.mysql.get("blog_content", { title: '测试文章' });
    let data = JSON.stringify(result);
    console.log("index get mysql_result" + JSON.stringify(result));
    ctx.body = data;
  }

  async list() {
    const { ctx } = this;
    ctx.body = 'hewking blog list';
  }

}

module.exports = HomeController;
