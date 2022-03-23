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
      this.ctx.session.openId = {'openId': openId};
      this.ctx.body = {
        'data':'登录成功','openId':openId
      };
    } else {
      this.ctx.body = {
        'data':'登录失败'
      };
    }
  }

  async getTypeInfo() {
    const results = await this.app.mysql.select('type');
    if (results.length > 0) {
      this.ctx.body = {
        'data':results
      };
    } else {
      this.ctx.body = {
        'data':'没有数据'
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

}

module.exports = MainController;

