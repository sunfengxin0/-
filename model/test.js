require("./connect")

const { User } = require("./user")
const { Todolistitems } = require("./todolistitems")
;(async () => {
  let items1 = await Todolistitems.create({
    item: "yignyingying",
    status: false,
  })
  console.log(items1)
  let user1 = await User.find({ _id: "5ec8dd10c2df8e4f14a7d52b" })
  console.log(user1)
  console.log(items1._id)
  console.log(user1[0].toDoList.push(items1._id))
  console.log(user1[0])

  User.updateOne({ _id: "5ec8dd10c2df8e4f14a7d52b" }, user1[0]).then((result) =>
    console.log(result)
  )
})()
