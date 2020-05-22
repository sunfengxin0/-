const express = require('express');

const admin = express.Router();

admin.get('/index', (req, res) => {
    res.send('欢迎来到博客首页页面')
});
admin.get('/', (req, res) => {
    res.send('欢迎来到博客首页页面')
});
admin.get('/login', require('./admin/login'));
//处理登录的逻辑
admin.post('/login', require('./admin/loginpost'));

admin.get('/article-edit', require('./admin/article-edit'));

admin.get('/user-edit', require('./admin/user-edit'));
admin.post('/user-edit', require('./admin/user-edit-post'));
// 实现用户信息修改功能
admin.post('/user-modify', require('./admin/user-modify'));

admin.get('/user', require('./admin/user'));

admin.get('/logout', require('./admin/logout'));

module.exports = admin;