const { User } = require("../model/user")

module.exports = async (req, res) => {
  console.log(111111111)

  console.log(req.session.username)

  if (req.session.username) {
    let users = await User.find({ username: req.session.username })
    console.log(users)

    res.status(200).json({ username: users[0].username, uid: users[0]._id })
  } else {
    res.status(300).json({
      msg: "你还没登录",
    })
  }
}
