const { Article } = require('../../model/article')
module.exports = async (req, res) => {
    //标识当前是文章理页面,开放到公共模块
    req.app.locals.currentLink = 'article'
    const { message, id } = req.query
    if (id) {
        //说明当前页面是修改操作
        let article = await (await Article.findOne({ _id: id }))
        //渲染用户修改页面
        res.render('admin/article-edit', { message, article, link: '/admin/article-modify?id=' + id, button: '修改' })
    } else {
        //说明是添加操作
        res.render('admin/article-edit', { link: '/admin/article-edit', button: '添加' })
    }
}