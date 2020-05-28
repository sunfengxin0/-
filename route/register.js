// 引入用户集合的构造函数
const { User, validateUser } = require("../model/user")
// 引入加密模块
const bcrypt = require("bcryptjs")

module.exports = async (req, res) => {
  const userInfo = req.body
  console.log(userInfo)

  if (!req.role) {
    userInfo.role = "normal"
  }
  userInfo.toDoList = []

  try {
    await validateUser(req.body)
  } catch (e) {
    // 验证没有通过
    // e.message
    // 重定向回用户添加页面
    // return res.redirect(`/admin/user-edit?message=${e.message}`);
    // JSON.stringify() 将对象数据类型转换为字符串数据类型
    res.status(300).json({
      data: {},
      meta: {
        msg: e.message,
        status: 300,
      },
    })
    return false
  }
  let user = await User.findOne({ username: userInfo.username })
  console.log(user)

  // 如果用户已经存在 邮箱地址已经被别人占用
  if (user) {
    // 重定向回用户添加页面
    res.status(300).json({
      data: {},
      meta: {
        msg: "用户名已被占用",
        status: 300,
      },
    })
    return false
  }
  const salt = await bcrypt.genSalt(10)
  // 加密
  const password = await bcrypt.hash(req.body.password, salt)
  // 替换密码
  userInfo.password = password
  // 将用户信息添加到数据库中
  await User.create(userInfo)

  // 返回成功创建的结果
  res.status(200).json({
    data: "",
    meta: {
      msg: "成功创建用户",
      status: 200,
    },
  })
}
