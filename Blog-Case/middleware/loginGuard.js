//拦截请求，判断用户进入管理页面的登录状态
module.exports = (req, res, next) => {
    //判断用户访问的是否是登录页面（去除）
    //判断用户是否登录
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        next()
    }
}