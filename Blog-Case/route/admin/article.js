const { Article } = require('../../model/article')
//导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')
module.exports = async (req, res) => {
    //接受客户端传递过来的页码
    let page = req.query.page
    //标识当前是文章理页面,开放到公共模块
    req.app.locals.currentLink = 'article'
    const articles = await pagination(Article).find().page(page).size(5).display(3).populate('author').exec()
    res.render('admin/article', { articles })
}