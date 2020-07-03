//引入数据库集合
const { User, validateUser } = require('../../model/user')
//引入bcrypt
const bcrypt = require('bcrypt')

module.exports = async (req, res, next) => {
    //实施验证
    try {
        await validateUser(req.body)
    } catch (err) {
        /* res.render('/admin/user-edit', {
            msg: err.message
        }) */
        //next（）只能放字符串，json.stringify()将数据转换成字符串
        return next(JSON.stringify({ path: '/admin/user-edit', message: err.message }))
    }
    //验证通过，查询邮箱是否已存在
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        //res.redirect('/admin/user-edit?message=用户邮箱已存在')
        next(JSON.stringify({ path: '/admin/user-edit', message: '用户邮箱已存在' }))
    } else {
        //邮箱没有被占用，密码加密,添加到数据库
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
        await User.create(req.body)
        res.redirect('/admin/user')
    }
}