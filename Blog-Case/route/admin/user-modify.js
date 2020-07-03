//引入bcrypt
const bcrypt = require('bcrypt')
//引入数据集合
const { User } = require('../../model/user')
module.exports = async (req, res, next) => {
    const { id } = req.query
    let { password } = await User.findOne({ _id: id })
    let isValid = await bcrypt.compare(req.body.password, password)
    //密码比对成功
    if (isValid) {
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
        await User.updateOne({ _id: id }, {
            username: req.body.username,
            role: req.body.role,
            state: req.body.state
        })
        res.redirect('/admin/user')
    } else {
        //密码比对失败
        let obj = JSON.stringify({ path: '/admin/user-edit', message: '密码比对失败，不能进行用户信息修改&id=' + id })
        next(obj)
    }
}