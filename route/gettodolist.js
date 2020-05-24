const { User } = require("../model/user")
const { Todolistitems } = require("../model/todolistitems")
const falt = (res) => {
  res.status(300).json({
    data: {},
    meta: {
      msg: "获取列表失败",
      status: 300,
    },
  })
}
module.exports = async (req, res) => {
  const { uid } = req.query
  const users = await User.find({ _id: uid })
  if (users.length == 0) {
    falt(res)
    return false
  }
  // 得到待办事项id列表
  const { toDoList } = users[0]
  let toDoListItems = []
  for (let i = 0; i < toDoList.length; i++) {
    const items = await Todolistitems.find({ _id: toDoList[i] })
    if (items.length == 0) {
      continue
    }
    toDoListItems.push({
      _id: items[0]._id,
      status: items[0].status,
      item: items[0].item,
    })
  }
  res.status(200).json({
    data: {
      toDoListItems: toDoListItems,
    },
    meta: {
      msg: "获取列表成功",
      status: 200,
    },
  })
}
