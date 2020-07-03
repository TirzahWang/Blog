//引入数据库集合
const { User } = require('../../model/user')

module.exports = async (req, res) => {
    //标识当前是用户管理页面,开放到公共模块
    req.app.locals.currentLink = 'user'
    //接受用户端传递的当前页的请求参数
    let page = req.query.page || 1
    //每页显示十条
    let pagesize = 10
    //查询用户数据的总数
    let count = await User.countDocuments({})
    //总页数：Math.ceil（总数据条数/每页显示数据条数）
    let pagecount = Math.ceil(count / pagesize)
    //页码对应的位置(当前页-1)*每页显示数
    let start = (page - 1) * pagesize

    //将用户信息从数据库中查询出来
    let users = await User.find().limit(pagesize).skip(start)
    //渲染用户列表模板
    res.render('admin/user', {
        users: users,
        pagecount: pagecount,
        page: page
    })
}