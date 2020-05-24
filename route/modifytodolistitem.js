const { Todolistitems } = require("../model/todolistitems")
module.exports = async (req, res) => {
  const { itemid, item, status } = req.body
  console.log({
    _id: itemid,
    item: item,
    status: Boolean(status),
  })

  Todolistitems.updateOne(
    { _id: itemid },
    {
      _id: itemid,
      item: item,
      status: status,
    }
  ).then((result) => {
    if (result.n == 0) {
      res.status(300).json({
        data: {},
        meta: {
          msg: "修改待办事项失败",
          status: 300,
        },
      })
      return false
    }
    res.json({
      data: {},
      meta: {
        msg: "修改待办事项成功",
        status: 200,
      },
    })
  })
}
