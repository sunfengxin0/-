const { User } = require("../model/user")
const { Todolistitems } = require("../model/todolistitems")
module.exports = async (req, res) => {
  const { uid, item, status } = req.body
  let items = await Todolistitems.create({
    item: item,
    status: status,
  })
  let users = await User.find({ _id: uid })
  users[0].toDoList.push(items._id)
  User.updateOne({ _id: "5ec8dd10c2df8e4f14a7d52b" }, users[0])
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
