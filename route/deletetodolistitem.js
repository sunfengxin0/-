const { User } = require("../model/user")
const { Todolistitems } = require("../model/todolistitems")
const fail = (res) => {
  res.status(300).json({
    data: {},
    meta: {
      msg: "删除待办事项失败",
      status: 300,
    },
  })
}
const success = (res) => {
  res.status(200).json({
    data: {},
    meta: {
      msg: "删除待办事项成功",
      status: 200,
    },
  })
}

module.exports = async (req, res) => {
  const { uid, itemid } = req.query
  // 首先删除用户待办事项数组中的itemid
  let users = await User.find({ _id: uid })
  //   将待办事项条目id添加到该用户的待办事项数组中

  if (users.length == 0) {
    fail(res)
    return false
  }

  let i = users[0].toDoList.indexOf(itemid)
  if (i == -1) {
    fail(res)
    return false
  }
  users[0].toDoList.splice(i, 1)
  //   更新该用户的信息
  User.updateOne({ _id: uid }, users[0])
    .then()
    .catch((err) => {
      fail(res)
      return false
    })

  //删除数据库中相应元素
  let result = await Todolistitems.findOneAndDelete({ _id: itemid })
  if (!result) {
    fail(res)
    return false
  }

  success(res)
}
