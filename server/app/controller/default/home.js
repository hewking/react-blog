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
      // 时间戳转换为日期
      // "FROM_UNIXTME(a.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
      "a.addTime as addTime," +
      'a.view_count as view_count,' +
      'b.typeName as typeName ' +
      'FROM article a LEFT JOIN type b ON a.type_id = b.id';

    const results = await ctx.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async getArticleById(){

    let id = this.ctx.params.id;

    const sql = 'SELECT a.id as id,' +
      'a.title as title,' +
      'a.introduce as introduce,' +
      'a.article_content as article_content,' +
      "a.addTime as addTime," +
      'a.view_count as view_count,' +
      'b.typeName as typeName ' +
      'FROM article a LEFT JOIN type b ON a.type_id = b.id '+
      'WHERE a.id=' + id;

      const result = await this.app.mysql.query(sql);

      this.ctx.body = { data: result };

  }

  async getTypeInfo(){
    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };
  }

}

module.exports = HomeController;
