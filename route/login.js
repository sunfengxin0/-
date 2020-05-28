const bcrypt = require("bcryptjs")
const { User } = require("../model/user")
module.exports = async (req, res) => {
  const { username, password } = req.body
  console.log(res.body)

  // 定义错误信息
  const err = {
    data: {},
    meta: {
      msg: "用户名或者密码错误",
      status: 303,
    },
  }
  //如果输入为空直接返回错误信息
  if (username.trim().length == 0 || password.trim().length == 0)
    return res.status(303).json(err)
  let user = await User.findOne({ username: username })

  if (user) {
    // 将客户端传递过来的密码和用户信息中的密码进行比对
    // true 比对成功
    // false 对比失败
    let isValid = await bcrypt.compare(password, user.password)
    // 如果密码比对成功
    if (isValid) {
      // 登录成功
      // 将用户名存储在请求对象中
      req.session.username = user.username
      res.status(200).json({
        data: {
          id: user._id,
          username: user.username,
          role: user.role,
        },
        meta: {
          msg: "登录成功",
          status: 200,
        },
      })
    } else {
      // 没有查询到用户
      res.status(303).json(err)
    }
  } else {
    // 没有查询到用户
    res.status(303).json(err)
  }
}
