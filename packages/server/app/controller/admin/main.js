'use strict'

const Controller = require('egg').Controller;

class MainController extends Controller {

  async index() {
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    let userName = this.ctx.request.body.userName;
    let passWord = this.ctx.request.body.password;

    // 查询是否存在账号密码
    const sql = "SELECT * FROM admin_user WHERE userName = '" + userName + "' AND passWord = '" + passWord + "'";
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      let openId = new Date().getTime();
      this.ctx.session.openId = { 'openId': openId };
      this.ctx.body = {
        'data': '登录成功', 'openId': openId
      };
    } else {
      this.ctx.body = {
        'data': '登录失败'
      };
    }
  }

  async getTypeInfo() {
    const results = await this.app.mysql.select('type');
    if (results.length > 0) {
      this.ctx.body = {
        'data': results
      };
    } else {
      this.ctx.body = {
        'data': '没有数据'
      }
    }

  }

  async addArticle() {
    const tmp = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmp);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    if (insertSuccess) {
      result.inser
      this.ctx.body = {
        'isSuccess': true,
        'insertId': insertId
      }
    } else {
      this.ctx.body = {
        'isSuccess': false,
      }
    }
  }

  async updateArticle() {
    const tmp = this.ctx.request.body;
    //自动会通过tmp 的id 主键更新
    const result = await this.app.mysql.update('article', tmp);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      'isSuccess': updateSuccess,
    }

  }

  async getAriticleList() {
    const { ctx } = this;

    // 查询文章列表，通过左连接查询
    const sql = 'SELECT a.id as id,' +
      'a.title as title,' +
      'a.introduce as introduce,' +
      // 时间戳转换为日期
      "FROM_UNIXTIME(a.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
      'a.view_count as view_count,' +
      'b.typeName as typeName ' +
      'FROM article a LEFT JOIN type b ON a.type_id = b.id' + 
      ' ORDER BY a.id DESC';

    const results = await ctx.app.mysql.query(sql);
    ctx.body = { data: results };
  }

  async deleteArticle() {
    const { ctx } = this;
    const id = this.ctx.params.id;
    const result = await ctx.app.mysql.delete('article', { id });
    ctx.body = {
      'isSuccess': result.affectedRows === 1
    }
  }

  async getArticleById(){

    let id = this.ctx.params.id;

    const sql = 'SELECT a.id as id,' +
      'a.title as title,' +
      'a.introduce as introduce,' +
      'a.article_content as article_content,' +
      "FROM_UNIXTIME(a.addTime, '%Y-%m-%d %H:%i:%s') as addTime," +
      'a.view_count as view_count,' +
      'b.typeName as typeName, ' +
      'b.id as type_id ' +
      'FROM article a LEFT JOIN type b ON a.type_id = b.id '+
      'WHERE a.id=' + id;

      const result = await this.app.mysql.query(sql);

      this.ctx.body = { data: result };

  }

}

module.exports = MainController;

