const { User } = require("../model/user")
const { Todolistitems } = require("../model/todolistitems")
module.exports = async (req, res) => {
  const { uid, item, status } = req.body
  //   创建待办事项条目
  let items = await Todolistitems.create({
    item: item,
    status: status,
  })
  //   搜索创建该条目的用户
  let users = await User.find({ _id: uid })
  //   将待办事项条目id添加到该用户的待办事项数组中
  users[0].toDoList.push(items._id)
  //   更新该用户的信息
  User.updateOne({ _id: uid }, users[0])
    .then((result) =>
      res.json({
        data: {},
        meta: {
          msg: "新增待办事项成功",
          status: 200,
        },
      })
    )
    .catch((err) => {
      res.status(300).json({
        data: {},
        meta: {
          msg: "新增待办事项失败",
          status: 300,
        },
      })
    })
}
