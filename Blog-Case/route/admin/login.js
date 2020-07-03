//引入数据库集合
const { User } = require('../../model/user')
//引入bcrypt
const bcrypt = require('bcrypt')
//暴露函数
module.exports = async (req, res) => {
    //接受请求参数
    const { email, password } = req.body
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '请输入正确的邮箱和密码' })
    //根据发送的邮箱地址查找用户信息
    let user = await User.findOne({ email: email })
    //如果没有查找到这个用户，则user为空
    if (user) {
        //查到有这个邮箱，讲用户信息的密码进行比对
        let isValid = await bcrypt.compare(password, user.password)
        if (isValid) {
            //将用户名存贮在请求对象中
            req.session.username = user.username
            //公共信息存储
            req.app.locals.userInfo = user
            res.redirect('/admin/user')
        } else {
            res.status(400).render('admin/error', { msg: '请输入正确的邮箱和密码' })
        }
    } else {
        res.status(400).render('admin/error', { msg: '请输入正确的邮箱和密码' })
    }
}
