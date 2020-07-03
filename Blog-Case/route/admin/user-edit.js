const { User } = require('../../model/user')
module.exports = async (req, res) => {
    //标识当前是用户管理页面,开放到公共模块
    req.app.locals.currentLink = 'user'
    //获取地址栏的id/message参数
    const { message, id } = req.query
    if (id) {
        //说明当前页面是修改操作
        let user = await User.findOne({ _id: id })
        //渲染用户修改页面
        res.render('admin/user-edit', { message, user, link: '/admin/user-modify?id=' + id, button: '修改' })
    } else {
        //说明是添加操作
        res.render('admin/user-edit', { message, link: '/admin/user-edit', button: '添加' })
    }
}