// 引入express框架
const express = require("express")
const path = require("path")
const session = require("express-session")
const bodyPaser = require("body-parser")
//用于加载图标
var favicon = require("serve-favicon")
// 创建网站服务器
const app = express()

//数据库连接
require("./model/connect")
//定义icon图标,参数为图标的路劲,如果不指明,则用默认的express图标
//, "favicon.ico"
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")))

app.use(session({ secret: "瞎几把写" }))

//使用body-parser处理post
app.use(bodyPaser.urlencoded({ extended: false }))
//实现登录的接口
app.post("/login", require("./route/login"))
//实现注册的接口
app.post("/register", require("./route/register"))
// 实现新增todolistitem
app.post("/newtodolistitem", require("./route/newtodolistitem"))

// app.get("/test", (req, res, next) => {
//   console.log(req.session.username)
// })

app.use((req, res) => {
  res.redirect("/err404.html")
})

app.listen(80)
console.log("启动成功")
