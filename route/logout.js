module.exports = async (req, res) => {
  req.session.username = ""
  res.status(200).json({
    data: {},
    meta: {
      msg: "退出登录成功",
      status: 200,
    },
  })
}
