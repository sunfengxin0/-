const mongoose = require("mongoose")
//导入加密模块
const bcrypt = require("bcryptjs")
// 引入joi模块
const Joi = require("joi")
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 2,
  },
  password: {
    type: String,
    required: true,
  },
  //管理员为admin 用户为normal
  role: {
    type: String,
    required: true,
  },
  toDoList: {
    type: String,
  },
})

const User = mongoose.model("User", userSchema)

async function createUser() {
  const salt = await bcrypt.genSalt(10)
  const pass = await bcrypt.hash("123456", salt)
  const user = await User.create({
    username: "sunfengxin",
    toDoList: "",
    password: pass,
    role: "admin",
  })
  // console.log(user)
}
// 创建初始管理员用户sunfengxin
User.findOne({ username: "sunfengxin" }).then((res) => {
  if (!res) {
    createUser()
  }
})

// 验证用户信息
const validateUser = (user) => {
  // 定义对象的验证规则
  const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码格式不符合要求")),
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("角色值非法")),
    toDoList: Joi.string().allow(""),
  }

  // 实施验证
  return Joi.validate(user, schema)
}
//开放对象
module.exports = {
  User,
  validateUser,
}
