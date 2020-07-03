//引入用户集合
const { User } = require('../../model/user')
module.exports = async (req, res) => {
    //得到要删除用户的id
    let { id } = req.query
    await User.findByIdAndDelete({ _id: id })
    res.redirect('/admin/user')
}