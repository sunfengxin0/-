// 1.引入mongoose模块
const mongoose = require("mongoose")

// 2.创建文章集合规则
const todolistitemsSchema = new mongoose.Schema({
  item: {
    type: String,
    required: [true, "请填写文章标题"],
  },
  status: {
    type: Boolean,
    default: false,
  },
})
const Todolistitems = mongoose.model("Todolistitems", todolistitemsSchema)

module.exports = {
  Todolistitems,
}
