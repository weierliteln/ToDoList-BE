const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


// 登录和注册表单的验证规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
  }
}