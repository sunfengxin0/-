// 引入express框架
const express = require("express")
const path = require("path")
const session = require("express-session")
const bodyPaser = require("body-parser")
//用于加载图标
var favicon = require("serve-favicon")
// 创建网站服务器
const app = express()
//使用body-parser处理post
app.use(bodyPaser.urlencoded({ extended: false }))
app.use(bodyPaser.json())
//数据库连接
require("./model/connect")
//通过cors政策实现跨域请求
app.use((req, res, next) => {
  // 1.允许哪些客户端访问我
  // * 代表允许所有的客户端访问我
  // 注意：如果跨域请求中涉及到cookie信息传递，值不可以为*号 比如是具体的域名信息
  res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  // 2.允许客户端使用哪些请求方法访问我
  res.header("Access-Control-Allow-Methods", "post,PUT,DELETE,get")
  // 允许客户端发送跨域请求时携带cookie信息
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Content-Type")
  next()
})

//定义icon图标,参数为图标的路劲,如果不指明,则用默认的express图标
//, "favicon.ico"
app.use(favicon(path.join(__dirname, "public", "favicon.ico")))
//开放静态资源文件
app.use(express.static(path.join(__dirname, "public")))

app.use(session({ secret: "瞎几把写" }))

//实现登录的接口
app.post("/login", require("./route/login"))
//实现注册的接口
app.post("/register", require("./route/register"))

app.get("/islogin", require("./route/islogin"))

// 实现新增todolistitem
app.post("/newtodolistitem", require("./route/newtodolistitem"))
// 删除接口
app.delete("/deletetodolistitem", require("./route/deletetodolistitem"))

app.put("/modifytodolistitem", require("./route/modifytodolistitem"))

app.get("/gettodolist", require("./route/gettodolist"))

app.get("/logout", require("./route/logout"))

// app.get("/test", (req, res, next) => {
//   console.log(req.session.username)
// })

app.use((req, res) => {
  // res.redirect("/err404.html")
  res.json({ dkdk: 1234 })
})

app.listen(80)
console.log("启动成功")
