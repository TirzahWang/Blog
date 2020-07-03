//引入express框架
const express = require('express')
const admin = express.Router()
//渲染登录页面
admin.get('/login', require('./admin/loginPage'))
//处理登录请求
admin.post('/login', require('./admin/login'))
//渲染文章页面 
admin.get('/article', require('./admin/article'))
//用户列表路由 
admin.get('/user', require('./admin/userPage'))
//创建新添加用户编辑页面
admin.get('/user-edit', require('./admin/user-edit'))
//处理新添用户请求
admin.post('/user-edit', require('./admin/user-add-post'))
//处理修改用户路由
admin.post('/user-modify', require('./admin/user-modify'))
//用户删除路由
admin.get('/delete', require('./admin/delete'))
//文章列表路由
admin.get('/article', require('./admin/article'))
//文章编辑路由
admin.get('/article-edit', require('./admin/article-edit'))
//文章删除路由
admin.get('/delete-article', require('./admin/delete-article'))
//处理修改用户路由
admin.post('/article-modify', require('./admin/article-modify'))
//文章添加请求路由
admin.post('/article-edit', require('./admin/article-add'))
//用户退出功能
admin.get('/logout', require('./admin/logout'))
module.exports = admin