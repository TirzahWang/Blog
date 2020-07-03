const { Article } = require('../../model/article')
module.exports = async (req, res) => {
    //得到要删除用户的id
    let { id } = req.query
    await Article.findOneAndDelete({ _id: id })
    res.redirect('/admin/article')
}