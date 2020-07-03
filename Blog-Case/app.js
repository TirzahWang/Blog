//引入express框架创建服务器
const express = require('express')
const app = express()
//导入express-session模块
const session = require('express-session')
//引入path模块
const path = require('path')
//导入art-template模板引擎
const template = require('art-template')
//导入dateformat第三方模块，并进行全局配置
const dateFormat = require('dateformat')
//向模板内导入dateformat变量
template.defaults.imports.dateFormat = dateFormat
//引入数据库
require('./model/connect')
//导入config模块
const config = require('config')
//引入第三方模块body-parser  配置body-parser模块,处理post请求。
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
//开放静态资源
app.use(express.static(path.join(__dirname, 'public')))

//导入路由模块
const home = require('./route/home')
const admin = require('./route/admin')
//配置session
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))
//配置模板引擎
app.engine('art', require('express-art-template'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'art')
//拦截请求，判断用户进入管理页面的登录状态
app.use('/admin', require('./middleware/loginGuard'))
//接受请求
app.use('/home', home)
app.use('/admin', admin)

//错误处理中间件
app.use((err, req, res, next) => {
    //将字符串转换成对象类型
    const result = JSON.parse(err)
    //修改信息中的message是: '密码比对失败，不能进行用户信息修改id' + id
    let message = 'message=' + result.message
    res.redirect(`${result.path}?${message}`)
})


app.listen(80, () => {
    console.log('服务器启动成功')
})