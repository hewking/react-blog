'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const { ctx } = this;
    ctx.body = 'api hi！';
  }

  async getAriticleList() {
    const { ctx } = this;

    // 查询文章列表，通过左连接查询
    const sql = 'SELECT a.id as id,' +
      'a.title as title,' +
      'a.introduce as introduce,' +
      'a.addTime as addTime,' +
      'a.view_count as view_count,' +
      'b.typeName as typeName ' +
      'FROM article a LEFT JOIN type b ON a.type_id = b.id';

    const results = await ctx.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async list() {
    const { ctx } = this;
    ctx.body = 'hewking blog list';
  }

}

module.exports = HomeController;
